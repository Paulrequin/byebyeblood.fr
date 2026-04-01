import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { startCheckout } from '../lib/checkout'

export default function Auth() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const nextCheckout = searchParams.get('next') === 'checkout'
  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)
    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) setError(`${error.message} (status: ${error.status}, code: ${error.code})`)
        else setMessage('Vérifie tes emails pour confirmer ton compte.')
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) setError(`${error.message} (status: ${error.status}, code: ${error.code})`)
        else if (nextCheckout) await startCheckout()
        else navigate('/dashboard')
      }
    } catch (err) {
      setError(`Exception: ${err.message}`)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0E0E16] text-[#F0EBF4] flex items-center justify-center px-6 pb-24">
      {/* Background glow */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[400px] h-[400px] rounded-full bg-[#CC2233]/8 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        {/* Back link */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm text-[#6B6B80] hover:text-[#F0EBF4] transition-colors mb-8"
        >
          ← Retour
        </button>

        {/* Logo */}
        <div className="text-center mb-8">
          <span className="text-2xl font-bold">
            Bye Bye <span className="text-[#CC2233]">Blood</span>
          </span>
        </div>

        {/* Card */}
        <div className="p-8 rounded-2xl bg-[#16161F] border border-[#2A2A38]">
          {/* Toggle */}
          <div className="flex rounded-xl bg-[#0E0E16] p-1 mb-8">
            {['login', 'signup'].map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(null); setMessage(null) }}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
                  mode === m ? 'bg-[#CC2233] text-white' : 'text-[#6B6B80] hover:text-[#F0EBF4]'
                }`}
              >
                {m === 'login' ? 'Se connecter' : 'S\'inscrire'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-[#9090A8] mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="toi@example.com"
                className="w-full px-4 py-3 rounded-xl bg-[#0E0E16] border border-[#2A2A38] text-[#F0EBF4] placeholder-[#6B6B80] focus:outline-none focus:border-[#CC2233] transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-[#9090A8] mb-2">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-[#0E0E16] border border-[#2A2A38] text-[#F0EBF4] placeholder-[#6B6B80] focus:outline-none focus:border-[#CC2233] transition-colors text-sm"
              />
            </div>

            {error && (
              <div className="px-4 py-3 rounded-xl bg-[#CC2233]/10 border border-[#CC2233]/30 text-[#FF4455] text-sm">
                {error}
              </div>
            )}

            {message && (
              <div className="px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#CC2233] hover:bg-[#991122] disabled:opacity-50 text-white font-semibold rounded-xl transition-colors mt-2"
            >
              {loading ? 'Chargement…' : mode === 'login' ? 'Se connecter' : 'Créer mon compte'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[#6B6B80] mt-6">
          En continuant, tu acceptes nos{' '}
          <span className="underline cursor-pointer hover:text-[#F0EBF4]">conditions d'utilisation</span>.
        </p>

        {import.meta.env.DEV && (
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full mt-3 py-2.5 rounded-xl border border-dashed border-[#2A2A38] text-[#6B6B80] hover:text-[#F0EBF4] hover:border-[#CC2233]/40 text-sm transition-colors"
          >
            ⚡ Mode dev — accès direct
          </button>
        )}
      </div>
    </div>
  )
}
