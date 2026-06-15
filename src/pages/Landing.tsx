import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { startCheckout } from '@/services/profileService'
import s from './Landing.module.css'

/* ── Types ── */
type StepState = 'done' | 'active' | 'todo'
interface NiveauData {
  name: string
  sub: string
  pct: number
  locked: boolean
  steps: [string, StepState][]
}

/* ── Data ── */
const NIVEAUX: NiveauData[] = [
  {
    name: 'Les mots', sub: 'Apprivoiser par le récit', pct: 100, locked: false,
    steps: [
      ["Comprendre l'hémophobie", 'done'],
      ["Nommer ce qui fait peur", 'done'],
      ["Premier chapitre du récit", 'done'],
      ["Respiration de base", 'done'],
    ],
  },
  {
    name: 'Les images', sub: 'Illustrations, puis photos douces', pct: 100, locked: false,
    steps: [
      ["Dessins et schémas", 'done'],
      ["Photographies choisies", 'done'],
      ["Le récit s'illustre", 'done'],
      ["Ancrage respiratoire", 'done'],
    ],
  },
  {
    name: 'Observation directe', sub: 'Images médicales, en douceur', pct: 62, locked: false,
    steps: [
      ["Introduction à l'hémophobie", 'done'],
      ["Observation d'images médicales", 'active'],
      ["Vidéos de prélèvements sanguins", 'todo'],
      ["Exercice de respiration avancé", 'todo'],
    ],
  },
  {
    name: 'La scène', sub: 'Vidéos de prélèvements', pct: 0, locked: true,
    steps: [
      ["Clips courts et contrôlés", 'todo'],
      ["Le geste de soin", 'todo'],
      ["Le récit prend vie", 'todo'],
      ["Tension appliquée", 'todo'],
    ],
  },
  {
    name: 'Le réel', sub: 'Vers la vraie prise de sang', pct: 0, locked: true,
    steps: [
      ["Préparation mentale", 'todo'],
      ["Simulation complète", 'todo'],
      ["Dernier chapitre", 'todo'],
      ["Le vrai rendez-vous", 'todo'],
    ],
  },
]

const PARCOURS = [
  { bg: '#FFFDF8', border: '#E7DCC9', numColor: '#1C1714', tagColor: '#A0907A',
    num: '01', name: 'Les mots',
    story: "Rien que des mots. Tu lis, tu nommes ce qui te terrifie. Le sang devient un sujet — pas encore une image.",
    tag: 'Le seuil' },
  { bg: '#FCF2E8', border: '#EAD9C6', numColor: '#C32A1E', tagColor: '#B79172',
    num: '02', name: 'Les images',
    story: "Des illustrations douces, puis des photographies choisies et dosées. Tu regardes. Tu respires. Tu restes une seconde de plus.",
    tag: 'Le regard' },
  { bg: '#F9E4D6', border: '#ECCDB9', numColor: '#C32A1E', tagColor: '#B5876A',
    num: '03', name: 'La scène',
    story: "Le récit s'anime : un pansement, une éraflure, un geste de soin. Le mouvement arrive, mais l'histoire te tient la main.",
    tag: 'Le mouvement' },
  { bg: '#F4D2C2', border: '#E6B7A2', numColor: '#A6261A', tagColor: '#A6786A',
    num: '04', name: 'Le geste',
    story: "Le décor d'une prise de sang : l'aiguille, le garrot, le coton. Tu t'y familiarises au calme, la tension appliquée en renfort.",
    tag: 'Le soin' },
  { bg: '#EFC0AD', border: '#DFA48C', numColor: '#8E1E12', tagColor: '#955F52',
    num: '05', name: 'Le réel',
    story: "Une vraie prise de sang, au bout du chemin. Tu tends, tu respires, tu tournes la dernière page. Et tu restes debout.",
    tag: 'Le réel' },
]

const METHODE_STEPS = [
  { n: '01', t: 'Doser',
    p: "Chaque chapitre n'ajoute qu'une nuance : un mot plus précis, une image un peu plus nette. Jamais le grand saut." },
  { n: '02', t: 'Tendre',
    p: "La tension appliquée : tu contractes bras et jambes quelques secondes. Ta pression remonte, le malaise recule. C'est ce qui t'évite de tomber." },
  { n: '03', t: 'Répéter',
    p: "L'habituation se gagne par la répétition. Tu relis, tu reviens. Ce qui faisait peur hier devient banal aujourd'hui." },
]

/* ── Sub-components ── */
function LockSvg() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" style={{ display: 'block' }}>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.2" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </svg>
  )
}

function NiveauCard({ nv }: { nv: NiveauData }) {
  return (
    <div className={s.card}>
      <div className={s.cardHead}>
        <div>
          <div className={s.cardTitle}>{nv.name}</div>
          <div className={s.cardSub}>{nv.sub}</div>
        </div>
        <div className={s.cardPct}>{nv.locked ? 'Verrouillé' : `${nv.pct} %`}</div>
      </div>
      <div className={s.track}>
        <div
          className={s.bar}
          style={{
            width: `${nv.locked ? 0 : nv.pct}%`,
            background: nv.locked ? '#E0D4C0' : '#EE3D2E',
          }}
        />
      </div>
      <ul className={s.cardSteps}>
        {nv.steps.map(([label, state]) => (
          <li key={label} className={s.cardStep}>
            <span
              className={s.stepDot}
              style={{
                background: state === 'done' ? '#1C1714' : state === 'active' ? '#EE3D2E' : '#D8CCB8',
                boxShadow: state === 'active' ? '0 0 0 3px rgba(238,61,46,.18)' : 'none',
              }}
            />
            <span
              className={s.stepLabel}
              style={{
                color: state === 'todo' ? '#A0907A' : '#1C1714',
                fontWeight: state === 'active' ? 700 : 500,
              }}
            >
              {label}
            </span>
          </li>
        ))}
      </ul>
      {nv.locked && (
        <div className={s.lockNote}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <rect x="4.5" y="10.5" width="15" height="10" rx="2.2" />
            <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
          </svg>
          Termine le niveau précédent pour ouvrir ce chapitre.
        </div>
      )}
    </div>
  )
}

/* ── Page ── */
export default function Landing() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(2)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  function chipClass(i: number): string {
    if (i === current) return `${s.chip} ${s.chipActive}`
    if (NIVEAUX[i].pct === 100 && !NIVEAUX[i].locked) return `${s.chip} ${s.chipDone}`
    if (NIVEAUX[i].locked) return `${s.chip} ${s.chipLocked}`
    return s.chip
  }

  return (
    <div className={s.page}>

      {/* NAV */}
      <nav className={s.nav}>
        <a href="#top" className={s.logo}>Bye Bye <span>Blood</span></a>
        <div className={s.navLinks}>
          <a href="#methode" className={s.navLink}>La méthode</a>
          <a href="#parcours" className={s.navLink}>Le parcours</a>
          <a href="#prix" className={s.navLink}>Accès</a>
          <button className={s.navLoginBtn} onClick={() => navigate('/auth')}>Se connecter</button>
        </div>
      </nav>

      {/* HERO */}
      <section id="top" className={s.hero}>
        <div className={s.glow} aria-hidden="true" />

        <div className={s.heroLeft}>
          <div className={s.kicker}>
            <span className={s.kickerDot} />
            Désensibilisation à l'hémophobie
          </div>

          <h1 className={s.h1}>
            Peur du sang ?<br />
            <span className={s.h1Red}>Plus pour longtemps.</span>
          </h1>

          <p className={s.sub}>
            Désensibilise-toi à la vue du sang, progressivement, à ton rythme.
          </p>
          <p className={s.subSerif}>
            Une méthode d'exposition progressive — racontée comme une histoire qu'on a envie de finir.
          </p>

          <div className={s.chips}>
            {NIVEAUX.map((nv, i) => (
              <button key={i} className={chipClass(i)} onClick={() => setCurrent(i)}>
                {nv.locked && i !== current && <LockSvg />}
                Niveau {i + 1}
              </button>
            ))}
          </div>

          <div className={s.ctaRow}>
            <button className={s.btnPrimary} onClick={() => navigate('/auth?next=checkout')}>
              Réserver en pré-vente — 280€
            </button>
            <a href="#methode" className={s.btnOutline}>Comment ça marche ?</a>
          </div>

          {error && <p className={s.heroError}>{error}</p>}
          <p className={s.heroNote}>Pré-vente · Accès garanti le 4 août 2026</p>
        </div>

        <div className={s.heroRight}>
          <NiveauCard nv={NIVEAUX[current]} />
          <p className={s.hint}>Touche un niveau, à gauche, pour voir où mène le récit.</p>
        </div>
      </section>

      {/* L'IDÉE */}
      <section id="idee" className={s.section}>
        <div className={s.wrap}>
          <div className={s.two}>
            <div className={s.col}>
              <div className={s.eyebrow}>Pourquoi ça marche</div>
              <h2 className={s.h2}>
                Tu ne fixes pas<br />des images.<br />
                <span className={s.accent}>Tu lis une histoire.</span>
              </h2>
            </div>
            <div className={s.col}>
              <p className={s.lead}>
                L'exposition brutale, frontale, on l'abandonne au bout de trois images. Un récit, lui, te donne une raison de continuer.
              </p>
              <p className={s.bodyText}>
                Le sang n'est plus le sujet : il fait partie du décor, il arrive quand l'histoire l'amène. Ton attention reste sur le personnage. Pendant ce temps, sans bruit, ton cerveau s'habitue — et la peur, privée de carburant, redescend.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LA MÉTHODE */}
      <section id="methode" className={`${s.section} ${s.sectionCard}`}>
        <div className={s.wrap}>
          <div className={s.col} style={{ maxWidth: '40rem', marginBottom: '3rem' }}>
            <div className={s.eyebrow}>La méthode · exposition progressive</div>
            <h2 className={s.h2}>Un pas, <span className={s.accent}>puis le suivant.</span></h2>
            <p className={s.bodyText}>
              Validée cliniquement, l'exposition graduelle réapprend à ton cerveau que l'image du sang n'annonce aucun danger. On ne saute jamais une marche : c'est le récit qui dose pour toi.
            </p>
          </div>
          <div className={s.steps3}>
            {METHODE_STEPS.map((step) => (
              <div key={step.t} className={s.stepCard}>
                <div className={s.stepCardN}>{step.n}</div>
                <div className={s.stepCardT}>{step.t}</div>
                <p className={s.stepCardP}>{step.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LE PARCOURS */}
      <section id="parcours" className={s.section}>
        <div className={s.wrap}>
          <div className={s.col} style={{ maxWidth: '40rem', marginBottom: '2.6rem' }}>
            <div className={s.eyebrow}>Le parcours · cinq chapitres</div>
            <h2 className={s.h2}>Du mot <span className={s.accent}>au réel.</span></h2>
          </div>
          <div className={s.levels}>
            {PARCOURS.map((lv) => (
              <div
                key={lv.num}
                className={s.level}
                style={{ background: lv.bg, border: `1.5px solid ${lv.border}` }}
              >
                <div className={s.levelNum} style={{ color: lv.numColor }}>{lv.num}</div>
                <div>
                  <div className={s.levelName}>{lv.name}</div>
                  <div className={s.levelStory}>{lv.story}</div>
                </div>
                <div className={s.levelTag} style={{ color: lv.tagColor }}>{lv.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRIX */}
      <section id="prix" className={`${s.section} ${s.sectionCard}`}>
        <div className={s.wrap}>
          <div className={s.twoPrice}>
            <div className={s.col}>
              <div className={s.eyebrow}>L'accès</div>
              <h2 className={s.h2}>
                Rejoins la pré-vente.<br />
                <span className={s.accent}>Accès garanti le 4 août.</span>
              </h2>
              <p className={s.bodyText} style={{ maxWidth: '28rem' }}>
                Les places sont limitées. Réserve maintenant à tarif pré-vente et accède au programme complet dès son ouverture le 4 août 2026.
              </p>
            </div>
            <div className={s.priceCard}>
              <div className={s.priceLabel}>Pré-vente · accès le 4 août 2026</div>
              <div className={s.priceRow}>
                <span className={s.priceAmt}>280€</span>
                <span className={s.priceOnce}>une seule fois</span>
              </div>
              <ul className={s.inclList}>
                <li><b>—</b>Les 5 niveaux du programme complet</li>
                <li><b>—</b>La technique de tension appliquée à chaque étape</li>
                <li><b>—</b>Ton rythme : avance, recule, reviens</li>
                <li><b>—</b>Accès à vie, mises à jour comprises</li>
              </ul>
              {error && <p className={s.priceError}>{error}</p>}
              <button className={s.btnAmber} onClick={handleCheckout} disabled={loading}>
                {loading ? 'Redirection…' : 'Réserver ma place →'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="commencer" className={s.ctaSection}>
        <h2 className={s.ctaTitle}>
          Bye bye, <span className={s.ctaRed}>blood.</span>
        </h2>
        <p className={s.ctaSerif}>
          Un chapitre après l'autre, la peur perd du terrain. Tu n'as qu'à commencer à lire.
        </p>
        <button className={`${s.btnPrimary} ${s.btnLg}`} onClick={() => navigate('/auth?next=checkout')}>
          Réserver en pré-vente — 280€
        </button>
      </section>

      {/* FOOTER */}
      <footer className={s.footer}>
        <div className={s.footerInner}>
          <div className={s.footerLogo}>Bye Bye <span>Blood</span></div>
          <div className={s.footerDisclaimer}>
            Ceci n'est pas un dispositif médical. En cas de phobie sévère ou de malaises répétés, parles-en à un professionnel de santé. · © Bye Bye Blood 2026
          </div>
        </div>
      </footer>

    </div>
  )
}
