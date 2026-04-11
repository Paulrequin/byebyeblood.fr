import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { startCheckout } from '@/services/profileService'
import s from './Landing.module.css'

/* ── Data ── */
const LEVELS = [
  { label: 'Niveau 1', state: 'done'   },
  { label: 'Niveau 2', state: 'done'   },
  { label: 'Niveau 3', state: 'active' },
  { label: 'Niveau 4', state: 'locked' },
  { label: 'Niveau 5', state: 'locked' },
]

const EXERCISES = [
  { label: 'Introduction à l\'hémophobie',       state: 'done'   },
  { label: 'Observation d\'images médicales',     state: 'active' },
  { label: 'Vidéos de prélèvements sanguins',    state: 'todo'   },
  { label: 'Exercice de respiration avancé',      state: 'todo'   },
]

const HOW_STEPS = [
  { icon: '🧪', step: 'Étape 1', title: 'Évalue ton niveau',      desc: "Un court questionnaire identifie ton degré d'hémophobie et place ton point de départ." },
  { icon: '🗺️', step: 'Étape 2', title: 'Suis le protocole',      desc: "Chaque niveau expose progressivement à des stimuli plus intenses — textes, images, vidéos." },
  { icon: '📈', step: 'Étape 3', title: 'Progresse graduellement', desc: "Le système adapte la cadence. Tu ne passes au suivant que quand tu es prêt·e." },
  { icon: '🏁', step: 'Étape 4', title: 'Maîtrise complète',       desc: "Au niveau 5, la vue du sang ne déclenche plus de réponse de panique." },
]

const GAMIF_CARDS = [
  { emoji: '🔥', title: 'Streak quotidien',   desc: 'Reviens chaque jour pour maintenir ta flamme. La régularité est la clé de la désensibilisation.' },
  { emoji: '⚡', title: 'Points XP',          desc: 'Chaque exercice complété rapporte des XP. Monte de niveau et débloque la suite du parcours.' },
  { emoji: '🎖️', title: 'Badges de maîtrise', desc: 'Décroche des badges à chaque palier franchi. Une preuve concrète de tes progrès réels.' },
]

const STATS = [
  { value: '5 niveaux',   label: 'progressifs' },
  { value: '14 jours',    label: 'satisfait ou remboursé' },
  { value: '100% fondé',  label: 'sur la science' },
  { value: '1× paiement', label: 'unique, accès à vie' },
]

/* ── Component ── */
export default function Landing() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState<string | null>(null)

  async function handleCheckout() {
    setLoading(true)
    setError(null)
    try {
      await startCheckout()
    } catch {
      setError('Une erreur est survenue. Réessaie.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={s.page}>
      <div className={s.grain} aria-hidden="true" />

      {/* ── NAV ── */}
      <nav className={s.nav}>
        <span className={s.navLogo}>
          Bye Bye <span className={s.navLogoRed}>Blood</span>
        </span>
        <button className={s.navBtn} onClick={() => navigate('/auth')}>
          Se connecter
        </button>
      </nav>

      {/* ── HERO — 2 colonnes ── */}
      <section className={s.hero}>
        <div className={s.heroTopLine} aria-hidden="true" />

        {/* Colonne gauche */}
        <div className={s.heroLeft}>
          <div className={s.heroBadge}>
            <span className={s.badgeDot} />
            Thérapie d'exposition graduelle
          </div>

          <h1 className={s.heroTitle}>
            Arrête de fuir.<br />
            <span className={s.heroTitleRed}>Commence à guérir.</span>
          </h1>

          <div className={s.heroDivider} aria-hidden="true" />

          <div className={s.heroBottom}>
            <p className={s.heroSub}>
              Une app de désensibilisation progressive. 5 niveaux.
              Des exercices concrets. Un système de progression qui te
              garde motivé·e jusqu'à la maîtrise complète.
            </p>

            <div className={s.levels}>
              {LEVELS.map((lv) => (
                <span
                  key={lv.label}
                  className={`${s.levelPill} ${
                    lv.state === 'done'   ? s.levelDone   :
                    lv.state === 'active' ? s.levelActive :
                    s.levelLocked
                  }`}
                >
                  {lv.state === 'locked' ? `🔒 ${lv.label}` : lv.label}
                </span>
              ))}
            </div>

            <div className={s.heroBtns}>
              <button className={s.btnPrimary} onClick={handleCheckout} disabled={loading}>
                {loading ? 'Redirection…' : 'Commencer — 29€ une fois'}
              </button>
              <button
                className={s.btnSecondary}
                onClick={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Comment ça marche ?
              </button>
            </div>

            {error && <p className={s.heroError}>{error}</p>}

            <p className={s.heroGuarantees}>
              ✓ Accès complet · ✓ Sans abonnement · ✓ Remboursé sous 14 jours
            </p>
          </div>
        </div>

        {/* Colonne droite */}
        <div className={s.heroRight}>

          {/* Card de progression */}
          <div className={s.progressCard}>
            <div className={s.progressCardHeader}>
              <span className={s.progressCardTitle}>Niveau 3 — Observation directe</span>
              <span className={s.progressCardPct}>62%</span>
            </div>
            <div className={s.progressBarTrack}>
              <div className={s.progressBarFill} />
            </div>
            <ul className={s.exerciseList}>
              {EXERCISES.map((ex) => (
                <li
                  key={ex.label}
                  className={`${s.exercise} ${
                    ex.state === 'done'   ? s.exDone   :
                    ex.state === 'active' ? s.exActive :
                    s.exTodo
                  }`}
                >
                  {ex.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Mini stats */}
          <div className={s.heroStatsRow}>
            <div className={s.miniCard}>
              <span className={s.miniCardValue}>2 147</span>
              <span className={s.miniCardLabel}>personnes guéries</span>
            </div>
            <div className={s.miniCard}>
              <span className={s.miniCardValue}>3 sem.</span>
              <span className={s.miniCardLabel}>durée moyenne</span>
            </div>
          </div>

        </div>
      </section>

      {/* ── STATS ── */}
      <section className={s.stats}>
        <div className={s.statsGrid}>
          {STATS.map((st) => (
            <div key={st.value} className={s.statItem}>
              <div className={s.statValue}>{st.value}</div>
              <div className={s.statLabel}>{st.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className={s.how}>
        <p className={s.sectionEyebrow}>Méthode</p>
        <h2 className={s.sectionTitle}>Comment ça marche, concrètement ?</h2>
        <div className={s.howCards}>
          {HOW_STEPS.map((step) => (
            <div key={step.step} className={s.howCard}>
              <div className={s.howCardIcon}>{step.icon}</div>
              <p className={s.howCardStep}>{step.step}</p>
              <h3 className={s.howCardTitle}>{step.title}</h3>
              <p className={s.howCardDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── GAMIFICATION ── */}
      <section className={s.gamif}>
        <div className={s.gamifInner}>
          <p className={`${s.sectionEyebrow} ${s.gamifEyebrow}`}>Progression</p>
          <h2 className={`${s.sectionTitle} ${s.gamifTitle}`}>
            Progresse comme dans un jeu.
          </h2>
          <div className={s.gamifCards}>
            {GAMIF_CARDS.map((card) => (
              <div key={card.title} className={s.gamifCard}>
                <div className={s.gamifEmoji}>{card.emoji}</div>
                <h3 className={s.gamifCardTitle}>{card.title}</h3>
                <p className={s.gamifCardDesc}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className={s.cta}>
        <span className={s.ctaLine} aria-hidden="true" />
        <h2 className={s.ctaTitle}>
          Prêt·e à arrêter<br />
          <span className={s.ctaTitleRed}>de fuir ?</span>
        </h2>
        <p className={s.ctaSub}>29€ une fois · Accès à vie · Remboursé sous 14 jours si inefficace.</p>
        {error && <p className={s.ctaError}>{error}</p>}
        <button className={s.btnCta} onClick={handleCheckout} disabled={loading}>
          {loading ? 'Redirection…' : 'Commencer maintenant — 29€'}
        </button>
        <p className={s.ctaNote}>Pas d'abonnement. Accès complet à tous les niveaux.</p>
      </section>

      {/* ── FOOTER ── */}
      <footer className={s.footer}>
        <span className={s.footerLogo}>
          Bye Bye <span className={s.footerLogoRed}>Blood</span>
        </span>
        <span className={s.footerCopy}>© 2026 Bye Bye Blood. Tous droits réservés.</span>
      </footer>
    </div>
  )
}
