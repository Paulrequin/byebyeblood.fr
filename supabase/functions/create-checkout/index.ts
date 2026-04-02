const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')
  if (!stripeKey) {
    return new Response(JSON.stringify({ error: 'Missing STRIPE_SECRET_KEY' }), { status: 500, headers: corsHeaders })
  }

  // Extract and verify user from JWT
  const authHeader = req.headers.get('Authorization')
  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Missing authorization' }), { status: 401, headers: corsHeaders })
  }
  const token = authHeader.replace('Bearer ', '')
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!
  const userRes = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: { Authorization: `Bearer ${token}`, apikey: supabaseAnonKey },
  })
  const userData = await userRes.json()
  if (!userRes.ok || !userData.id) {
    return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401, headers: corsHeaders })
  }
  const userId = userData.id
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

  // Check if user already has access
  const profileRes = await fetch(`${supabaseUrl}/rest/v1/profiles?id=eq.${userId}&select=has_access`, {
    headers: { Authorization: `Bearer ${serviceRoleKey}`, apikey: serviceRoleKey },
  })
  const [profile] = await profileRes.json()
  if (profile?.has_access) {
    return new Response(JSON.stringify({ error: 'already_paid' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const siteUrl = Deno.env.get('SITE_URL') ?? 'http://localhost:5173'

  const params = new URLSearchParams({
    mode: 'payment',
    'payment_method_types[]': 'card',
    'line_items[0][price]': Deno.env.get('STRIPE_PRICE_ID') ?? 'price_1TGKQMECHHg3iEHHUhN8PeCD',
    'line_items[0][quantity]': '1',
    'metadata[user_id]': userId,
    success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/`,
  })

  const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${stripeKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  })

  const data = await res.json()
  console.log('[create-checkout] Stripe status:', res.status, JSON.stringify(data))

  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})
