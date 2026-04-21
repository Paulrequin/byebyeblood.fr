import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import { signIn, signUp, resetPassword, updatePassword } from '@/services/authService'
import { startCheckout } from '@/services/profileService'
import { supabase } from '@/lib/supabase'
import s from './Auth.module.css'

type Mode = 'login' | 'signup' | 'forgot' | 'reset'

export default function Auth() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const nextCheckout = searchParams.get('next') === 'checkout'
  const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? '/dashboard'

  const [mode, setMode]               = useState<Mode>('login')
  const [email, setEmail]             = useState('')
  const [firstName, setFirstName]     = useState('')
  const [password, setPassword]       = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState<string | null>(null)
  const [message, setMessage]       = useState<string | null>(null)

  // Detect PASSWORD_RECOVERY event when user arrives from reset email
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setMode('reset')
        setError(null)
        setMessage(null)
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)
    try {
      if (mode === 'signup') {
        await signUp(email, password, firstName.trim() || undefined)
        setMessage('Vérifie tes emails pour confirmer ton compte.')
      } else if (mode === 'forgot') {
        await resetPassword(email)
        setMessage('Un lien de réinitialisation a été envoyé à ton adresse email.')
      } else if (mode === 'reset') {
        await updatePassword(newPassword)
        setMessage('Mot de passe mis à jour. Redirection…')
        setTimeout(() => navigate('/dashboard', { replace: true }), 1500)
      } else {
        await signIn(email, password)
        if (nextCheckout) await startCheckout()
        else navigate(from, { replace: true })
      }
    } catch (err) {
      const isObj = typeof err === 'object' && err !== null
      const e = isObj ? (err as { message?: string; status?: number }) : null
      setError(e?.message ?? 'Une erreur est survenue. Réessaie.')
    } finally {
      setLoading(false)
    }
  }

  function switchMode(next: Mode) {
    setMode(next)
    setError(null)
    setMessage(null)
  }

  const titles: Record<Mode, string> = {
    login:  'Bon retour.',
    signup: 'Crée ton compte.',
    forgot: 'Mot de passe oublié.',
    reset:  'Nouveau mot de passe.',
  }
  const subs: Record<Mode, string> = {
    login:  'Connecte-toi pour reprendre là où tu en étais.',
    signup: 'Rejoins le programme et commence ton parcours.',
    forgot: 'Saisis ton email et reçois un lien de réinitialisation.',
    reset:  'Choisis un nouveau mot de passe pour ton compte.',
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

        <h1 className={s.formTitle}>{titles[mode]}</h1>
        <p className={s.formSub}>{subs[mode]}</p>

        {/* Tabs — login / signup only */}
        {(mode === 'login' || mode === 'signup') && (
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
        )}

        <form onSubmit={handleSubmit}>

          {/* First name — signup only */}
          {mode === 'signup' && (
            <div className={s.field}>
              <label htmlFor="auth-firstname" className={s.label}>Prénom</label>
              <input
                id="auth-firstname"
                className={s.input}
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Ton prénom"
                autoComplete="given-name"
              />
            </div>
          )}

          {/* Email — shown in login, signup, forgot */}
          {mode !== 'reset' && (
            <div className={s.field}>
              <label htmlFor="auth-email" className={s.label}>Email</label>
              <input
                id="auth-email"
                className={s.input}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="toi@example.com"
                autoComplete="email"
              />
            </div>
          )}

          {/* Password — shown in login, signup */}
          {(mode === 'login' || mode === 'signup') && (
            <div className={s.field}>
              <div className={s.labelRow}>
                <label htmlFor="auth-password" className={s.label}>Mot de passe</label>
                {mode === 'login' && (
                  <button type="button" className={s.forgotLink} onClick={() => switchMode('forgot')}>
                    Mot de passe oublié ?
                  </button>
                )}
              </div>
              <input
                id="auth-password"
                className={s.input}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              />
            </div>
          )}

          {/* New password — shown in reset mode */}
          {mode === 'reset' && (
            <div className={s.field}>
              <label htmlFor="auth-new-password" className={s.label}>Nouveau mot de passe</label>
              <input
                id="auth-new-password"
                className={s.input}
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
                placeholder="8 caractères minimum"
                autoComplete="new-password"
              />
            </div>
          )}

          {error   && <div className={s.errorBox}>{error}</div>}
          {message && <div className={s.successBox}>{message}</div>}

          <button className={s.submitBtn} type="submit" disabled={loading}>
            {loading ? 'Chargement…' :
             mode === 'login'  ? 'Se connecter' :
             mode === 'signup' ? 'Créer mon compte' :
             mode === 'forgot' ? 'Envoyer le lien' :
             'Mettre à jour'}
          </button>
        </form>

        {/* Back to login link from forgot/reset */}
        {(mode === 'forgot' || mode === 'reset') && (
          <button type="button" className={s.backToLogin} onClick={() => switchMode('login')}>
            ← Retour à la connexion
          </button>
        )}

        {mode !== 'forgot' && mode !== 'reset' && (
          <p className={s.terms}>
            En continuant, tu acceptes nos{' '}
            <a href="/legal" className={s.termsLink}>conditions d'utilisation</a>.
          </p>
        )}
      </div>
    </div>
  )
}
