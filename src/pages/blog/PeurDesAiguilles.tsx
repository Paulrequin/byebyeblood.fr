import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { injectOgMeta } from '@/lib/seoMeta'
import s from './Article.module.css'

export default function PeurDesAiguilles() {
  useEffect(() => {
    const prevTitle = document.title
    document.title = 'Peur des aiguilles (trypanophobie) : pourquoi ça arrive et comment s\'en sortir - Bye Bye Blood'
    const meta = document.querySelector('meta[name="description"]')
    const prevDesc = meta?.getAttribute('content') ?? ''
    meta?.setAttribute('content', "La peur des aiguilles touche 1 personne sur 4. Elle fait repousser les vaccins, les bilans sanguins, les soins dentaires. Voici ce qu'elle est vraiment et les techniques qui fonctionnent.")

    const restoreOg = injectOgMeta({
      title: 'Peur des aiguilles (trypanophobie) : pourquoi ça arrive et comment s\'en sortir',
      description: "La peur des aiguilles touche 1 personne sur 4. Voici ce qu'elle est vraiment et les techniques qui fonctionnent.",
      url: 'https://www.byebyeblood.fr/blog/peur-des-aiguilles-trypanophobie',
    })

    const canonical = document.createElement('link')
    canonical.rel = 'canonical'
    canonical.href = 'https://www.byebyeblood.fr/blog/peur-des-aiguilles-trypanophobie'
    canonical.id = 'page-canonical'
    document.head.appendChild(canonical)

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: 'Peur des aiguilles (trypanophobie) : pourquoi ça arrive et comment s\'en sortir',
      description: "La trypanophobie, ses mécanismes, ce qu'elle fait éviter, et les techniques validées scientifiquement pour la surmonter.",
      datePublished: '2026-06-28',
      dateModified: '2026-06-28',
      inLanguage: 'fr-FR',
      url: 'https://www.byebyeblood.fr/blog/peur-des-aiguilles-trypanophobie',
      mainEntityOfPage: 'https://www.byebyeblood.fr/blog/peur-des-aiguilles-trypanophobie',
      author: { '@type': 'Organization', name: 'Bye Bye Blood', url: 'https://www.byebyeblood.fr' },
      publisher: { '@type': 'Organization', name: 'Bye Bye Blood', url: 'https://www.byebyeblood.fr' },
      keywords: ['peur des aiguilles', 'trypanophobie', 'phobie aiguilles', 'peur injection', 'peur piqure'],
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
          Peur des aiguilles : pourquoi ça arrive et comment s'en sortir
        </h1>

        <div className={s.meta}>
          <span>7 min de lecture</span>
          <span>·</span>
          <span>28 juin 2026</span>
        </div>

        <p className={s.intro}>
          Tu repoussés un vaccin depuis des mois. Tu évites le dentiste parce que l'anesthésie t'angoisse plus que la douleur. Tu fermes les yeux si fort pendant une prise de sang que tu as mal à la mâchoire. La peur des aiguilles est souvent décrite comme un "truc de bébé", mais elle touche entre 20 et 25 % des adultes et génère de vrais évitements médicaux. Ce n'est pas anodin, et ce n'est pas irréductible.
        </p>

        <div className={s.body}>

          <h2>Trypanophobie : ce que c'est vraiment</h2>

          <p>
            La peur des aiguilles a un nom clinique : la trypanophobie, du grec "trypano" qui désigne la perforation. Elle est classée dans le DSM-5, le manuel de référence des troubles mentaux, sous la catégorie des phobies spécifiques de type "sang-injection-blessure". Cette catégorie regroupe la peur des aiguilles, la peur du sang et la peur des blessures, qui partagent le même mécanisme physiologique.
          </p>

          <p>
            Ce qui distingue la trypanophobie d'une simple appréhension, c'est l'impact sur ta vie. L'appréhension, tout le monde la ressent face à une piqure. La phobie, c'est quand tu organises ta vie autour de l'évitement : tu repousses un vaccin jusqu'à ce qu'il ne soit plus recommandé, tu refuses un bilan sanguin que ton médecin juge nécessaire, tu choisis une douleur dentaire plutôt qu'une anesthésie. Quand la peur te coûte quelque chose de concret, elle mérite qu'on s'y attarde.
          </p>

          <h2>Peur des aiguilles ou peur du sang : est-ce si différent ?</h2>

          <p>
            Beaucoup de personnes qui ont peur des aiguilles précisent qu'elles "n'ont pas vraiment peur du sang". Et c'est souvent vrai : c'est l'acte de la piqure, l'attente, l'insertion de l'aiguille, qui déclenche la réaction. Pas nécessairement la vue du sang dans un film ou sur une blessure.
          </p>

          <p>
            Pourtant, les deux phobies partagent le même mécanisme physiologique. Dans les deux cas, le système nerveux autonome déclenche une réponse vasovagale : le nerf vague ralentit le coeur, dilate les vaisseaux, et la pression artérielle chute. C'est pourquoi on peut faire un malaise pendant une prise de sang sans avoir jamais eu de problème face à la vue du sang au cinéma. Le déclencheur est différent, mais le circuit est le même.
          </p>

          <p>
            Cette similitude est importante : les techniques qui fonctionnent pour l'hémophobie fonctionnent aussi pour la trypanophobie. Et inversement, les conseils qui ne marchent pas pour l'une n'ont aucune raison de marcher pour l'autre.
          </p>

          <div className={s.science}>
            <div className={s.scienceLabel}>Ce que dit la science</div>
            <p className={s.scienceText}>
              Une étude publiée dans Lancet en 2021 a estimé que la peur des aiguilles était responsable d'environ 16 % des refus de vaccination contre la COVID-19 chez les adultes qui avaient initialement l'intention de se faire vacciner. Une méta-analyse de 2019 sur la trypanophobie souligne que cette phobie reste très sous-diagnostiquée et sous-traitée, malgré ses conséquences médicales mesurables.
            </p>
          </div>

          <h2>Ce que la peur des aiguilles fait vraiment éviter</h2>

          <p>
            La liste des situations que la trypanophobie fait éviter est plus longue qu'elle ne le semble au premier abord. Les bilans sanguins annuels reportés indéfiniment. Les vaccins adultes, grippe, rappels, HPV, repoussés jusqu'à l'oubli. Les soins dentaires, où la peur de l'anesthésie finit par s'ajouter à la peur de la douleur et crée une équation que beaucoup préfèrent esquiver. Les perfusions en cas d'hospitalisation. Les prises de sang de grossesse, obligatoires et nombreuses. Et pour certaines personnes, la simple présence dans une pièce où quelqu'un reçoit une injection suffit à déclencher la réaction.
          </p>

          <p>
            Ce qu'il faut comprendre, c'est que chaque évitement aggrave la phobie. Le cerveau retient que "j'ai évité, et il ne s'est rien passé de grave". Il confirme que la menace était réelle. La peur gagne du terrain à chaque contournement, même les plus anodins.
          </p>

          <h2>Pourquoi respirer ne suffit pas</h2>

          <p>
            "Concentre-toi sur ta respiration." "Pense à autre chose." "Regarde le plafond." Ces conseils sont donnés de bonne foi, et ils ne sont pas complètement inutiles. Mais ils s'attaquent à l'anxiété, pas au malaise vasovagal.
          </p>

          <p>
            La réponse vasovagale est une chute de pression artérielle. Ralentir sa respiration active davantage le système parasympathique, ce qui peut aggraver cette chute si le malaise est déjà enclenché. C'est pourquoi les personnes qui "respirent bien" pendant une prise de sang font quand même des malaises. Ce n'est pas qu'elles ne respirent pas assez bien. C'est que la respiration n'intervient pas au bon niveau du problème.
          </p>

          <h2>La technique qui change la donne</h2>

          <p>
            Si le problème est une chute de pression artérielle, la solution logique est de la remonter mécaniquement. C'est ce que fait la tension musculaire appliquée, développée par le professeur Lars-Göran Öst à l'Université de Stockholm en 1987.
          </p>

          <p>
            Le principe est simple : quand tu contractes fort les muscles de tes bras, de tes jambes et de ton ventre simultanément, tu comprimes les vaisseaux sanguins et tu forces le sang vers le cerveau. La pression remonte. Le malaise s'éloigne. Tu tiens la contraction 15 à 20 secondes, tu relâches progressivement, tu répètes le cycle cinq fois. Une légère bouffée de chaleur au visage pendant la contraction est normale, c'est le sang qui remonte.
          </p>

          <p>
            Ce n'est pas une technique de relaxation. C'est une intervention directe sur la physiologie. Et plus tu la pratiques à froid, hors de toute situation stressante, plus elle devient automatique et efficace le jour où tu en as besoin.
          </p>

          <h2>Adapter chaque situation concrète</h2>

          <p>
            Pour une prise de sang, une phrase suffit avant de commencer : "J'ai tendance à faire des malaises, peut-on adapter ?" Les soignants connaissent bien la situation. S'allonger plutôt que rester assis supprime l'effet de la gravité et réduit considérablement le risque de malaise. Demander à ne pas voir le matériel ni les tubes ensuite fonctionne souvent mieux qu'on ne le croit.
          </p>

          <p>
            Pour un vaccin, le même principe s'applique. Demander à être allongé, rester assis quelques minutes après l'injection avant de se lever, avoir quelqu'un à côté de soi si possible. L'infirmier ou le médecin ne sera pas surpris de ces demandes.
          </p>

          <p>
            Pour le dentiste, anticiper verbalement avec le praticien aide beaucoup. Lui dire que l'anesthésie est la partie qui t'angoisse davantage que le soin en lui-même lui permet d'ajuster son approche : aller plus lentement, prévenir à chaque étape, laisser du temps entre le gel anesthésiant de surface et l'injection. Ces adaptations existent, elles sont accordées sans discussion dans l'immense majorité des cabinets.
          </p>

          <h2>Est-ce qu'on peut vraiment s'en sortir ?</h2>

          <p>
            La trypanophobie répond bien au traitement. Elle fait partie des phobies spécifiques pour lesquelles l'exposition graduelle combinée à la tension musculaire appliquée donne les meilleurs résultats, avec des améliorations significatives chez plus de 80 % des personnes qui s'y tiennent sur quelques semaines.
          </p>

          <p>
            L'objectif n'est pas d'aimer les aiguilles. C'est de pouvoir faire une prise de sang, recevoir un vaccin, accepter un soin dentaire, sans que ton corps parte en vrille et sans que tu passes les jours précédents à redouter le moment. C'est une liberté très concrète, et elle est accessible.
          </p>

        </div>

        <div className={s.related}>
          <div className={s.relatedLabel}>À lire aussi</div>
          <div className={s.relatedLinks}>
            <Link to="/blog/hemophobie-traitement" className={s.relatedLink}>
              <span className={s.relatedLinkTag}>Comprendre</span>
              <p className={s.relatedLinkTitle}>Hémophobie : ce que c'est vraiment et comment s'en sortir</p>
            </Link>
            <Link to="/blog/malaise-vagal-causes-symptomes" className={s.relatedLink}>
              <span className={s.relatedLinkTag}>Comprendre</span>
              <p className={s.relatedLinkTitle}>Malaise vagal : pourquoi ça arrive et comment l'éviter</p>
            </Link>
          </div>
        </div>

        <div className={s.cta}>
          <div className={s.ctaLabel}>Programme de désensibilisation</div>
          <h2 className={s.ctaTitle}>
            Se désensibiliser progressivement
          </h2>
          <p className={s.ctaText}>
            7 modules qui combinent tension musculaire appliquée, exposition graduelle et ACT. Conçu pour la peur du sang et des aiguilles. La première séance est gratuite, sans image difficile.
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
