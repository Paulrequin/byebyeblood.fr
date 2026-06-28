import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { injectOgMeta } from '@/lib/seoMeta'
import s from './Article.module.css'

export default function GrossessePeurDuSang() {
  useEffect(() => {
    const prevTitle = document.title
    document.title = 'Grossesse et peur du sang : comment gérer les analyses - Bye Bye Blood'
    const meta = document.querySelector('meta[name="description"]')
    const prevDesc = meta?.getAttribute('content') ?? ''
    meta?.setAttribute('content', "La grossesse implique jusqu'à 15 prises de sang. Quand on a peur du sang ou des aiguilles, c'est une vraie contrainte. Voici comment gérer les analyses, ce qu'on peut demander, et comment préparer l'accouchement.")

    const restoreOg = injectOgMeta({
      title: 'Grossesse et peur du sang : comment gérer les analyses',
      description: "La grossesse implique jusqu'à 15 prises de sang. Voici comment les gérer quand on a peur du sang ou des aiguilles.",
      url: 'https://www.byebyeblood.fr/blog/grossesse-peur-du-sang-analyses',
    })

    const canonical = document.createElement('link')
    canonical.rel = 'canonical'
    canonical.href = 'https://www.byebyeblood.fr/blog/grossesse-peur-du-sang-analyses'
    canonical.id = 'page-canonical'
    document.head.appendChild(canonical)

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: 'Grossesse et peur du sang : comment gérer les analyses',
      description: "La grossesse implique jusqu'à 15 prises de sang obligatoires. Conseils pratiques pour les gérer avec une hémophobie ou une peur des aiguilles.",
      datePublished: '2026-06-28',
      dateModified: '2026-06-28',
      inLanguage: 'fr-FR',
      url: 'https://www.byebyeblood.fr/blog/grossesse-peur-du-sang-analyses',
      mainEntityOfPage: 'https://www.byebyeblood.fr/blog/grossesse-peur-du-sang-analyses',
      author: { '@type': 'Organization', name: 'Bye Bye Blood', url: 'https://www.byebyeblood.fr' },
      publisher: { '@type': 'Organization', name: 'Bye Bye Blood', url: 'https://www.byebyeblood.fr' },
      keywords: ['grossesse peur du sang', 'grossesse prise de sang peur', 'hémophobie grossesse', 'peur aiguilles grossesse', 'grossesse analyses sanguines peur'],
      articleSection: 'Conseils pratiques',
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

        <div className={s.eyebrow}>Hémophobie · Conseils pratiques</div>

        <h1 className={s.h1}>
          Grossesse et peur du sang : comment gérer les analyses
        </h1>

        <div className={s.meta}>
          <span>8 min de lecture</span>
          <span>·</span>
          <span>28 juin 2026</span>
        </div>

        <p className={s.intro}>
          La grossesse est une période où le corps change vite, où les émotions sont amplifiées, et où le suivi médical devient plus intense que jamais. Pour la plupart des personnes, les prises de sang font partie du décor. Pour celles qui ont peur du sang ou des aiguilles, elles représentent une contrainte réelle, répétée, et difficile à contourner. Cet article n'est pas là pour minimiser ça. Il est là pour aider à traverser ces mois différemment.
        </p>

        <div className={s.body}>

          <h2>Combien de prises de sang pendant une grossesse ?</h2>

          <p>
            Le suivi d'une grossesse normale en France implique plusieurs bilans sanguins obligatoires, répartis sur les neuf mois. Au premier trimestre, les examens portent sur le groupe sanguin, la recherche de toxoplasmose, de rubéole, d'hépatites, de syphilis, et d'éventuelles anémies. Un deuxième bilan vient confirmer ou compléter ces résultats. Vers 24-28 semaines, le dépistage du diabète gestationnel ajoute un autre prélèvement. Et les contrôles se poursuivent jusqu'à l'accouchement.
          </p>

          <p>
            En comptant large, c'est entre 8 et 15 prises de sang selon les situations, les antécédents, et les éventuelles complications. Pour une personne qui n'a pas de peur particulière, c'est une contrainte logistique. Pour quelqu'un qui redoute chaque prise de sang depuis des années, c'est une perspective qui peut peser dès la découverte de la grossesse.
          </p>

          <h2>La motivation ne suffit pas à faire disparaître la réaction</h2>

          <p>
            Un des pièges les plus courants dans cette situation, c'est de croire que "vouloir protéger son bébé" va suffire à dépasser la peur. Ce n'est pas un manque de motivation ou d'amour maternel. C'est une réaction physiologique.
          </p>

          <p>
            La peur du sang et des aiguilles déclenche une réponse vasovagale : le nerf vague ralentit le coeur, dilate les vaisseaux, et la pression artérielle chute. Ça se passe en dessous du niveau de la pensée consciente. Tu peux être pleinement convaincue que cette prise de sang est nécessaire et utile, et faire un malaise quand même. Le raisonnement n'a pas prise sur ce mécanisme. C'est pour ça que "pense à ton bébé" ne marche pas comme conseil, pas parce que tu ne penses pas assez à lui.
          </p>

          <h2>Ce qu'on peut dire à son médecin ou sage-femme</h2>

          <p>
            La première chose à faire, c'est en parler tôt. Pas au moment de la prise de sang, mais lors d'une consultation ordinaire, quand tu n'es pas en situation de stress immédiat. Une phrase directe suffit : "J'ai peur des prises de sang et j'ai tendance à faire des malaises. Comment on peut adapter le suivi ?"
          </p>

          <p>
            Les professionnels de santé qui suivent des grossesses connaissent bien cette situation. Ce qu'on peut demander sans hésiter : s'allonger plutôt que rester assise pour les prélèvements, avoir quelqu'un de connu à côté, prévenir avant l'insertion de l'aiguille, et ne pas voir les tubes remplis ensuite. Ces ajustements ne compliquent pas le travail de l'infirmier ou de la sage-femme et sont accordés sans discussion dans la grande majorité des cas.
          </p>

          <p>
            Si la peur est très intense et que tu anticipes déjà avec angoisse les prochains mois, demander une orientation vers un psychologue spécialisé dans les phobies spécifiques est aussi une option légitime que ton médecin peut t'aider à trouver.
          </p>

          <div className={s.science}>
            <div className={s.scienceLabel}>Ce que dit la science</div>
            <p className={s.scienceText}>
              Une étude publiée dans Midwifery en 2018 a montré que les femmes enceintes ayant une peur intense des procédures médicales invasives avaient un risque significativement plus élevé d'éviter ou de retarder certains examens prénatals. La communication précoce avec les soignants et les adaptations environnementales simples réduisaient cet évitement de façon significative.
            </p>
          </div>

          <h2>La tension musculaire appliquée pendant la grossesse</h2>

          <p>
            La tension musculaire appliquée est la technique la plus efficace pour prévenir les malaises lors des prises de sang. Elle consiste à contracter fortement les muscles des bras, des jambes et du ventre pendant 15 à 20 secondes, puis à relâcher progressivement, et à répéter le cycle cinq fois.
          </p>

          <p>
            Est-ce compatible avec une grossesse ? Dans la grande majorité des cas, oui. La contraction musculaire volontaire ne présente pas de risque particulier pour la grossesse, surtout en dehors des périodes de contractions ou de risque d'accouchement prématuré. La technique ne nécessite aucun médicament, aucune intervention externe, et peut être pratiquée allongée ou assise.
          </p>

          <p>
            Comme pour tout, si tu as un contexte médical particulier (grossesse à risque, antécédents de contractions précoces, placenta bas inséré), demande confirmation à ton médecin ou ta sage-femme avant de l'utiliser. Dans une grossesse qui se déroule normalement, il n'y a pas de raison de s'en priver.
          </p>

          <p>
            Le plus important : pratiquer la technique à froid, plusieurs fois par semaine, avant que les prises de sang arrivent. Plus le geste est automatique, plus il est efficace dans le moment.
          </p>

          <h2>Organiser les rendez-vous différemment</h2>

          <p>
            Quelques ajustements pratiques peuvent faire une vraie différence sur la durée.
          </p>

          <p>
            L'hydratation est cruciale : boire abondamment dans les heures qui précèdent une prise de sang rend les veines plus accessibles et réduit la susceptibilité au malaise vasovagal. Si ton ordonnance l'autorise, ne jeûne pas inutilement. Un jeûne prolongé fragilise la réponse vasculaire.
          </p>

          <p>
            Choisir un laboratoire où tu peux systématiquement t'allonger est un investissement qui vaut le détour. Certains laboratoires ont des fauteuils inclinables ou des salles dédiées aux personnes qui font des malaises. Un appel à l'avance pour expliquer ta situation permet souvent d'organiser ça sans difficulté.
          </p>

          <p>
            Venir accompagnée aide. Pas parce qu'une présence magique annule la réaction vasovagale, mais parce que ça réduit l'anxiété anticipatoire, que tu seras aidée si un malaise survient, et que tu n'auras pas à te reconcentrer seule pour repartir ensuite.
          </p>

          <h2>Et l'accouchement ?</h2>

          <p>
            C'est souvent la question qui reste dans l'angle mort, parce qu'elle fait peur à formuler. L'accouchement implique du sang. Pas de façon dramatique comme dans les films, mais il y en a.
          </p>

          <p>
            Ce qui aide le plus, c'est d'en parler avant avec l'équipe qui va t'accompagner, lors d'une consultation de fin de grossesse. Expliquer ta peur, demander à être prévenue des moments qui pourraient déclencher une réaction, savoir ce qui va se passer et dans quel ordre. L'équipe obstétricale a l'habitude de s'adapter à des situations très diverses, et une phobie du sang est loin d'être la plus complexe à gérer sur le plan pratique.
          </p>

          <p>
            Si tu as une péridurale, l'installation de la voie veineuse et les prélèvements associés peuvent déclencher une réaction. Signale-le à l'équipe dès ton arrivée en salle de naissance, pas au moment où l'infirmier arrive avec le matériel. Plus l'information arrive tôt, plus les ajustements sont faciles à faire.
          </p>

          <h2>Après la naissance</h2>

          <p>
            La peur du sang ne disparaît pas automatiquement après l'accouchement. Le nouveau-né va avoir ses propres prises de sang à la naissance, puis lors des bilans de suivi pédiatrique. Si tu as évité de travailler sur ta phobie pendant la grossesse parce que tu avais d'autres choses en tête, c'est un bon moment pour s'y mettre sérieusement. Les techniques qui fonctionnent, l'exposition graduelle et la tension musculaire appliquée, restent efficaces après la grossesse et donnent des résultats durables en quelques semaines.
          </p>

        </div>

        <div className={s.related}>
          <div className={s.relatedLabel}>À lire aussi</div>
          <div className={s.relatedLinks}>
            <Link to="/blog/prise-de-sang-peur-evanouissement" className={s.relatedLink}>
              <span className={s.relatedLinkTag}>Conseils pratiques</span>
              <p className={s.relatedLinkTitle}>Prise de sang : que faire quand on a peur de s'évanouir</p>
            </Link>
            <Link to="/blog/peur-des-aiguilles-trypanophobie" className={s.relatedLink}>
              <span className={s.relatedLinkTag}>Comprendre</span>
              <p className={s.relatedLinkTitle}>Peur des aiguilles : pourquoi ça arrive et comment s'en sortir</p>
            </Link>
          </div>
        </div>

        <div className={s.cta}>
          <div className={s.ctaLabel}>Programme de désensibilisation</div>
          <h2 className={s.ctaTitle}>
            Traverser la grossesse sans redouter chaque analyse
          </h2>
          <p className={s.ctaText}>
            7 modules progressifs. Tension musculaire appliquée, exposition graduelle, ACT. La première séance est gratuite et ne montre aucune image difficile.
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
