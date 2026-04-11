import { supabase } from '@/lib/supabase'
import type { Profile } from '@/types'

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
    let body: { error?: string } = {}
    try { body = await (error as unknown as { context: Response }).context.json() } catch (_) { /* ignore */ }
    if (body.error === 'already_paid') {
      window.location.href = '/dashboard'
      return
    }
    throw new Error(body.error ?? error.message)
  }

  window.location.href = (data as { url: string }).url
}

export async function verifyPayment(sessionId: string): Promise<void> {
  const { error } = await supabase.functions.invoke('verify-payment', {
    body: { session_id: sessionId },
  })

  if (error) {
    let body: { error?: string } = {}
    try { body = await (error as unknown as { context: Response }).context.json() } catch (_) { /* ignore */ }
    throw new Error(body.error ?? error.message ?? 'Erreur lors de la vérification.')
  }
}
