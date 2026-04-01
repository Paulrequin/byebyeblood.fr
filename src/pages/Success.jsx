import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Success() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')

  const [status, setStatus] = useState('verifying') // 'verifying' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    if (!sessionId) {
      setStatus('error')
      setErrorMsg('Session de paiement introuvable.')
      return
    }

    async function verify() {
      try {
        const { error } = await supabase.functions.invoke('verify-payment', {
          body: { session_id: sessionId },
        })

        if (error) {
          let body = {}
          try { body = await error.context.json() } catch (_) {}
          setErrorMsg(body.error ?? error.message ?? 'Erreur lors de la vérification.')
          setStatus('error')
          return
        }

        setStatus('success')
      } catch (err) {
        setErrorMsg(err.message ?? 'Erreur inconnue.')
        setStatus('error')
      }
    }

    verify()
  }, [sessionId])

  return (
    <div className="min-h-screen bg-[#0E0E16] text-[#F0EBF4] flex items-center justify-center px-6 pb-24">
      {/* Background glow */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full bg-[#CC2233]/8 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md text-center">
        {status === 'verifying' && (
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 rounded-full border-4 border-[#CC2233]/30 border-t-[#CC2233] animate-spin" />
            <p className="text-[#9090A8]">Vérification du paiement…</p>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-[#CC2233]/15 border border-[#CC2233]/40 flex items-center justify-center text-4xl">
              🎉
            </div>

            <div>
              <h1 className="text-4xl font-black mb-3">Paiement confirmé !</h1>
              <p className="text-[#9090A8] leading-relaxed">
                Bienvenue dans Bye Bye Blood. Tous les modules sont maintenant débloqués.
                On commence quand tu es prêt·e.
              </p>
            </div>

            <div className="w-full p-5 rounded-2xl bg-[#16161F] border border-[#CC2233]/30 text-left space-y-3">
              {[
                '7 modules complets débloqués',
                'Progression XP + badges actifs',
                'Accès à vie — aucune limite',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-[#9090A8]">
                  <span className="text-[#CC2233] font-bold">✓</span>
                  {item}
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate('/dashboard')}
              className="w-full py-4 bg-[#CC2233] hover:bg-[#991122] text-white font-bold rounded-xl transition-all hover:scale-[1.02]"
            >
              Aller au tableau de bord →
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-[#CC2233]/10 border border-[#CC2233]/30 flex items-center justify-center text-4xl">
              ⚠️
            </div>

            <div>
              <h1 className="text-3xl font-black mb-3">Une erreur est survenue</h1>
              <p className="text-[#9090A8]">{errorMsg}</p>
            </div>

            <p className="text-sm text-[#6B6B80]">
              Si tu as été débité·e, contacte-nous — nous réglerons ça rapidement.
            </p>

            <div className="flex gap-3 w-full">
              <button
                onClick={() => navigate('/')}
                className="flex-1 py-3 bg-[#16161F] hover:bg-[#1E1E2A] text-[#F0EBF4] font-semibold rounded-xl border border-[#2A2A38] transition-colors"
              >
                Retour
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="flex-1 py-3 bg-[#CC2233] hover:bg-[#991122] text-white font-semibold rounded-xl transition-colors"
              >
                Mon compte
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
