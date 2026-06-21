import { useState, type ReactNode } from 'react'
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
    name: 'Comprendre ta peur', sub: 'La connaissance comme premier remède', pct: 100, locked: false,
    steps: [
      ["Qu'est-ce que l'hémophobie ?", 'done'],
      ["Le mécanisme vasovagal expliqué", 'done'],
      ["ACT : le piège du contrôle", 'done'],
      ["Tenir un journal de suivi", 'done'],
    ],
  },
  {
    name: 'Respirer pour contrôler', sub: 'Ton souffle, ton premier outil', pct: 100, locked: false,
    steps: [
      ["Cohérence cardiaque (5-5)", 'done'],
      ["Technique 4-7-8", 'done'],
      ["Exercice guidé de respiration", 'done'],
      ["Ancrage respiratoire", 'done'],
    ],
  },
  {
    name: 'Applied Tension', sub: 'La technique qui change tout', pct: 60, locked: false,
    steps: [
      ["La tension musculaire appliquée", 'done'],
      ["La défusion cognitive", 'done'],
      ["Exercice de tension guidé", 'active'],
      ["Tenir malgré la peur", 'todo'],
    ],
  },
  {
    name: 'Exposition par les couleurs', sub: 'Du rose au rouge, en douceur', pct: 0, locked: true,
    steps: [
      ["Du rose au rouge", 'todo'],
      ["Acceptation comme choix actif", 'todo'],
      ["Exercice de couleurs", 'todo'],
      ["Ancrage par les valeurs", 'todo'],
    ],
  },
  {
    name: 'Exposition par les formes', sub: 'Des formes abstraites, sans contexte', pct: 0, locked: true,
    steps: [
      ["Formes abstraites évocatrices", 'todo'],
      ["Le soi observateur", 'todo'],
      ["Exercice de formes progressif", 'todo'],
      ["Retour au souffle", 'todo'],
    ],
  },
  {
    name: 'Exposition par les images', sub: 'Du plus abstrait au plus concret', pct: 0, locked: true,
    steps: [
      ["Images progressives niveau 1", 'todo'],
      ["Images progressives niveau 2", 'todo'],
      ["Images progressives niveau 3", 'todo'],
      ["Intégration des outils", 'todo'],
    ],
  },
  {
    name: 'Maîtrise totale', sub: 'Prêt·e pour la vraie vie', pct: 0, locked: true,
    steps: [
      ["Scénarios réels", 'todo'],
      ["Synthèse ACT complète", 'todo'],
      ["Engagement vers ta vie", 'todo'],
      ["Ton prochain rendez-vous médical", 'todo'],
    ],
  },
]

const PARCOURS = [
  { bg: '#FFFDF8', border: '#E7DCC9', numColor: '#1C1714', tagColor: '#A0907A',
    num: '01', name: 'Comprendre ta peur',
    story: "Tu lis, tu nommes. L'hémophobie devient un mécanisme, pas un mystère. La connaissance est le premier pas hors de la peur.",
    tag: 'La compréhension' },
  { bg: '#FDF6EE', border: '#EDE0CE', numColor: '#B82E22', tagColor: '#B09070',
    num: '02', name: 'Respirer pour contrôler',
    story: "Cohérence cardiaque, technique 4-7-8. Ton souffle devient un levier. Tu apprends à calmer ton système nerveux à la demande.",
    tag: 'Le souffle' },
  { bg: '#FAE8D8', border: '#ECCDB9', numColor: '#C32A1E', tagColor: '#B5876A',
    num: '03', name: 'Applied Tension',
    story: "Tu contractes tes bras et tes jambes quelques secondes. Ta pression remonte, le malaise recule. C'est la technique qui t'évite de tomber.",
    tag: 'La technique' },
  { bg: '#F6D8C4', border: '#E6B7A2', numColor: '#B2261A', tagColor: '#A6786A',
    num: '04', name: 'Exposition par les couleurs',
    story: "Du rose pâle au rouge soutenu, par degrés. Tu regardes. Tu respires. Tu tiens. Le rouge perd son emprise.",
    tag: 'Le regard' },
  { bg: '#F1C6AE', border: '#DFA48C', numColor: '#A62217', tagColor: '#956252',
    num: '05', name: 'Exposition par les formes',
    story: "Des formes abstraites sans contexte, puis de moins en moins abstraites. Le soi observateur regarde sans être emporté.",
    tag: 'La distance' },
  { bg: '#EBB499', border: '#D9987E', numColor: '#921D13', tagColor: '#904F44',
    num: '06', name: 'Exposition par les images',
    story: "Des représentations de plus en plus concrètes, accompagnées de tous les outils. Tu sais pourquoi tu es là. Tu restes.",
    tag: 'L\'image' },
  { bg: '#E4A088', border: '#CF8A6E', numColor: '#7E180F', tagColor: '#844038',
    num: '07', name: 'Maîtrise totale',
    story: "Des scénarios réels. La synthèse complète. Et enfin, un vrai rendez-vous médical que tu traverses debout, sans fuir.",
    tag: 'Le réel' },
]

const FAQ = [
  {
    q: "Est-ce que j'ai vraiment une phobie, ou juste du dégoût ?",
    a: "La différence, ce n'est pas l'intensité de la réaction. C'est ce que tu évites à cause d'elle. Le dégoût, tout le monde le ressent face au sang. La phobie, elle, te fait organiser ta vie autour de l'évitement : tu repousses des prises de sang, tu quittes une salle d'attente, tu refuses de regarder certaines scènes. Si la peur du sang t'a déjà coûté quelque chose, un rendez-vous médical, un don de sang, une situation d'urgence, ce n'est plus du dégoût. C'est une phobie spécifique, reconnue par le DSM-5, et elle concerne entre 3 et 4 % de la population. Tu n'es pas seul·e, et surtout : ce n'est pas une question de caractère.",
  },
  {
    q: "Pourquoi est-ce qu'on s'évanouit en voyant du sang, alors que les autres phobies font le contraire ?",
    a: "C'est la question que tout le monde se pose, et la réponse est fascinante. Presque toutes les phobies déclenchent le système sympathique : le cœur s'emballe, la pression monte, le corps se prépare à fuir. L'hémophobie fait exactement l'inverse. Le nerf vague contre-attaque, ralentit le cœur, dilate les vaisseaux, et la pression artérielle s'effondre. Le cerveau reçoit moins de sang pendant quelques secondes, et tu t'évanouis. C'est ce qu'on appelle la réponse vasovagale biphasique. Les chercheurs pensent que ce mécanisme est un vestige évolutif : simuler la mort pour décourager un prédateur. Ton corps fait encore ça aujourd'hui face à une prise de sang. C'est involontaire, c'est absurde, et c'est précisément pour ça qu'on peut le contourner avec une technique spécifique.",
  },
  {
    q: "C'est prouvé par la science ?",
    a: <>Oui, et on a pris soin de ne mettre dans ce programme que ce qui l'est. L'exposition graduelle est le traitement de référence des phobies spécifiques selon l'OMS. La tension musculaire appliquée a été développée et testée par Lars-Göran Öst, professeur de psychologie à Stockholm, dans des essais cliniques publiés dès 1987. Une méta-analyse portant sur plus de 1 800 patients traités par ACT a montré des effets robustes sur l'anxiété et les phobies. Toutes les sources sont accessibles sur la page <a href="/sources" style={{color:'#3B6EA0', textDecoration:'underline'}}>Fondements scientifiques</a>. On ne te demande pas de nous croire sur parole.</>,
  },
  {
    q: "Pourquoi ce programme n'est-il pas un traitement médical ?",
    a: "C'est une distinction importante, et on préfère l'expliquer plutôt que de juste la mettre en petits caractères. Un traitement médical implique un diagnostic posé par un professionnel de santé, une prescription, et un suivi clinique. Ce programme ne fait rien de tout ça. Ce qu'il fait, c'est t'apprendre des techniques validées scientifiquement et te guider à travers leur application à ton rythme. C'est éducatif et pratique, pas clinique. La différence, c'est un peu comme le sport et la médecine : marcher 30 minutes par jour est prouvé bénéfique pour le cœur, mais ce n'est pas un traitement cardiaque. Si tu as des malaises fréquents, des antécédents cardiaques, ou une phobie qui t'empêche de fonctionner au quotidien, parle d'abord à un médecin. Pour tous les autres, ce programme est un point de départ sérieux, structuré, et fondé.",
  },
  {
    q: "La peur du sang peut-elle vraiment disparaître ?",
    a: "Disparaître complètement, pas nécessairement. Devenir gérable, ne plus te coûter rien dans la vraie vie : oui, et les chiffres sont là pour le confirmer. Les études sur l'exposition graduelle pour l'hémophobie montrent des taux d'amélioration significative supérieurs à 80 % des participants, maintenus à un an de suivi. Lars-Göran Öst a documenté des résultats en une à cinq séances intensives avec un thérapeute. L'objectif n'est pas que le sang te devienne indifférent. C'est que tu puisses faire une prise de sang, voir une scène dans un film, ou aider quelqu'un qui saigne, sans que ton corps parte en vrille. C'est ça, la liberté qu'on vise.",
  },
  {
    q: "C'est quoi exactement la tension musculaire appliquée ?",
    a: "C'est la technique clé pour les personnes qui s'évanouissent, et elle est remarquablement simple. Développée par le professeur Öst à l'Université de Stockholm en 1987, elle repose sur un principe direct : si la réponse vasovagale fait chuter ta pression artérielle, tu peux la contrer en augmentant cette pression manuellement. Comment ? En contractant les muscles des bras, des jambes et de l'abdomen pendant 15 à 20 secondes, puis en relâchant. Répète 5 fois. Ton cœur reçoit un signal de résistance, la pression remonte, et le malaise s'éloigne. Dans les études cliniques, cette technique a permis d'éliminer les évanouissements chez la quasi-totalité des patients traités. Tu l'apprends dans le module 3, mais tu peux commencer à la pratiquer dès maintenant.",
  },
  {
    q: "Comment ça se passe, concrètement, la première séance ?",
    a: "Tu t'inscris, c'est gratuit. La première séance dure environ 20 minutes. Tu lis, tu comprends, tu n'es exposé·e à rien que des mots. Le module 1 commence par la science : pourquoi ton corps réagit comme il le fait, ce que l'hémophobie est réellement, et pourquoi l'évitement aggrave les choses. Il y a un quiz court à la fin, et un espace pour noter ce que tu ressens. Pas d'image, pas de vidéo, pas de confrontation. Juste une porte ouverte. Si tu décides de continuer, tu accèdes aux 6 modules suivants pour 295€ une seule fois, sans abonnement. Beaucoup de gens font le premier module et se disent qu'ils auraient pu commencer bien plus tôt.",
  },
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
function FaqItem({ q, a }: { q: string; a: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={s.faqItem}>
      <button className={s.faqQ} onClick={() => setOpen(!open)} aria-expanded={open}>
        <span>{q}</span>
        <span className={s.faqIcon} aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      {open && <p className={s.faqA}>{a}</p>}
    </div>
  )
}

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
          Termine le module précédent pour débloquer celui-ci.
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
          <a href="#faq" className={s.navLink}>FAQ</a>
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
            Une méthode d'exposition progressive, racontée comme une histoire qu'on a envie de finir.
          </p>

          <div className={s.chips}>
            {NIVEAUX.map((nv, i) => (
              <button key={i} className={chipClass(i)} onClick={() => setCurrent(i)}>
                {nv.locked && i !== current && <LockSvg />}
                Module {i + 1}
              </button>
            ))}
          </div>

          <div className={s.ctaRow}>
            <button className={s.btnPrimary} onClick={() => navigate('/auth')}>
              Faire ma 1ʳᵉ séance, c'est gratuit
            </button>
            <a href="#methode" className={s.btnOutline}>Comment ça marche ?</a>
          </div>

          {error && <p className={s.heroError}>{error}</p>}
        </div>

        <div className={s.heroRight}>
          <NiveauCard nv={NIVEAUX[current]} />
          <p className={s.hint}>Touche un module pour voir ce qu'il contient.</p>
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
                Le sang n'est plus le sujet : il fait partie du décor, il arrive quand l'histoire l'amène. Ton attention reste sur le personnage. Pendant ce temps, sans bruit, ton cerveau s'habitue, et la peur, privée de carburant, redescend.
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
            <div className={s.eyebrow}>Le parcours · sept modules</div>
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

      {/* FAQ */}
      <section id="faq" className={s.section}>
        <div className={s.wrap}>
          <div className={s.col} style={{ maxWidth: '40rem', marginBottom: '2.6rem' }}>
            <div className={s.eyebrow}>Questions fréquentes</div>
            <h2 className={s.h2}>Ce que tu te <span className={s.accent}>demandes surement.</span></h2>
          </div>
          <div className={s.faqList}>
            {FAQ.map((item, i) => <FaqItem key={i} q={item.q} a={item.a} />)}
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
                Commence gratuitement.<br />
                <span className={s.accent}>Garde-le à vie.</span>
              </h2>
              <p className={s.bodyText} style={{ maxWidth: '28rem' }}>
                La première séance est offerte. Si l'histoire te porte, tu débloques les sept modules une bonne fois pour toutes : pas d'abonnement, pas de rappel, pas de date limite.
              </p>
            </div>
            <div className={s.priceCard}>
              <div className={s.priceLabel}>Accès complet · à vie</div>
              <div className={s.priceRow}>
                <span className={s.priceAmt}>295€</span>
                <span className={s.priceOnce}>TTC · une seule fois</span>
              </div>
              <ul className={s.inclList}>
                <li>Les 7 modules du programme, dans l'ordre</li>
                <li>La technique de tension appliquée à chaque étape</li>
                <li>Ton rythme : avance, recule, reviens</li>
                <li>Accès à vie, mises à jour comprises</li>
              </ul>
              {error && <p className={s.priceError}>{error}</p>}
              <button className={s.btnAmber} onClick={handleCheckout} disabled={loading}>
                {loading ? 'Redirection…' : 'Commencer ma 1ʳᵉ séance →'}
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
        <button className={`${s.btnPrimary} ${s.btnLg}`} onClick={() => navigate('/auth')}>
          Faire ma 1ʳᵉ séance, c'est gratuit
        </button>
      </section>

      {/* FOOTER */}
      <footer className={s.footer}>
        <div className={s.footerInner}>
          <div className={s.footerLogo}>Bye Bye <span>Blood</span></div>
          <div className={s.footerDisclaimer}>
            Ceci n'est pas un dispositif médical. En cas de phobie sévère ou de malaises répétés, parles-en à un professionnel de santé. · <a href="/sources" style={{color:'inherit', textDecorationColor:'currentColor'}}>Fondements scientifiques</a> · <a href="/blog/prise-de-sang-peur-evanouissement" style={{color:'inherit', textDecorationColor:'currentColor'}}>Prise de sang et peur</a> · © Bye Bye Blood 2026
          </div>
        </div>
      </footer>

    </div>
  )
}
