import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { injectOgMeta } from '@/lib/seoMeta'
import s from './Article.module.css'

export default function MalaiseVagal() {
  useEffect(() => {
    const prevTitle = document.title
    document.title = 'Malaise vagal : pourquoi ça arrive et comment l\'éviter - Bye Bye Blood'
    const meta = document.querySelector('meta[name="description"]')
    const prevDesc = meta?.getAttribute('content') ?? ''
    meta?.setAttribute('content', "Tu as failli t'évanouir sans raison apparente ? C'est probablement un malaise vagal. Explication du mécanisme, signes avant-coureurs, et ce qu'on peut faire concrètement pour que ça n'arrive plus.")

    const restoreOg = injectOgMeta({
      title: 'Malaise vagal : pourquoi ça arrive et comment l\'éviter',
      description: "Tu as failli t'évanouir sans raison apparente ? C'est probablement un malaise vagal. Mécanisme, signes avant-coureurs, et solutions.",
      url: 'https://www.byebyeblood.fr/blog/malaise-vagal-causes-symptomes',
    })

    const canonical = document.createElement('link')
    canonical.rel = 'canonical'
    canonical.href = 'https://www.byebyeblood.fr/blog/malaise-vagal-causes-symptomes'
    canonical.id = 'page-canonical'
    document.head.appendChild(canonical)

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: 'Malaise vagal : pourquoi ça arrive et comment l\'éviter',
      description: "Mécanisme du malaise vasovagal, signes avant-coureurs, déclencheurs, et ce qu'on peut faire concrètement pour l'éviter.",
      datePublished: '2026-06-28',
      dateModified: '2026-06-28',
      inLanguage: 'fr-FR',
      url: 'https://www.byebyeblood.fr/blog/malaise-vagal-causes-symptomes',
      mainEntityOfPage: 'https://www.byebyeblood.fr/blog/malaise-vagal-causes-symptomes',
      author: { '@type': 'Organization', name: 'Bye Bye Blood', url: 'https://www.byebyeblood.fr' },
      publisher: { '@type': 'Organization', name: 'Bye Bye Blood', url: 'https://www.byebyeblood.fr' },
      keywords: ['malaise vagal', 'malaise vasovagal', 'syncope vasovagale', 'malaise vagal symptomes', 'malaise vagal traitement'],
      articleSection: 'Comprendre',
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

        <div className={s.eyebrow}>Hémophobie · Comprendre</div>

        <h1 className={s.h1}>
          Malaise vagal : pourquoi ça arrive et comment l'éviter
        </h1>

        <div className={s.meta}>
          <span>7 min de lecture</span>
          <span>·</span>
          <span>28 juin 2026</span>
        </div>

        <p className={s.intro}>
          Tu t'es levé trop vite et tu as vu noir. Tu attendais debout depuis une heure et tes jambes se sont dérobées. Tu regardais quelqu'un se faire soigner et tu as failli tomber. Le malaise vagal touche environ 40 % des personnes au moins une fois dans leur vie, mais reste très mal compris. Comprendre ce qui se passe dans ton corps change tout à la façon de le gérer.
        </p>

        <div className={s.body}>

          <h2>Ce qu'est vraiment le nerf vague</h2>

          <p>
            Le "vagal" dans malaise vagal vient du nerf vague, le dixième nerf crânien. C'est l'un des nerfs les plus longs du corps humain : il part du tronc cérébral et descend jusqu'aux intestins en passant par le coeur, les poumons et la quasi-totalité des organes abdominaux. Il est l'autoroute principale du système nerveux parasympathique, celui qui freine, ralentit, régule.
          </p>

          <p>
            Dans des conditions normales, il travaille discrètement à te maintenir en équilibre. Mais dans certaines situations, il peut se déclencher de façon excessive, comme si quelqu'un appuyait sur le frein d'urgence. C'est ça, un malaise vagal.
          </p>

          <h2>Ce qui se passe dans le corps</h2>

          <p>
            Quand le nerf vague s'emballe, il envoie deux signaux simultanés au coeur. D'abord, il le ralentit brusquement. Ensuite, il provoque une dilatation des vaisseaux sanguins périphériques. Ces deux effets combinés font chuter la pression artérielle en quelques secondes. Le cerveau, situé en haut du corps, reçoit momentanément moins de sang qu'il n'en a besoin pour fonctionner. Tu perds connaissance, ou tu es sur le point de le faire.
          </p>

          <p>
            C'est ce qu'on appelle techniquement une syncope vasovagale. "Syncope" désigne la perte de conscience brève et spontanée. "Vasovagale" décrit le mécanisme : vasculaire pour les vaisseaux, vagal pour le nerf. Le terme malaise vagal est la version courante en France, moins précise médicalement mais beaucoup plus utilisée dans la vraie vie.
          </p>

          <div className={s.science}>
            <div className={s.scienceLabel}>Ce que dit la science</div>
            <p className={s.scienceText}>
              La syncope vasovagale est la cause la plus fréquente de perte de connaissance non cardiaque. Elle représente entre 50 et 66 % de tous les épisodes syncopaux selon les études épidémiologiques. Elle est bénigne dans l'immense majorité des cas, mais peut entraîner des blessures lors de la chute. Elle touche toutes les tranches d'âge mais est plus fréquente entre 15 et 30 ans.
            </p>
          </div>

          <h2>Les déclencheurs : bien plus variés qu'on ne le croit</h2>

          <p>
            On associe souvent le malaise vagal à la vue du sang ou aux aiguilles, et c'est effectivement un déclencheur très courant. Mais la liste est beaucoup plus longue.
          </p>

          <p>
            La chaleur est l'un des plus fréquents : rester debout dans une pièce surchauffée, prendre une douche très chaude, sortir d'un bain trop chaud. La station debout prolongée seule suffit chez certaines personnes, surtout si l'hydratation est insuffisante. La douleur intense ou soudaine peut l'enclencher, une injection, une douleur dentaire, un coup imprévu. Le stress émotionnel fort aussi : une annonce médicale difficile, une scène violente dans un film, une situation d'urgence. Et parfois, sans raison apparente identifiable.
          </p>

          <p>
            Ce qui est commun à tous ces déclencheurs, c'est qu'ils activent le système nerveux autonome d'une façon qui fait pencher la balance du côté parasympathique. Le corps interprète la situation comme un choc et répond par ce frein d'urgence.
          </p>

          <h2>Reconnaître les signes avant-coureurs</h2>

          <p>
            Le malaise vagal prévient presque toujours avant d'arriver. Cette phase s'appelle le prodrome, et elle dure en général entre 20 secondes et quelques minutes. C'est la fenêtre où tu peux agir.
          </p>

          <p>
            Les signes sont assez caractéristiques : la vision qui se rétrécit par les bords, comme si tu regardais dans un tunnel. Une pâleur soudaine que les autres voient souvent avant toi. Des sueurs froides sur le front, les mains, parfois dans le dos. Des bourdonnements ou un sifflement dans les oreilles. Une nausée légère qui arrive d'un coup, différente d'une nausée ordinaire. Une sensation de froid qui ne correspond pas à la température de la pièce. Et parfois une impression que tout est légèrement irréel, que tu es un peu en dehors de toi-même.
          </p>

          <p>
            Si tu reconnais un ou plusieurs de ces signaux, c'est le moment d'agir. Pas dans cinq minutes.
          </p>

          <h2>Ce qu'on fait quand ça commence</h2>

          <p>
            La règle d'or : s'allonger immédiatement, jambes surélevées si possible. Cette position neutralise l'effet de la gravité sur la circulation. Le sang revient vers le coeur et le cerveau sans effort. Dans la plupart des cas, les symptômes reculent en moins d'une minute.
          </p>

          <p>
            Si s'allonger n'est pas possible, s'asseoir et pencher la tête vers les genoux produit un effet similaire. Ce n'est pas idéal, mais c'est beaucoup mieux que rester debout.
          </p>

          <p>
            La tension musculaire appliquée est une autre option très efficace. Elle consiste à contracter fortement les muscles des bras, des jambes et du ventre pendant 15 à 20 secondes, puis à relâcher progressivement. Cette contraction comprime les vaisseaux sanguins et force le sang vers le cerveau. La pression remonte. C'est la même technique qu'on utilise pour prévenir les malaises lors des prises de sang, et elle fonctionne aussi en dehors de ces contextes précis.
          </p>

          <p>
            Ce qu'il ne faut pas faire : rester debout en espérant que ça passe. La chute peut provoquer des blessures sérieuses, et résister ne change rien au mécanisme physiologique.
          </p>

          <div className={s.science}>
            <div className={s.scienceLabel}>Ce que dit la science</div>
            <p className={s.scienceText}>
              Le professeur Lars-Göran Öst, de l'Université de Stockholm, a documenté dès 1987 que la tension musculaire appliquée contre-agit directement sur la chute de pression artérielle, en particulier dans les contextes sang-injection-blessure. La technique a depuis été validée dans de nombreux essais cliniques pour prévenir les syncopes vasovagales situationnelles.
            </p>
          </div>

          <h2>Malaise vagal et peur du sang : même combat ?</h2>

          <p>
            Si tu fais des malaises vagaux presque exclusivement dans des contextes précis, au moment d'une prise de sang, en voyant du sang dans un film, à la pensée d'une injection, ce n'est probablement plus un simple malaise vagal isolé. C'est probablement une phobie spécifique de type sang-injection-blessure, ce qu'on appelle l'hémophobie ou la trypanophobie selon que c'est le sang ou les aiguilles qui déclenchent la réaction.
          </p>

          <p>
            La distinction compte parce que la prise en charge est différente. Un malaise vagal occasionnel lié à la chaleur ou à la station debout ne demande pas de traitement particulier. Une phobie spécifique, elle, tend à s'aggraver sans traitement : chaque évitement renforce le circuit de peur dans le cerveau. Un traitement adapté, l'exposition graduelle combinée à la tension musculaire appliquée, donne des résultats très solides avec des taux d'amélioration supérieurs à 80 % dans les études cliniques.
          </p>

          <p>
            Si les malaises se répètent dans des situations spécifiques et que tu commences à organiser ta vie pour les éviter, l'article sur l'hémophobie t'expliquera ce qui se passe exactement et ce qui fonctionne vraiment.
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
            Arrêter de subir les malaises
          </h2>
          <p className={s.ctaText}>
            7 modules progressifs pour désensibiliser ton système nerveux à la vue du sang. Tension musculaire appliquée, exposition graduelle, ACT. La première séance est gratuite.
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
