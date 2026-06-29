import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { injectOgMeta } from '@/lib/seoMeta'
import s from './BlogIndex.module.css'

const ARTICLES = [
  {
    slug: '/blog/hemophobie-traitement',
    tag: 'Comprendre',
    title: "Hémophobie : ce que c'est vraiment et comment s'en sortir",
    excerpt: "Pourquoi les conseils habituels ne marchent pas, et ce qui fonctionne vraiment selon la science.",
    readTime: '8 min',
  },
  {
    slug: '/blog/prise-de-sang-peur-evanouissement',
    tag: 'Conseils pratiques',
    title: "Prise de sang : que faire quand on a peur de s'évanouir",
    excerpt: "Le mécanisme vasovagal, la technique d'Öst, ce qu'il faut dire à l'infirmier·e. Tout ce que personne n'explique vraiment.",
    readTime: '7 min',
  },
  {
    slug: '/blog/enfant-peur-prise-de-sang',
    tag: 'Parents',
    title: "Mon enfant a peur des prises de sang : que lui dire, que faire",
    excerpt: "Ce n'est pas du caprice. Voici ce qui aide vraiment, et ce qu'il ne faut pas dire.",
    readTime: '6 min',
  },
  {
    slug: '/blog/don-du-sang-peur-hemophobie',
    tag: 'Don du sang',
    title: "Donner son sang quand on a peur du sang : est-ce possible ?",
    excerpt: "Ce que les centres font déjà pour toi, et ce que tu peux préparer de ton côté.",
    readTime: '6 min',
  },
  {
    slug: '/blog/malaise-vagal-causes-symptomes',
    tag: 'Comprendre',
    title: "Malaise vagal : pourquoi ça arrive et comment l'éviter",
    excerpt: "Le mécanisme du nerf vague, les signes avant-coureurs, et ce qu'on fait dans les secondes qui comptent.",
    readTime: '12 min',
  },
  {
    slug: '/blog/peur-des-aiguilles-trypanophobie',
    tag: 'Comprendre',
    title: "Peur des aiguilles : pourquoi ça arrive et comment s'en sortir",
    excerpt: "La trypanophobie touche 1 adulte sur 4. Elle n'est pas irréductible, et les techniques qui marchent sont connues.",
    readTime: '12 min',
  },
  {
    slug: '/blog/grossesse-peur-du-sang-analyses',
    tag: 'Conseils pratiques',
    title: "Grossesse et peur du sang : comment gérer les analyses",
    excerpt: "Jusqu'à 15 prises de sang pendant une grossesse. Voici ce qu'on peut demander, préparer, et anticiper.",
    readTime: '13 min',
  },
]

export default function BlogIndex() {
  useEffect(() => {
    const prevTitle = document.title
    document.title = 'Articles sur l\'hémophobie et la peur du sang - Bye Bye Blood'
    const meta = document.querySelector('meta[name="description"]')
    const prevDesc = meta?.getAttribute('content') ?? ''
    meta?.setAttribute('content', "Articles pratiques et scientifiques sur l'hémophobie, la peur du sang et des aiguilles. Conseils pour les prises de sang, le don du sang, les enfants, et comment s'en sortir vraiment.")

    const restoreOg = injectOgMeta({
      title: "Articles sur l'hémophobie et la peur du sang",
      description: "Articles pratiques et scientifiques sur l'hémophobie, la peur du sang et des aiguilles. Conseils pour les prises de sang, le don du sang, les enfants.",
      url: 'https://www.byebyeblood.fr/blog',
      type: 'website',
    })

    const canonical = document.createElement('link')
    canonical.rel = 'canonical'
    canonical.href = 'https://www.byebyeblood.fr/blog'
    canonical.id = 'page-canonical'
    document.head.appendChild(canonical)

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: "Articles sur l'hémophobie et la peur du sang",
      description: "Articles pratiques et scientifiques sur l'hémophobie, la peur du sang et des aiguilles.",
      url: 'https://www.byebyeblood.fr/blog',
      inLanguage: 'fr-FR',
      publisher: {
        '@type': 'Organization',
        name: 'Bye Bye Blood',
        url: 'https://www.byebyeblood.fr',
      },
    }
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'page-schema'
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)

    return () => {
      document.title = prevTitle
      meta?.setAttribute('content', prevDesc)
      restoreOg()
      document.getElementById('page-canonical')?.remove()
      document.getElementById('page-schema')?.remove()
    }
  }, [])

  return (
    <div className={s.page}>
      <nav className={s.nav}>
        <Link to="/" className={s.navLogo}>Bye Bye <span>Blood</span></Link>
        <Link to="/" className={s.backLink}>← Accueil</Link>
      </nav>

      <div className={s.wrap}>
        <div className={s.eyebrow}>À lire</div>
        <h1 className={s.h1}>Comprendre pour surmonter.</h1>
        <p className={s.intro}>
          Des articles sérieux sur l'hémophobie, la peur du sang et des aiguilles. Pas de sensationnalisme, pas de listes vides. De la science accessible et des conseils qui marchent vraiment.
        </p>

        <div className={s.grid}>
          {ARTICLES.map(a => (
            <Link key={a.slug} to={a.slug} className={s.card}>
              <div className={s.tag}>{a.tag} · {a.readTime}</div>
              <h2 className={s.cardTitle}>{a.title}</h2>
              <p className={s.excerpt}>{a.excerpt}</p>
              <span className={s.readMore}>Lire l'article →</span>
            </Link>
          ))}
        </div>
      </div>

      <footer className={s.footer}>
        Bye Bye Blood · Ceci n'est pas un dispositif médical · <Link to="/sources" style={{color:'inherit'}}>Fondements scientifiques</Link>
      </footer>
    </div>
  )
}
