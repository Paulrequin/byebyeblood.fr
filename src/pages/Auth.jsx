import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { startCheckout } from '../lib/checkout'
import s from './Auth.module.css'

export default function Auth() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const nextCheckout = searchParams.get('next') === 'checkout'
  const [mode, setMode]       = useState('login')
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)
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
    } catch {
      setError('Une erreur est survenue. Réessaie.')
    } finally {
      setLoading(false)
    }
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
            Arrête de fuir.<br />
            <span className={s.leftTaglineRed}>Commence à guérir.</span>
          </h2>
          <p className={s.leftSub}>
            Un programme de désensibilisation progressive à la vue du sang.
            7 modules. À ton rythme.
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
          {[
            { key: 'login',  label: 'Se connecter' },
            { key: 'signup', label: "S'inscrire" },
          ].map(({ key, label }) => (
            <button
              key={key}
              className={`${s.tab} ${mode === key ? s.tabActive : ''}`}
              onClick={() => { setMode(key); setError(null); setMessage(null) }}
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

        {import.meta.env.DEV && (
          <button className={s.devBtn} onClick={() => navigate('/dashboard')}>
            ⚡ Mode dev — accès direct
          </button>
        )}
      </div>
    </div>
  )
}
