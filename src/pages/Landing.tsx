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

const HOW_STEPS = [
  { num: '01', step: 'Étape 1', title: 'Évalue ton niveau',      desc: "Un court questionnaire identifie ton degré d'hémophobie et place ton point de départ." },
  { num: '02', step: 'Étape 2', title: 'Suis le protocole',      desc: "Chaque niveau expose progressivement à des stimuli plus intenses — textes, images, vidéos." },
  { num: '03', step: 'Étape 3', title: 'Progresse graduellement', desc: "Le système adapte la cadence. Tu ne passes au suivant que quand tu es prêt·e." },
  { num: '04', step: 'Étape 4', title: 'Maîtrise complète',       desc: "Au niveau 5, la vue du sang ne déclenche plus de réponse de panique." },
]

const GAMIF_CARDS = [
  { num: '01', title: 'Streak quotidien',   desc: 'Reviens chaque jour pour maintenir ton rythme. La régularité est la clé de la désensibilisation.' },
  { num: '02', title: 'Points XP',          desc: 'Chaque exercice complété rapporte des XP. Monte de niveau et débloque la suite du parcours.' },
  { num: '03', title: 'Badges de maîtrise', desc: 'Décroche des badges à chaque palier franchi. Une preuve concrète de tes progrès réels.' },
]

const STATS = [
  { value: '5 niveaux',   label: 'progressifs' },
  { value: '14 jours',    label: 'satisfait ou remboursé' },
  { value: '100% fondé',  label: 'sur la science' },
  { value: '1× paiement', label: 'unique, accès à vie' },
]

/* ── Product Mockup ── */
function ProductMockup() {
  return (
    <div className={s.mockup}>
      <div className={s.mockupHeader}>
        <div>
          <div className={s.mockupTitle}>Niveau 3</div>
          <div className={s.mockupSub}>Observation directe</div>
        </div>
        <span className={s.mockupPct}>62%</span>
      </div>
      <div className={s.mockupTrack}><div className={s.mockupFill} /></div>
      <ul className={s.mockupList}>
        <li className={`${s.mockupItem} ${s.mockupItemDone}`}>
          <span className={s.mockupDot} />Introduction à l'hémophobie
        </li>
        <li className={`${s.mockupItem} ${s.mockupItemActive}`}>
          <span className={s.mockupDot} />Observation d'images médicales
        </li>
        <li className={`${s.mockupItem} ${s.mockupItemLocked}`}>
          <span className={s.mockupDot} />Vidéos de prélèvements sanguins
        </li>
        <li className={`${s.mockupItem} ${s.mockupItemLocked}`}>
          <span className={s.mockupDot} />Exercice de respiration avancé
        </li>
      </ul>
    </div>
  )
}

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

      {/* ── HERO ── */}
      <section className={s.hero}>
        <div className={s.heroTopLine} aria-hidden="true" />

        {/* Colonne gauche */}
        <div className={s.heroLeft}>
          <div className={s.heroBadge}>
            ✓ 2 147 personnes déjà libérées
          </div>

          <h1 className={s.heroTitle}>
            Peur du sang ?<br />
            <span className={s.heroTitleRed}>Plus pour longtemps.</span>
          </h1>

          <div className={s.heroDivider} aria-hidden="true" />

          <div className={s.heroBottom}>
            <p className={s.heroSub}>
              Désensibilise-toi à la vue du sang, progressivement, à ton rythme.
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

            <div className={s.heroSignIn}>
              <span className={s.heroSignInText}>Déjà un compte ?</span>
              <button className={s.heroSignInBtn} onClick={() => navigate('/auth')}>
                Se connecter →
              </button>
            </div>

            {error && <p className={s.heroError}>{error}</p>}

            <p className={s.heroGuarantees}>
              ✓ Accès complet · ✓ Sans abonnement · ✓ Remboursé sous 14 jours
            </p>
          </div>
        </div>

        {/* Colonne droite — mockup */}
        <div className={s.heroRight}>
          <ProductMockup />
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
              <div className={s.howCardNum}>{step.num}</div>
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
          <p className={`${s.sectionEyebrow} ${s.gamifEyebrow}`}>Tu ne lâcheras pas</p>
          <h2 className={`${s.sectionTitle} ${s.gamifTitle}`}>
            Un système conçu pour te garder motivé·e.
          </h2>
          <div className={s.gamifCards}>
            {GAMIF_CARDS.map((card) => (
              <div key={card.title} className={s.gamifCard}>
                <div className={s.gamifNum}>{card.num}</div>
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
