import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { injectOgMeta } from '@/lib/seoMeta'
import s from './Article.module.css'

export default function HemophobieTraitement() {
  useEffect(() => {
    const prevTitle = document.title
    document.title = 'Hémophobie : ce que c\'est vraiment et comment s\'en sortir - Bye Bye Blood'
    const meta = document.querySelector('meta[name="description"]')
    const prevDesc = meta?.getAttribute('content') ?? ''
    meta?.setAttribute('content', "Hémophobie : définition, symptômes, causes et traitements validés scientifiquement. Tout ce qu'on ne vous a probablement jamais expliqué sur la peur du sang.")

    const restoreOg = injectOgMeta({
      title: "Hémophobie : ce que c'est vraiment et comment s'en sortir",
      description: "Hémophobie : définition, symptômes, causes et traitements validés scientifiquement. Tout ce qu'on ne vous a probablement jamais expliqué sur la peur du sang.",
      url: 'https://www.byebyeblood.fr/blog/hemophobie-traitement',
    })

    const canonical = document.createElement('link')
    canonical.rel = 'canonical'
    canonical.href = 'https://www.byebyeblood.fr/blog/hemophobie-traitement'
    canonical.id = 'page-canonical'
    document.head.appendChild(canonical)

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: 'Hémophobie : ce que c\'est vraiment et comment s\'en sortir',
      description: "Définition, mécanisme vasovagal biphasique, pourquoi les conseils habituels échouent, et les traitements validés scientifiquement pour la peur du sang.",
      datePublished: '2026-06-21',
      dateModified: '2026-06-21',
      inLanguage: 'fr-FR',
      url: 'https://www.byebyeblood.fr/blog/hemophobie-traitement',
      mainEntityOfPage: 'https://www.byebyeblood.fr/blog/hemophobie-traitement',
      author: { '@type': 'Organization', name: 'Bye Bye Blood', url: 'https://www.byebyeblood.fr' },
      publisher: { '@type': 'Organization', name: 'Bye Bye Blood', url: 'https://www.byebyeblood.fr' },
      keywords: ['hémophobie', 'peur du sang', 'traitement phobie', 'exposition graduelle', 'tension musculaire appliquée'],
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
        <Link to="/" className={s.backLink}>← Accueil</Link>
      </nav>

      <article className={s.wrap}>

        <div className={s.eyebrow}>Hémophobie · Comprendre</div>

        <h1 className={s.h1}>
          Hémophobie : ce que c'est vraiment et comment s'en sortir
        </h1>

        <div className={s.meta}>
          <span>8 min de lecture</span>
          <span>·</span>
          <span>21 juin 2026</span>
        </div>

        <p className={s.intro}>
          Si tu as cherché "peur du sang" sur internet, tu es probablement tombé sur des définitions cliniques, des listes de symptômes, et peut-être une suggestion de "consulter un professionnel". Ce que tu n'as probablement pas trouvé, c'est une explication honnête de ce qui se passe dans ton corps, pourquoi les conseils habituels ne marchent pas, et ce qui marche vraiment.
        </p>

        <div className={s.body}>

          <h2>Ce que l'hémophobie est, et ce qu'elle n'est pas</h2>

          <p>
            L'hémophobie est la peur spécifique du sang. Elle est reconnue dans le DSM-5, le manuel de référence des troubles mentaux, sous la catégorie des phobies spécifiques de type "sang-injection-blessure". Cette catégorie regroupe aussi la peur des aiguilles (trypanophobie) et la peur des blessures, qui partagent le même mécanisme physiologique.
          </p>

          <p>
            Ce n'est pas du dégoût amplifié. Le dégoût, tout le monde le ressent face au sang, c'est une réaction normale. L'hémophobie, c'est quand cette réaction devient si intense qu'elle organise ta vie : tu repousses des bilans médicaux, tu évites certains films, tu quitte une pièce si quelqu'un se blesse. Quand la peur te coûte quelque chose, elle a un nom.
          </p>

          <p>
            Ce n'est pas non plus une question de seuil de douleur ou de sensibilité générale. Des personnes qui font du sport intensif, qui ont des tatouages, qui supportent très bien la douleur physique peuvent avoir une hémophobie sévère. Les deux choses n'ont aucun lien.
          </p>

          <h2>Pourquoi ton corps fait quelque chose que les autres phobies ne font pas</h2>

          <p>
            Voilà ce que presque personne n'explique clairement : l'hémophobie est la seule phobie qui provoque un évanouissement. Et elle le fait pour une raison physiologique précise, qui n'a rien à voir avec les autres phobies.
          </p>

          <p>
            Quand tu as peur d'une araignée ou de l'avion, ton système sympathique s'emballe : le cœur accélère, la pression monte, les muscles se préparent à fuir. Avec l'hémophobie, c'est l'inverse. Ton cerveau envoie un signal au nerf vague, qui ralentit le cœur et dilate les vaisseaux sanguins. La pression artérielle chute. Le cerveau reçoit momentanément moins de sang. Tu perds connaissance.
          </p>

          <p>
            C'est ce qu'on appelle la réponse vasovagale biphasique : d'abord une légère montée (le cœur s'accélère une seconde), puis la chute. La théorie évolutive la plus solide dit que c'est un vestige de "faire le mort" face à un prédateur, qui permettait aussi de ralentir l'hémorragie en cas de blessure. Ton corps fait ça aujourd'hui face à une prise de sang. C'est involontaire et profondément ancré, ce qui explique pourquoi "te raisonner" ne sert à rien.
          </p>

          <div className={s.science}>
            <div className={s.scienceLabel}>Ce que dit la science</div>
            <p className={s.scienceText}>
              Le professeur Lars-Göran Öst a documenté ce mécanisme diphasique dès 1987, montrant que l'hémophobie est biologiquement distincte de toutes les autres phobies spécifiques. Cette particularité a une conséquence directe : le traitement standard des phobies (exposition seule, respiration, relaxation) est insuffisant pour l'hémophobie. Il faut une technique qui agit directement sur la pression artérielle.
            </p>
          </div>

          <h2>Pourquoi la plupart des conseils ne marchent pas</h2>

          <p>
            "Respire profondément." "Pense à autre chose." "Regarde ailleurs." Ces conseils ne sont pas inutiles, mais ils s'attaquent à l'anxiété, pas au malaise. Ralentir sa respiration active le système parasympathique, ce qui est bien pour l'anxiété générale, mais ça aggrave potentiellement la chute de pression artérielle si le malaise vasovagal est déjà enclenché.
          </p>

          <p>
            La méditation, la cohérence cardiaque, les techniques de pleine conscience : utiles pour beaucoup de choses, insuffisants pour l'hémophobie. Pas parce qu'elles sont mauvaises, mais parce qu'elles n'interviennent pas au bon niveau du problème.
          </p>

          <p>
            L'"évitement progressif", qui consiste à fuir les situations déclenchantes de manière contrôlée, aggrave systématiquement la phobie sur le long terme. Chaque fois que tu évites et que "rien de grave ne se passe", ton cerveau confirme que la menace était réelle et que l'évitement était la bonne décision. La phobie gagne du terrain.
          </p>

          <h2>Ce qui marche, avec les preuves</h2>

          <p>
            Deux approches ont des preuves solides pour l'hémophobie spécifiquement.
          </p>

          <p>
            La première est la tension musculaire appliquée. Elle fonctionne en contrant directement la chute de pression artérielle : en contractant fort les muscles des bras, des jambes et du ventre pendant 15 à 20 secondes, tu forces le sang vers le cerveau. La pression remonte. Le malaise s'éloigne. C'est mécanique, pas psychologique, et c'est précisément pour ça que ça marche là où la respiration ne suffit pas.
          </p>

          <p>
            La deuxième est l'exposition graduelle : s'exposer progressivement à des représentations du sang, en commençant par ce qui déclenche le moins de réaction et en montant par paliers. Le principe est que le cerveau "réapprend" que la stimulus n'est pas une menace quand l'exposition est répétée sans conséquence. C'est le traitement de référence de toutes les phobies spécifiques selon l'OMS, et pour l'hémophobie il est combiné avec la tension musculaire.
          </p>

          <div className={s.science}>
            <div className={s.scienceLabel}>Ce que dit la science</div>
            <p className={s.scienceText}>
              Une méta-analyse portant sur plus de 1 800 patients traités par exposition graduelle et ACT pour des phobies spécifiques montre des taux d'amélioration significative supérieurs à 80 % à un an de suivi. Pour l'hémophobie en particulier, la combinaison tension musculaire et exposition donne les meilleurs résultats, avec des effets visibles dès les premières semaines.
            </p>
          </div>

          <h2>Est-ce que ça part vraiment ?</h2>

          <p>
            La question que tout le monde se pose, souvent sans oser la formuler : est-ce qu'on peut vraiment se débarrasser de cette peur, ou est-ce qu'on apprend juste à mieux la gérer ?
          </p>

          <p>
            La réponse honnête : les deux, et c'est suffisant. L'objectif du traitement n'est pas de rendre le sang indifférent, comme si tu n'avais jamais eu cette peur. C'est de faire en sorte que tu puisses faire une prise de sang, voir une scène dans un film, aider quelqu'un qui saigne, sans que ton corps parte en vrille. C'est ça, la liberté concrète qu'on vise.
          </p>

          <p>
            Pour la majorité des personnes qui s'y tiennent sérieusement pendant 4 à 8 semaines, le résultat est là et il dure. Les études de suivi à un an confirment que les améliorations obtenues par exposition graduelle ne se résorbe pas avec le temps, contrairement à ce que beaucoup craignent.
          </p>

          <p>
            Ce qu'il faut pour que ça marche : de la régularité, pas de l'intensité. S'exposer tous les jours à de petits paliers vaut mieux que se forcer une fois à regarder quelque chose de difficile. Et avoir les bons outils dès le départ, pour ne pas reproduire les erreurs qui font reculer.
          </p>

        </div>

        <div className={s.related}>
          <div className={s.relatedLabel}>À lire aussi</div>
          <div className={s.relatedLinks}>
            <Link to="/blog/prise-de-sang-peur-evanouissement" className={s.relatedLink}>
              <span className={s.relatedLinkTag}>Conseils pratiques</span>
              <p className={s.relatedLinkTitle}>Prise de sang : que faire quand on a peur de s'évanouir</p>
            </Link>
            <Link to="/blog/don-du-sang-peur-hemophobie" className={s.relatedLink}>
              <span className={s.relatedLinkTag}>Don du sang</span>
              <p className={s.relatedLinkTitle}>Donner son sang quand on a peur du sang : est-ce possible ?</p>
            </Link>
          </div>
        </div>

        <div className={s.cta}>
          <div className={s.ctaLabel}>Programme de désensibilisation</div>
          <h2 className={s.ctaTitle}>
            Les bons outils, dans le bon ordre
          </h2>
          <p className={s.ctaText}>
            7 modules progressifs qui combinent tension musculaire appliquée, exposition graduelle et ACT. La première séance est gratuite. Pas d'image difficile au départ.
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
