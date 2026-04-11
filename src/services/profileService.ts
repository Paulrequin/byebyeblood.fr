import { supabase } from '@/lib/supabase'
import type { Profile } from '@/types'

// ─── Helpers ──────────────────────────────────────────────────────────────────

interface FunctionErrorBody {
  error?: string
}

/**
 * Tente de lire le corps JSON d'une erreur Supabase Edge Function.
 * Retourne {} si la structure n'est pas celle attendue.
 */
async function parseFunctionError(error: unknown): Promise<FunctionErrorBody> {
  try {
    if (typeof error !== 'object' || error === null) return {}
    const ctx = (error as { context?: unknown }).context
    if (ctx && typeof ctx === 'object' && 'json' in ctx && typeof (ctx as { json: unknown }).json === 'function') {
      return await (ctx as { json: () => Promise<FunctionErrorBody> }).json()
    }
  } catch {
    // Corps non parseable — on ignore
  }
  return {}
}

function toErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error) return error.message
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return String((error as { message: unknown }).message)
  }
  return fallback
}

// ─── Service ──────────────────────────────────────────────────────────────────

export async function getProfile(userId: string): Promise<Profile> {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, has_access, stripe_session_id, created_at')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data as Profile
}

export async function startCheckout(): Promise<void> {
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    window.location.href = '/auth?next=checkout'
    return
  }

  const { data, error } = await supabase.functions.invoke('create-checkout')

  if (error) {
    const body = await parseFunctionError(error)
    if (body.error === 'already_paid') {
      window.location.href = '/dashboard'
      return
    }
    throw new Error(body.error ?? toErrorMessage(error, 'Erreur lors du checkout.'))
  }

  const url = (data as { url?: string }).url
  if (!url) throw new Error('URL de paiement manquante dans la réponse.')
  window.location.href = url
}

export async function verifyPayment(sessionId: string): Promise<void> {
  const { error } = await supabase.functions.invoke('verify-payment', {
    body: { session_id: sessionId },
  })

  if (error) {
    const body = await parseFunctionError(error)
    throw new Error(body.error ?? toErrorMessage(error, 'Erreur lors de la vérification du paiement.'))
  }
}
