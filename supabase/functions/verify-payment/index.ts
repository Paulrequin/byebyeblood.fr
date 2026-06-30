const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Vérifie le JWT de l'appelant
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing authorization' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    const token = authHeader.replace('Bearer ', '')
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!
    const userRes = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: { Authorization: `Bearer ${token}`, apikey: supabaseAnonKey },
    })
    const userData = await userRes.json()
    if (!userRes.ok || !userData.id) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    const callerId = userData.id

    const { session_id } = await req.json()

    if (!session_id) {
      return new Response(JSON.stringify({ error: 'Missing session_id' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')!

    const stripeRes = await fetch(`https://api.stripe.com/v1/checkout/sessions/${session_id}`, {
      headers: { Authorization: `Bearer ${stripeKey}` },
    })

    const session = await stripeRes.json()

    if (!stripeRes.ok) {
      console.error('[verify-payment] Stripe error:', session.error?.message)
      return new Response(JSON.stringify({ error: session.error?.message ?? 'Stripe error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (session.payment_status !== 'paid') {
      return new Response(JSON.stringify({ error: 'Payment not completed' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const userId = session.metadata?.user_id
    if (!userId) {
      return new Response(JSON.stringify({ error: 'No user_id in session metadata' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // L'appelant doit être l'utilisateur qui a créé la session de paiement
    if (userId !== callerId) {
      console.error('[verify-payment] Caller mismatch: caller=%s session_user=%s', callerId, userId)
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

    // Idempotence : si déjà traité, retourner succès immédiatement
    const profileRes = await fetch(
      `${supabaseUrl}/rest/v1/profiles?id=eq.${userId}&select=stripe_session_id,has_access`,
      { headers: { Authorization: `Bearer ${serviceRoleKey}`, apikey: serviceRoleKey } },
    )
    const [existingProfile] = await profileRes.json()
    if (existingProfile?.stripe_session_id === session_id && existingProfile?.has_access) {
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (!existingProfile) {
      console.error('[verify-payment] Profile not found for user:', userId)
      return new Response(JSON.stringify({ error: 'Profile not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
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
        body: JSON.stringify({ has_access: true, stripe_session_id: session_id }),
      },
    )

    if (!updateRes.ok) {
      const err = await updateRes.text()
      console.error('[verify-payment] Supabase update failed:', err)
      return new Response(JSON.stringify({ error: 'Failed to update profile' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    console.log('[verify-payment] Access granted for user:', userId, 'session:', session_id)
    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
