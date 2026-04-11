import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { verifyPayment } from '@/services/profileService'
import s from './Success.module.css'

type Status = 'verifying' | 'success' | 'error'

export default function Success() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')

  const [status, setStatus]     = useState<Status>('verifying')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    if (!sessionId) {
      setStatus('error')
      setErrorMsg('Session de paiement introuvable.')
      return
    }

    verifyPayment(sessionId)
      .then(() => setStatus('success'))
      .catch((err: Error) => {
        setErrorMsg(err.message ?? 'Erreur lors de la vérification.')
        setStatus('error')
      })
  }, [sessionId])

  return (
    <div className={s.page}>
      <span className={s.logo}>
        Bye Bye <span className={s.logoRed}>Blood</span>
      </span>

      <div className={s.container}>

        {status === 'verifying' && (
          <>
            <div className={s.spinner} />
            <p className={s.verifyText}>Vérification du paiement…</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className={s.successIcon}>🎉</div>
            <h1 className={s.successTitle}>Paiement confirmé !</h1>
            <p className={s.successSub}>
              Bienvenue dans Bye Bye Blood. Tous les modules sont maintenant débloqués.
              On commence quand tu es prêt·e.
            </p>
            <div className={s.checklist}>
              {[
                '7 modules complets débloqués',
                'Progression XP + badges actifs',
                'Accès à vie — aucune limite',
              ].map((item) => (
                <div key={item} className={s.checkItem}>
                  <span className={s.checkMark}>✓</span>
                  {item}
                </div>
              ))}
            </div>
            <button className={s.btnPrimary} onClick={() => navigate('/dashboard')}>
              Aller au tableau de bord →
            </button>
          </>
        )}

        {status === 'error' && (
          <>
            <div className={s.errorIcon}>⚠️</div>
            <h1 className={s.errorTitle}>Une erreur est survenue</h1>
            <p className={s.errorMsg}>{errorMsg}</p>
            <p className={s.errorHelp}>
              Si tu as été débité·e, contacte-nous — nous réglerons ça rapidement.
            </p>
            <div className={s.btnRow}>
              <button className={s.btnOutline} onClick={() => navigate('/')}>
                Retour
              </button>
              <button className={s.btnRed} onClick={() => navigate('/dashboard')}>
                Mon compte
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  )
}
