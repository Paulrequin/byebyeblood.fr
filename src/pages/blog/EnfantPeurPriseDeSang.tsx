import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { injectOgMeta } from '@/lib/seoMeta'
import s from './Article.module.css'

export default function EnfantPeurPriseDeSang() {
  useEffect(() => {
    const prevTitle = document.title
    document.title = 'Mon enfant a peur des prises de sang : que faire - Bye Bye Blood'
    const meta = document.querySelector('meta[name="description"]')
    const prevDesc = meta?.getAttribute('content') ?? ''
    meta?.setAttribute('content', "Votre enfant pleure, se débat ou s'évanouit à chaque prise de sang ? Ce n'est pas du caprice. Voici ce que dit la science sur la peur du sang chez l'enfant et comment l'aider concrètement.")

    const restoreOg = injectOgMeta({
      title: "Mon enfant a peur des prises de sang : que lui dire, que faire",
      description: "Votre enfant pleure ou s'évanouit à chaque prise de sang ? Ce n'est pas du caprice. Voici ce que dit la science et comment l'aider concrètement.",
      url: 'https://www.byebyeblood.fr/blog/enfant-peur-prise-de-sang',
    })

    const canonical = document.createElement('link')
    canonical.rel = 'canonical'
    canonical.href = 'https://www.byebyeblood.fr/blog/enfant-peur-prise-de-sang'
    canonical.id = 'page-canonical'
    document.head.appendChild(canonical)

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: 'Mon enfant a peur des prises de sang : que lui dire, que faire',
      description: "Ce n'est pas du caprice. Voici ce que dit la science sur la peur du sang chez l'enfant, ce qu'il ne faut pas dire, et ce qui aide vraiment.",
      datePublished: '2026-06-21',
      dateModified: '2026-06-21',
      inLanguage: 'fr-FR',
      url: 'https://www.byebyeblood.fr/blog/enfant-peur-prise-de-sang',
      mainEntityOfPage: 'https://www.byebyeblood.fr/blog/enfant-peur-prise-de-sang',
      author: { '@type': 'Organization', name: 'Bye Bye Blood', url: 'https://www.byebyeblood.fr' },
      publisher: { '@type': 'Organization', name: 'Bye Bye Blood', url: 'https://www.byebyeblood.fr' },
      keywords: ['enfant peur prise de sang', 'phobie sang enfant', 'hémophobie enfant', 'prise de sang enfant peur'],
      articleSection: 'Parents',
    }
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'article-schema'
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)

    return () => {
      document.title = prevTitle
      meta?.setAttribute('content', prevDesc)
      restoreOg()
      document.getElementById('page-canonical')?.remove()
      document.getElementById('article-schema')?.remove()
    }
  }, [])

  return (
    <div className={s.page}>

      <nav className={s.nav}>
        <Link to="/" className={s.navLogo}>Bye Bye <span>Blood</span></Link>
        <Link to="/blog" className={s.backLink}>← Blog</Link>
      </nav>

      <article className={s.wrap}>

        <div className={s.eyebrow}>Hémophobie · Parents</div>

        <h1 className={s.h1}>
          Mon enfant a peur des prises de sang : que lui dire, que faire
        </h1>

        <div className={s.meta}>
          <span>6 min de lecture</span>
          <span>·</span>
          <span>21 juin 2026</span>
        </div>

        <p className={s.intro}>
          Il crie depuis la salle d'attente. Il se raidit dès qu'il voit la blouse blanche. Il a pleuré toute la nuit avant le rendez-vous. Et toi, tu ne sais pas quoi dire parce que tu ne veux pas minimiser ce qu'il ressent, mais tu ne veux pas non plus l'alarmer davantage. Voici ce qu'on sait vraiment sur la peur du sang chez l'enfant, et ce qui aide concrètement.
        </p>

        <div className={s.body}>

          <h2>Ce n'est pas du caprice, et ce n'est pas de ta faute</h2>

          <p>
            La première chose à comprendre, c'est que la peur du sang chez l'enfant n'est pas un comportement appris à la maison ni une fragilité de caractère. C'est une phobie spécifique reconnue, qui touche entre 3 et 4 % de la population, adultes et enfants confondus. Elle a une base physiologique précise : quand le cerveau anticipe la vue du sang ou d'une aiguille, il déclenche une chute de pression artérielle via le nerf vague. C'est involontaire, profond, et ça n'a rien à voir avec la volonté.
          </p>

          <p>
            Ce que font souvent les parents sans le savoir, c'est renforcer la phobie en essayant de la contourner. "On n'ira pas si tu as trop peur", "je ne te forcerai pas", "on verra si c'est vraiment nécessaire". Ces phrases partent d'un bon sentiment, mais elles confirment au cerveau de l'enfant que le danger est réel et que fuir était la bonne décision. La phobie s'installe un peu plus.
          </p>

          <h2>Ce qu'il ne faut pas dire</h2>

          <p>
            "C'est rien, ça fait à peine mal." L'enfant ne souffre pas principalement de douleur. Il a peur de perdre conscience, de voir son sang, de perdre le contrôle de son corps. Minimiser la douleur physique rate complètement la cible.
          </p>

          <p>
            "Sois courageux, les grands ne pleurent pas." Le courage n'a rien à voir là-dedans. C'est une réaction physiologique, pas un choix. Cette phrase ajoute de la honte à la peur, ce qui est exactement ce dont on n'a pas besoin.
          </p>

          <p>
            "Je sais que tu n'aimes pas ça, mais tu n'as pas le choix." Techniquement vrai, mais dit comme ça, ça ferme la conversation. L'enfant a besoin de sentir qu'il a des outils, pas juste une obligation.
          </p>

          <h2>Ce qui marche vraiment</h2>

          <p>
            Avant tout, valide ce qu'il ressent sans amplifier. "Je comprends que tu as peur, c'est normal d'avoir peur. Et on va faire ça ensemble." Pas de catastrophisme, pas de minimisation. Une présence neutre et solide.
          </p>

          <p>
            Ensuite, donne-lui un outil concret. Les enfants répondent très bien à la tension musculaire appliquée dès 8-10 ans, à condition de la leur apprendre à froid, bien avant le rendez-vous. L'idée est simple : contracter fort les muscles des bras, des jambes et du ventre pendant 15 secondes, relâcher, répéter. Tu peux en faire un jeu à la maison : "qui tient le plus longtemps sans sourire pendant qu'on contracte." Quand ça devient automatique, ça devient un outil qu'il peut utiliser seul dans la cabine.
          </p>

          <div className={s.science}>
            <div className={s.scienceLabel}>Ce que dit la science</div>
            <p className={s.scienceText}>
              Les études sur les phobies spécifiques chez l'enfant montrent que l'exposition graduelle associée à des techniques de gestion physiologique (dont la tension musculaire) donne des résultats rapides, souvent en quelques semaines. L'implication du parent comme "co-thérapeute" calme et non anxieux est un facteur clé de succès. Un parent qui gère bien sa propre anxiété pendant le rendez-vous réduit significativement la réaction de l'enfant.
            </p>
          </div>

          <h2>Le jour du rendez-vous</h2>

          <p>
            Dis-lui à l'avance ce qui va se passer, étape par étape, sans détails inutiles. L'anticipation dans le flou est souvent pire que la réalité annoncée clairement. "On va arriver, on va attendre un peu, l'infirmière va prendre ton bras, tu sentiras une petite piqûre, et c'est terminé en deux minutes."
          </p>

          <p>
            Dans la salle d'attente, garde une conversation normale. Parlez de n'importe quoi d'autre. Évite de lui demander toutes les cinq minutes comment il se sent, ça focalise l'attention sur la peur.
          </p>

          <p>
            Dans la cabine, dis à l'infirmier·e en avance que ton enfant a peur. Les soignants adaptent systématiquement leur façon de faire : position allongée, annonce avant la piqûre, tubes rangés rapidement. Ce n'est pas une demande extraordinaire.
          </p>

          <p>
            Pendant le prélèvement, propose-lui de regarder ailleurs et de continuer à te parler. S'il connaît la technique de tension musculaire, c'est le moment de l'utiliser. Reste calme toi-même, physiquement : ne serre pas sa main trop fort, ne retiens pas ta respiration. Il lit ton corps autant que tes mots.
          </p>

          <h2>Et si ça ne suffit pas ?</h2>

          <p>
            Certains enfants ont une phobie suffisamment ancrée pour que les techniques du quotidien ne suffisent pas. Si les prises de sang entrainent des crises importantes ou que ton enfant commence à éviter des situations médicales au sens large, un suivi en thérapie comportementale et cognitive (TCC) avec exposition graduelle est efficace et rapide, généralement en 6 à 12 séances.
          </p>

          <p>
            Ce qu'il ne faut pas faire : attendre que ça passe tout seul. La phobie du sang a tendance à s'aggraver avec l'âge si on ne la traite pas, parce que chaque évitement réussi la renforce un peu plus. Un enfant de 8 ans qui a peur des prises de sang peut devenir un adulte qui repousse ses bilans médicaux pendant des années.
          </p>

          <p>
            La bonne nouvelle, c'est que c'est l'une des phobies les mieux traitées. Elle répond vite, et les résultats tiennent dans le temps.
          </p>

        </div>

        <div className={s.related}>
          <div className={s.relatedLabel}>À lire aussi</div>
          <div className={s.relatedLinks}>
            <Link to="/blog/hemophobie-traitement" className={s.relatedLink}>
              <span className={s.relatedLinkTag}>Comprendre</span>
              <p className={s.relatedLinkTitle}>Hémophobie : ce que c'est vraiment et comment s'en sortir</p>
            </Link>
            <Link to="/blog/prise-de-sang-peur-evanouissement" className={s.relatedLink}>
              <span className={s.relatedLinkTag}>Conseils pratiques</span>
              <p className={s.relatedLinkTitle}>Prise de sang : que faire quand on a peur de s'évanouir</p>
            </Link>
          </div>
        </div>

        <div className={s.cta}>
          <div className={s.ctaLabel}>Programme de désensibilisation</div>
          <h2 className={s.ctaTitle}>
            Pour les adultes qui ont gardé cette peur
          </h2>
          <p className={s.ctaText}>
            Bye Bye Blood s'adresse aux adultes qui ont grandi avec cette peur et veulent s'en libérer. 7 modules progressifs, première séance gratuite, aucune image difficile.
          </p>
          <Link to="/auth" className={s.ctaBtn}>
            Commencer gratuitement →
          </Link>
        </div>

      </article>

      <footer className={s.footer}>
        Bye Bye Blood · Ceci n'est pas un dispositif médical · <Link to="/sources" style={{color:'inherit'}}>Fondements scientifiques</Link>
      </footer>

    </div>
  )
}
