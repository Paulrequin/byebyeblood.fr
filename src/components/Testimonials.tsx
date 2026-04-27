import s from './Testimonials.module.css'

const STATS = [
  { value: '2 847', label: 'personnes ont déjà commencé' },
  { value: '4.8/5', label: 'de satisfaction' },
  { value: '87%',   label: 'constatent des progrès dès la 1ère semaine' },
]

const REVIEWS = [
  {
    name: 'Léa M.',
    initials: 'LM',
    avatarColor: '#7C3AED',
    rating: 5,
    quote: 'Je m\'évanouissais à la vue d\'une simple prise de sang. Après 2 semaines sur Bye Bye Blood, j\'ai réussi mon bilan sans stress. Je n\'y croyais pas.',
  },
  {
    name: 'Thomas R.',
    initials: 'TR',
    avatarColor: '#0284C7',
    rating: 5,
    quote: 'L\'approche par étapes est géniale. On ne te jette pas dans le grand bain. J\'ai progressé à mon rythme et ça a vraiment marché.',
  },
  {
    name: 'Sophie D.',
    initials: 'SD',
    avatarColor: '#059669',
    rating: 5,
    quote: 'Infirmière et hémophobe, c\'était compliqué. Cette app m\'a aidée à surmonter quelque chose que je pensais impossible à soigner.',
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className={s.stars} aria-label={`${count} étoiles sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={i < count ? s.starFilled : s.starEmpty}
          viewBox="0 0 20 20"
          width="18"
          height="18"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.955c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.95 2.874c-.784.57-1.838-.197-1.539-1.118l1.287-3.955a1 1 0 00-.364-1.118L2.063 9.382c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className={s.section}>
      <div className={s.inner}>

        {/* Stats banner */}
        <div className={s.statsBanner}>
          {STATS.map((st) => (
            <div key={st.label} className={s.statItem}>
              <span className={s.statValue}>{st.value}</span>
              <span className={s.statLabel}>{st.label}</span>
            </div>
          ))}
        </div>

        {/* Cards */}
        <div className={s.grid}>
          {REVIEWS.map((r) => (
            <div key={r.name} className={s.card}>
              <Stars count={r.rating} />
              <p className={s.quote}>"{r.quote}"</p>
              <div className={s.author}>
                <div
                  className={s.avatar}
                  style={{ background: r.avatarColor }}
                  aria-hidden="true"
                >
                  {r.initials}
                </div>
                <span className={s.name}>{r.name}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
