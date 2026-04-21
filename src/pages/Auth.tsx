import { useState } from 'react'
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import { signIn, signUp } from '@/services/authService'
import { startCheckout } from '@/services/profileService'
import s from './Auth.module.css'

type Mode = 'login' | 'signup'

export default function Auth() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const nextCheckout = searchParams.get('next') === 'checkout'
  const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? '/dashboard'

  const [mode, setMode]         = useState<Mode>('login')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState<string | null>(null)
  const [message, setMessage]   = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)
    try {
      if (mode === 'signup') {
        await signUp(email, password)
        setMessage('Vérifie tes emails pour confirmer ton compte.')
      } else {
        await signIn(email, password)
        if (nextCheckout) await startCheckout()
        else navigate(from, { replace: true })
      }
    } catch (err) {
      const isObj = typeof err === 'object' && err !== null
      const e = isObj ? (err as { message?: string; status?: number }) : null
      setError(e?.message ? `${e.message}${e.status ? ` (status: ${e.status})` : ''}` : 'Une erreur est survenue. Réessaie.')
    } finally {
      setLoading(false)
    }
  }

  function switchMode(next: Mode) {
    setMode(next)
    setError(null)
    setMessage(null)
  }

  return (
    <div className={s.page}>

      {/* ── LEFT ── */}
      <div className={s.left}>
        <span className={s.leftLogo}>
          Bye Bye <span className={s.leftLogoRed}>Blood</span>
        </span>
        <div className={s.leftCenter}>
          <div className={s.leftDivider} />
          <h2 className={s.leftTagline}>
            Peur du sang ?<br />
            <span className={s.leftTaglineRed}>Plus pour longtemps.</span>
          </h2>
          <p className={s.leftSub}>
            Désensibilise-toi progressivement à la vue du sang.
            5 niveaux. À ton rythme.
          </p>
        </div>
        <span className={s.leftFooter}>© 2026 Bye Bye Blood</span>
        <div className={s.leftDeco} aria-hidden="true" />
      </div>

      {/* ── RIGHT ── */}
      <div className={s.right}>
        <button className={s.backBtn} onClick={() => navigate('/')}>
          ← Retour
        </button>

        <h1 className={s.formTitle}>
          {mode === 'login' ? 'Bon retour.' : 'Crée ton compte.'}
        </h1>
        <p className={s.formSub}>
          {mode === 'login'
            ? 'Connecte-toi pour reprendre là où tu en étais.'
            : 'Rejoins le programme et commence ton parcours.'}
        </p>

        <div className={s.tabs}>
          {([
            { key: 'login'  as Mode, label: 'Se connecter' },
            { key: 'signup' as Mode, label: "S'inscrire" },
          ]).map(({ key, label }) => (
            <button
              key={key}
              className={`${s.tab} ${mode === key ? s.tabActive : ''}`}
              onClick={() => switchMode(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className={s.field}>
            <label className={s.label}>Email</label>
            <input
              className={s.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="toi@example.com"
            />
          </div>
          <div className={s.field}>
            <label className={s.label}>Mot de passe</label>
            <input
              className={s.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          {error   && <div className={s.errorBox}>{error}</div>}
          {message && <div className={s.successBox}>{message}</div>}

          <button className={s.submitBtn} type="submit" disabled={loading}>
            {loading ? 'Chargement…' : mode === 'login' ? 'Se connecter' : 'Créer mon compte'}
          </button>
        </form>

        <p className={s.terms}>
          En continuant, tu acceptes nos{' '}
          <span className={s.termsLink}>conditions d'utilisation</span>.
        </p>
      </div>
    </div>
  )
}
