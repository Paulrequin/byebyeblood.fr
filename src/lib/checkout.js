import { supabase } from './supabase'

export async function startCheckout() {
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    // Not logged in — redirect to auth with next=checkout
    window.location.href = '/auth?next=checkout'
    return
  }

  const { data, error } = await supabase.functions.invoke('create-checkout', {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  })

  if (error) {
    let body = {}
    try { body = await error.context.json() } catch (_) {}
    if (body.error === 'already_paid') {
      window.location.href = '/dashboard'
      return
    }
    throw new Error(body.error || error.message)
  }

  // Redirect to Stripe Checkout
  window.location.href = data.url
}
