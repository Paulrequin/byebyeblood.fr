const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

async function verifyStripeSignature(payload: string, sigHeader: string, secret: string): Promise<boolean> {
  const parts = Object.fromEntries(sigHeader.split(',').map(p => p.split('=')))
  const timestamp = parts['t']
  const signature = parts['v1']

  if (!timestamp || !signature) return false

  // Fenêtre anti-replay de 5 minutes
  if (Math.abs(Date.now() / 1000 - parseInt(timestamp)) > 300) return false

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const expectedSig = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(`${timestamp}.${payload}`),
  )
  const expectedHex = Array.from(new Uint8Array(expectedSig))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')

  return expectedHex === signature
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')
  if (!webhookSecret) {
    console.error('[stripe-webhook] Missing STRIPE_WEBHOOK_SECRET')
    return new Response('Configuration error', { status: 500 })
  }

  const sigHeader = req.headers.get('stripe-signature')
  if (!sigHeader) {
    return new Response('Missing stripe-signature', { status: 400 })
  }

  const rawBody = await req.text()

  const isValid = await verifyStripeSignature(rawBody, sigHeader, webhookSecret)
  if (!isValid) {
    console.error('[stripe-webhook] Invalid signature')
    return new Response('Invalid signature', { status: 400 })
  }

  const event = JSON.parse(rawBody)
  console.log('[stripe-webhook] Event received:', event.type)

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object

    if (session.payment_status !== 'paid') {
      return new Response(JSON.stringify({ received: true }), {
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const userId = session.metadata?.user_id
    if (!userId) {
      console.error('[stripe-webhook] No user_id in session metadata, session:', session.id)
      return new Response(JSON.stringify({ received: true }), {
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

    // Idempotence : ne pas traiter deux fois la même session
    const profileRes = await fetch(
      `${supabaseUrl}/rest/v1/profiles?id=eq.${userId}&select=stripe_session_id,has_access`,
      { headers: { Authorization: `Bearer ${serviceRoleKey}`, apikey: serviceRoleKey } },
    )
    const [profile] = await profileRes.json()
    if (profile?.stripe_session_id === session.id && profile?.has_access) {
      console.log('[stripe-webhook] Already processed:', session.id)
      return new Response(JSON.stringify({ received: true }), {
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const updateRes = await fetch(
      `${supabaseUrl}/rest/v1/profiles?id=eq.${userId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${serviceRoleKey}`,
          apikey: serviceRoleKey,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({ has_access: true, stripe_session_id: session.id }),
      },
    )

    if (!updateRes.ok) {
      const err = await updateRes.text()
      console.error('[stripe-webhook] Supabase update failed:', err)
      return new Response('Database update failed', { status: 500 })
    }

    console.log('[stripe-webhook] Access granted for user:', userId, 'session:', session.id)
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { 'Content-Type': 'application/json' },
  })
})
