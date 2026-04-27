import s from './HowItWorks.module.css'

const STEPS = [
  {
    num: '01',
    title: 'Tu choisis ton niveau',
    desc: 'Commence par un mini-diagnostic. On identifie ton point de départ pour ne jamais te surexposer dès le début.',
  },
  {
    num: '02',
    title: 'Tu t\'exposes progressivement',
    desc: 'Chaque séance introduit un stimulus légèrement plus intense : texte, image, puis vidéo. Ton cerveau s\'adapte, sans jamais être brusqué.',
  },
  {
    num: '03',
    title: 'Tu gagnes des points et débloques des niveaux',
    desc: 'Chaque exercice complété rapporte des XP. Les niveaux se débloquent au fur et à mesure — et tu vois ta progression en temps réel.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className={s.section}>
      <div className={s.inner}>
        <p className={s.eyebrow}>Comment ça marche</p>
        <h2 className={s.title}>Trois étapes. Zéro brutalité.</h2>
        <div className={s.grid}>
          {STEPS.map((step) => (
            <div key={step.num} className={s.card}>
              <span className={s.num}>{step.num}</span>
              <h3 className={s.cardTitle}>{step.title}</h3>
              <p className={s.cardDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
