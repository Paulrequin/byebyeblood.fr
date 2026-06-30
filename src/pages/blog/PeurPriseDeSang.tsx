import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { injectOgMeta } from '@/lib/seoMeta'
import s from './Article.module.css'

export default function PeurPriseDeSang() {
  useEffect(() => {
    const prevTitle = document.title
    document.title = 'Prise de sang : que faire quand on a peur de s\'évanouir - Bye Bye Blood'
    const meta = document.querySelector('meta[name="description"]')
    const prevDesc = meta?.getAttribute('content') ?? ''
    meta?.setAttribute('content', "Tu as peur de t'évanouir à la prise de sang ? La technique clinique pour éviter le malaise vasovagal et ce qu'il faut dire à l'infirmier·e.")

    const restoreOg = injectOgMeta({
      title: 'Prise de sang : que faire quand on a peur de s\'évanouir',
      description: "Tu as une prise de sang et tu as peur de t'évanouir ? Voici la technique validée scientifiquement pour ne pas faire de malaise.",
      url: 'https://www.byebyeblood.fr/blog/prise-de-sang-peur-evanouissement',
    })

    const canonical = document.createElement('link')
    canonical.rel = 'canonical'
    canonical.href = 'https://www.byebyeblood.fr/blog/prise-de-sang-peur-evanouissement'
    canonical.id = 'page-canonical'
    document.head.appendChild(canonical)

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: 'Prise de sang : que faire quand on a peur de s\'évanouir',
      description: "La technique vasovagale, la tension musculaire appliquée d'Öst, ce qu'il faut dire à l'infirmier·e et comment préparer le rendez-vous.",
      datePublished: '2026-06-21',
      dateModified: '2026-06-21',
      inLanguage: 'fr-FR',
      url: 'https://www.byebyeblood.fr/blog/prise-de-sang-peur-evanouissement',
      mainEntityOfPage: 'https://www.byebyeblood.fr/blog/prise-de-sang-peur-evanouissement',
      author: { '@type': 'Organization', name: 'Bye Bye Blood', url: 'https://www.byebyeblood.fr' },
      publisher: { '@type': 'Organization', name: 'Bye Bye Blood', url: 'https://www.byebyeblood.fr' },
      keywords: ['prise de sang peur', 'hémophobie', 'malaise vasovagal', 'tension musculaire appliquée', 'peur aiguille'],
      articleSection: 'Conseils pratiques',
    }
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'article-schema'
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)

    const breadcrumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.byebyeblood.fr/' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.byebyeblood.fr/blog' },
        { '@type': 'ListItem', position: 3, name: 'Prise de sang : peur et malaise', item: 'https://www.byebyeblood.fr/blog/prise-de-sang-peur-evanouissement' },
      ],
    }
    const breadcrumbScript = document.createElement('script')
    breadcrumbScript.type = 'application/ld+json'
    breadcrumbScript.id = 'breadcrumb-schema'
    breadcrumbScript.textContent = JSON.stringify(breadcrumb)
    document.head.appendChild(breadcrumbScript)

    return () => {
      document.title = prevTitle
      meta?.setAttribute('content', prevDesc)
      restoreOg()
      document.getElementById('page-canonical')?.remove()
      document.getElementById('article-schema')?.remove()
      document.getElementById('breadcrumb-schema')?.remove()
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
          Prise de sang : que faire quand on a peur de s'évanouir
        </h1>

        <div className={s.meta}>
          <span>7 min de lecture</span>
          <span>·</span>
          <span>21 juin 2026</span>
        </div>

        <p className={s.intro}>
          Il y a quelques jours, quelqu'un m'a dit qu'il avait repoussé une prise de sang pendant huit mois. Pas parce qu'il l'avait oubliée. Parce qu'il savait exactement ce qui allait se passer et qu'il préférait ne pas y penser. Si tu lis cet article, tu connais probablement ce sentiment-là.
        </p>

        <div className={s.body}>

          <h2>Ce qui se passe dans ton corps n'est pas ce que tu crois</h2>

          <p>
            La plupart des phobies fonctionnent de la même façon : le cœur s'emballe, l'adrénaline monte, le corps se prépare à fuir. La peur du sang, elle, fait exactement l'inverse. C'est pour ça qu'elle est à part, et c'est pour ça que les techniques de "respire et pense à autre chose" ne marchent pas vraiment.
          </p>

          <p>
            Quand ton cerveau anticipe une prise de sang, il envoie un signal au nerf vague, le nerf qui relie le cerveau à la quasi-totalité des organes. Ce nerf ralentit le cœur, dilate les vaisseaux sanguins, et la pression artérielle s'effondre. Le cerveau reçoit moins de sang qu'il n'en a besoin, et tu perds connaissance. C'est ce qu'on appelle la réponse vasovagale biphasique, et c'est documenté depuis les années 1980.
          </p>

          <p>
            Ce mécanisme est probablement un vestige de l'évolution : simuler la mort pour décourager un prédateur. Ton corps fait encore ça aujourd'hui face à une seringue. C'est involontaire, profond, et ça n'a rien à voir avec le courage ou la fragilité. Environ 3 à 4 % de la population partage cette réaction.
          </p>

          <div className={s.science}>
            <div className={s.scienceLabel}>Ce que dit la science</div>
            <p className={s.scienceText}>
              Le professeur Lars-Göran Öst, de l'Université de Stockholm, a documenté ce mécanisme dès 1987 dans Behaviour Research and Therapy. Ses travaux ont montré que l'hémophobie est la seule phobie spécifique associée à une réponse biphasique : accélération cardiaque initiale suivie d'une chute brutale. Cette particularité implique une technique de traitement différente de toutes les autres phobies.
            </p>
          </div>

          <h2>Les 30 secondes qui font la différence</h2>

          <p>
            Le malaise vasovagal n'arrive jamais d'un seul coup. Il prévient. Et si tu apprends à reconnaître ses signaux, tu as une fenêtre de 20 à 60 secondes pour agir avant que ton corps parte en vrille.
          </p>

          <p>
            Les premiers signes sont assez caractéristiques : la vision qui se rétrécit comme si tu regardais dans un tunnel, des sueurs froides sur le front ou les paumes, des bourdonnements dans les oreilles, une nausée légère qui arrive d'un coup, et parfois une sensation de froid alors que la pièce est chaude. L'infirmier·e, lui ou elle, voit souvent la pâleur avant même que tu aies l'impression que quelque chose se passe.
          </p>

          <p>
            Dès que tu ressens l'un de ces signaux, tu n'es pas obligé d'attendre la suite. Tu peux intervenir directement sur la cause physiologique.
          </p>

          <h2>La technique que personne n'explique</h2>

          <p>
            Si le problème est une chute de pression artérielle, la solution logique est de la remonter. C'est exactement ce que fait la tension musculaire appliquée, une technique développée par Öst et son collègue Sterner en 1987.
          </p>

          <p>
            Le principe : quand tu contractes tes muscles, tu comprimes les vaisseaux sanguins et tu forces le sang vers le cerveau. La pression remonte. Le malaise recule. En pratique, tu contractes simultanément les muscles de tes bras, de tes jambes et de ton ventre, aussi fort que tu peux, pendant 15 à 20 secondes. Puis tu relâches progressivement. Tu sentiras peut-être une légère bouffée de chaleur au visage : c'est normal, c'est le sang qui revient. Tu répètes le cycle cinq fois.
          </p>

          <p>
            Ce n'est pas une méthode de relaxation. C'est une intervention mécanique sur ta pression artérielle. Et tu peux la pratiquer maintenant, assis là où tu es, sans prise de sang en vue. Plus tu la fais à froid, plus elle sera automatique le jour où tu en as besoin.
          </p>

          <div className={s.science}>
            <div className={s.scienceLabel}>Ce que dit la science</div>
            <p className={s.scienceText}>
              Dans les études cliniques d'Öst, la tension musculaire appliquée a éliminé les évanouissements chez la quasi-totalité des patients, y compris chez des personnes qui s'évanouissaient systématiquement depuis des années. Une méta-analyse publiée dans Clinical Psychology Review confirme des taux d'amélioration supérieurs à 80 % à un an de suivi.
            </p>
          </div>

          <h2>Ce qu'il faut dire à l'infirmier·e</h2>

          <p>
            Une phrase suffit avant de commencer : "J'ai tendance à faire des malaises en voyant le sang, est-ce qu'on peut adapter ?"
          </p>

          <p>
            Les infirmiers et infirmières connaissent bien cette situation. Ce que tu peux demander ne surprend personne : s'allonger plutôt que rester assis (la position allongée supprime l'effet de la gravité et réduit considérablement le risque), demander à ce que les tubes soient rangés directement hors de ta vue après le prélèvement, être prévenu juste avant l'insertion de l'aiguille plutôt que de se faire piquer sans annonce. Parler pendant le prélèvement aide aussi, pas pour se distraire, mais parce qu'une conversation active stabilise la respiration et le rythme cardiaque naturellement.
          </p>

          <p>
            Il n'y a aucune raison de ne pas formuler ces demandes. Elles sont toutes accordées.
          </p>

          <h2>Préparer le rendez-vous</h2>

          <p>
            La veille, évite la caféine en fin de journée. Elle amplifie l'anxiété anticipatoire, et tu n'as pas besoin de ça. Le matin du rendez-vous, hydrate-toi bien : un bon volume sanguin réduit la susceptibilité au malaise. Si ton ordonnance l'autorise, mange quelque chose de léger. Un jeûne prolongé fragilise.
          </p>

          <p>
            Dans la salle d'attente, assieds-toi dos aux autres patients si tu peux. Les réactions des personnes autour de toi peuvent amplifier les tiennes. Si tu sens l'anxiété monter, c'est le bon moment pour faire quelques cycles de tension musculaire, pas dans la cabine, maintenant, pendant l'attente. Et respire lentement : 5 secondes d'inspiration, 5 secondes d'expiration. La respiration lente active le système parasympathique et stabilise le rythme cardiaque sans que tu aies besoin d'y penser activement.
          </p>

          <p>
            Pendant la prise de sang, tourne la tête dans la direction opposée au bras piqué. Continue à parler. Et si tu sens les premiers signes de malaise, applique immédiatement la tension musculaire. Si malgré tout tu sens que ça bascule, préviens l'infirmier·e sans attendre. Une position allongée et quelques minutes suffisent dans la très grande majorité des cas.
          </p>

          <h2>Ce que cette prise de sang dit de plus grand</h2>

          <p>
            Si tu as repoussé un rendez-vous médical à cause de la peur, si tu t'es retrouvé épuisé après avoir lutté contre toi-même dans une salle d'attente, si tu organismes ta vie pour éviter certaines situations : la prise de sang n'est pas le problème. C'est un symptôme.
          </p>

          <p>
            Le problème, c'est une phobie spécifique qui, sans traitement, tend à s'aggraver. Chaque fois que tu évites, ton cerveau confirme que le danger est réel. Chaque fois que tu tiens mais à grand-peine, ça ne suffit pas à désapprendre la peur. Ce qui fonctionne, c'est une désensibilisation progressive : s'exposer graduellement, avec les bons outils, jusqu'à ce que le cerveau réapprenne que le sang n'est pas une menace. Les études sur l'hémophobie montrent des améliorations significatives chez plus de 80 % des personnes qui s'y tiennent sur 3 à 6 semaines.
          </p>

          <p>
            C'est ce que propose Bye Bye Blood.
          </p>

        </div>

        <div className={s.related}>
          <div className={s.relatedLabel}>À lire aussi</div>
          <div className={s.relatedLinks}>
            <Link to="/blog/hemophobie-traitement" className={s.relatedLink}>
              <span className={s.relatedLinkTag}>Comprendre</span>
              <p className={s.relatedLinkTitle}>Hémophobie : ce que c'est vraiment et comment s'en sortir</p>
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
            Aller plus loin que la prochaine prise de sang
          </h2>
          <p className={s.ctaText}>
            7 modules progressifs. Exposition graduelle, tension musculaire appliquée, principes ACT. La première séance est gratuite, sans engagement, sans image difficile.
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
