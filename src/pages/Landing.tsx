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
  { num: '01', icon: '🧪', step: 'Étape 1', title: 'Évalue ton niveau',      desc: "Un court questionnaire identifie ton degré d'hémophobie et place ton point de départ." },
  { num: '02', icon: '🗺️', step: 'Étape 2', title: 'Suis le protocole',      desc: "Chaque niveau expose progressivement à des stimuli plus intenses — textes, images, vidéos." },
  { num: '03', icon: '📈', step: 'Étape 3', title: 'Progresse graduellement', desc: "Le système adapte la cadence. Tu ne passes au suivant que quand tu es prêt·e." },
  { num: '04', icon: '🏁', step: 'Étape 4', title: 'Maîtrise complète',       desc: "Au niveau 5, la vue du sang ne déclenche plus de réponse de panique." },
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

/* ── Hero Illustration ── */
function HeroIllustration() {
  return (
    <svg viewBox="0 0 420 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={s.heroSvg}>
      {/* Background blobs */}
      <ellipse cx="210" cy="235" rx="185" ry="172" fill="#FFECEC"/>
      <circle cx="355" cy="88" r="58" fill="#FFE0DC" opacity="0.55"/>
      <circle cx="52" cy="395" r="44" fill="#FFE8D6" opacity="0.5"/>
      <circle cx="370" cy="370" r="30" fill="#FFE0DC" opacity="0.4"/>

      {/* Mascot droplet */}
      <path d="M210 50 C210 50 126 162 126 258 C126 305 165 342 210 342 C255 342 294 305 294 258 C294 162 210 50 210 50Z" fill="#E53935"/>

      {/* Eyes */}
      <circle cx="188" cy="246" r="7.5" fill="white"/>
      <circle cx="232" cy="246" r="7.5" fill="white"/>
      <circle cx="190" cy="247.5" r="3.5" fill="#1a1a1a"/>
      <circle cx="234" cy="247.5" r="3.5" fill="#1a1a1a"/>
      {/* Eye shine */}
      <circle cx="192" cy="245" r="1.5" fill="white"/>
      <circle cx="236" cy="245" r="1.5" fill="white"/>

      {/* Smile */}
      <path d="M191 276 Q210 298 229 276" stroke="white" strokeWidth="4.5" strokeLinecap="round" fill="none"/>

      {/* Rosy cheeks */}
      <circle cx="170" cy="266" r="13" fill="white" opacity="0.18"/>
      <circle cx="250" cy="266" r="13" fill="white" opacity="0.18"/>

      {/* Sparkles */}
      <g transform="translate(338,185)">
        <path d="M0-11 L2.6-2.6 L11 0 L2.6 2.6 L0 11 L-2.6 2.6 L-11 0 L-2.6-2.6Z" fill="#E53935" opacity="0.5"/>
      </g>
      <g transform="translate(62,172)">
        <path d="M0-8 L1.9-1.9 L8 0 L1.9 1.9 L0 8 L-1.9 1.9 L-8 0 L-1.9-1.9Z" fill="#FF8C5A" opacity="0.65"/>
      </g>
      <g transform="translate(378,308)">
        <path d="M0-5.5 L1.3-1.3 L5.5 0 L1.3 1.3 L0 5.5 L-1.3 1.3 L-5.5 0 L-1.3-1.3Z" fill="#E53935" opacity="0.4"/>
      </g>
      <g transform="translate(40,275)">
        <path d="M0-6.5 L1.5-1.5 L6.5 0 L1.5 1.5 L0 6.5 L-1.5 1.5 L-6.5 0 L-1.5-1.5Z" fill="#FF8C5A" opacity="0.45"/>
      </g>

      {/* Connector line */}
      <path d="M65 435 C100 418 138 432 175 427 C212 422 248 432 285 427 C322 422 352 432 375 430" stroke="#E8DDD5" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="5 6"/>

      {/* Level 1 */}
      <circle cx="65" cy="435" r="24" fill="#1a1a1a"/>
      <text x="65" y="441" textAnchor="middle" fill="white" fontSize="13" fontWeight="800" fontFamily="Plus Jakarta Sans,sans-serif">1</text>

      {/* Level 2 */}
      <circle cx="162" cy="428" r="24" fill="#1a1a1a"/>
      <text x="162" y="434" textAnchor="middle" fill="white" fontSize="13" fontWeight="800" fontFamily="Plus Jakarta Sans,sans-serif">2</text>

      {/* Level 3 — active */}
      <circle cx="210" cy="450" r="30" fill="#E53935" opacity="0.18"/>
      <circle cx="210" cy="450" r="24" fill="#E53935"/>
      <text x="210" y="456" textAnchor="middle" fill="white" fontSize="13" fontWeight="800" fontFamily="Plus Jakarta Sans,sans-serif">3</text>

      {/* Level 4 */}
      <circle cx="258" cy="428" r="24" fill="#EDE6DE"/>
      <text x="258" y="434" textAnchor="middle" fill="#B8AFA6" fontSize="13" fontWeight="800" fontFamily="Plus Jakarta Sans,sans-serif">4</text>

      {/* Level 5 */}
      <circle cx="375" cy="432" r="24" fill="#EDE6DE"/>
      <text x="375" y="438" textAnchor="middle" fill="#B8AFA6" fontSize="13" fontWeight="800" fontFamily="Plus Jakarta Sans,sans-serif">5</text>
    </svg>
  )
}

/* ── Wave Divider ── */
function WaveDivider({ topColor, bottomColor }) {
  return (
    <div style={{ background: topColor, lineHeight: 0, display: 'block' }}>
      <svg viewBox="0 0 1440 72" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: '72px' }}>
        <path d="M0 36 Q180 0 360 36 Q540 72 720 36 Q900 0 1080 36 Q1260 72 1440 36 L1440 72 L0 72Z" fill={bottomColor}/>
      </svg>
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

        {/* Colonne droite — illustration */}
        <div className={s.heroRight}>
          <HeroIllustration />
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

      <WaveDivider topColor="#FFFCF7" bottomColor="#0A0A0A" />

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

      <WaveDivider topColor="#0A0A0A" bottomColor="#FFFCF7" />

      {/* ── HOW IT WORKS ── */}
      <section id="how" className={s.how}>
        <p className={s.sectionEyebrow}>Méthode</p>
        <h2 className={s.sectionTitle}>Comment ça marche, concrètement ?</h2>
        <div className={s.howCards}>
          {HOW_STEPS.map((step) => (
            <div key={step.step} className={s.howCard}>
              <div className={s.howCardNum}>{step.num}</div>
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
