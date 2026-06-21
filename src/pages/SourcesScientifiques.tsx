import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SOURCES, sourcesByTheme } from '@/data/sources'
import s from './SourcesScientifiques.module.css'

const THEME_ORDER = [
  'Épidémiologie',
  'Mécanisme physiologique',
  'Tension musculaire appliquée',
  'Exposition graduée',
  'Respiration',
  'ACT (Acceptance and Commitment Therapy)',
]

export default function SourcesScientifiques() {
  const location = useLocation()
  const groups = sourcesByTheme()
  const ordered = THEME_ORDER.filter(t => groups[t])
  const backTo = location.state?.from ?? '/'

  useEffect(() => {
    const prev = document.title
    document.title = 'Fondements scientifiques - Bye Bye Blood'
    const meta = document.querySelector('meta[name="description"]')
    const prevDesc = meta?.getAttribute('content') ?? ''
    meta?.setAttribute('content', "Les études et sources scientifiques derrière Bye Bye Blood : exposition graduelle, tension musculaire appliquée (Öst 1987), ACT et respiration. Références académiques complètes sur l'hémophobie.")
    return () => {
      document.title = prev
      meta?.setAttribute('content', prevDesc)
    }
  }, [])

  return (
    <div className={s.page}>
      <nav className={s.nav}>
        <Link to="/" className={s.navLogo}>
          Bye Bye <span>Blood</span>
        </Link>
        <Link to={backTo} className={s.backLink}>
          ← Retour
        </Link>
      </nav>

      <div className={s.wrap}>
        <section className={s.hero}>
          <div className={s.eyebrow}>Fondements scientifiques</div>
          <h1 className={s.h1}>
            Ce que dit<br />
            <span>la recherche.</span>
          </h1>
          <p className={s.intro}>
            Chaque technique du programme s'appuie sur des études publiées dans des revues à comité de lecture. Cette page regroupe les sources principales, avec un résumé accessible et la référence complète pour aller plus loin.
          </p>
          <p className={s.disclaimer}>
            ⚕ Ces études soutiennent les techniques utilisées dans le programme. Elles ne remplacent pas un diagnostic ou un suivi médical. En cas de phobie sévère ou de malaises répétés, consulte un professionnel de santé.
          </p>
        </section>

        {/* Résumés par thème */}
        <section>
          <h2 className={s.sectionTitle}>Résumés par thème</h2>
          <p className={s.sectionSub}>Les résultats clés, en langage simple.</p>

          {ordered.map(theme => (
            <div key={theme} className={s.themeGroup}>
              <div className={s.themeLabel}>{theme}</div>
              <div className={s.cards}>
                {groups[theme].map(src => (
                  <div key={src.id} id={src.id} className={s.card}>
                    {src.n && (
                      <p className={s.cardN}>{src.n.toLocaleString('fr-FR')} participant{src.n > 1 ? 's' : ''}</p>
                    )}
                    <p className={s.cardFinding}>{src.finding}</p>
                    <p className={s.cardCitationSmall}>{src.citation}</p>
                    <a
                      href={`#bib-${src.id}`}
                      className={s.cardLink}
                    >
                      Référence complète ↓
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <hr className={s.divider} />

        {/* Bibliographie complète */}
        <section>
          <h2 className={s.sectionTitle}>Bibliographie complète</h2>
          <p className={s.sectionSub}>Toutes les références académiques, dans l'ordre des thèmes.</p>

          <ol className={s.bibList}>
            {SOURCES.map((src, i) => (
              <li key={src.id} id={`bib-${src.id}`} className={s.bibItem}>
                <span className={s.bibNum}>{i + 1}</span>
                <div className={s.bibContent}>
                  <p className={s.bibCitation}>{src.citation}</p>
                  <p className={s.bibFinding}>{src.finding}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <footer className={s.footer}>
        Bye Bye Blood · 2026 · Les études citées sont accessibles via PubMed, Google Scholar ou les revues référencées.
      </footer>
    </div>
  )
}
