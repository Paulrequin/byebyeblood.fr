import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import s from './Article.module.css'

export default function DonDuSangPeur() {
  useEffect(() => {
    const prevTitle = document.title
    document.title = 'Donner son sang quand on a peur du sang : est-ce possible ? - Bye Bye Blood'
    const meta = document.querySelector('meta[name="description"]')
    const prevDesc = meta?.getAttribute('content') ?? ''
    meta?.setAttribute('content', "Tu veux donner ton sang mais tu as peur du sang ou des aiguilles ? Voici ce qu'on peut faire concrètement avant, pendant et après, et ce que les centres de don proposent pour t'aider.")

    const canonical = document.createElement('link')
    canonical.rel = 'canonical'
    canonical.href = 'https://www.byebyeblood.fr/blog/don-du-sang-peur-hemophobie'
    canonical.id = 'page-canonical'
    document.head.appendChild(canonical)

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: 'Donner son sang quand on a peur du sang : est-ce possible ?',
      description: "Avoir peur du sang n'est pas une contre-indication au don. Ce que les centres prévoient déjà, et ce que tu peux préparer de ton côté pour éviter le malaise vasovagal.",
      datePublished: '2026-06-21',
      dateModified: '2026-06-21',
      inLanguage: 'fr-FR',
      url: 'https://www.byebyeblood.fr/blog/don-du-sang-peur-hemophobie',
      mainEntityOfPage: 'https://www.byebyeblood.fr/blog/don-du-sang-peur-hemophobie',
      author: { '@type': 'Organization', name: 'Bye Bye Blood', url: 'https://www.byebyeblood.fr' },
      publisher: { '@type': 'Organization', name: 'Bye Bye Blood', url: 'https://www.byebyeblood.fr' },
      keywords: ['don du sang peur', 'hémophobie don sang', 'malaise vasovagal don sang', 'peur aiguille don'],
      articleSection: 'Don du sang',
    }
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'article-schema'
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)

    return () => {
      document.title = prevTitle
      meta?.setAttribute('content', prevDesc)
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

        <div className={s.eyebrow}>Hémophobie · Don du sang</div>

        <h1 className={s.h1}>
          Donner son sang quand on a peur du sang : est-ce possible ?
        </h1>

        <div className={s.meta}>
          <span>6 min de lecture</span>
          <span>·</span>
          <span>21 juin 2026</span>
        </div>

        <p className={s.intro}>
          Il y a quelque chose de particulier dans le fait de vouloir donner son sang quand on en a peur. C'est souvent une motivation sincère, un geste qu'on aimerait pouvoir faire, et en même temps le sentiment que c'est hors de portée. Pas forcément. Voici ce qu'on peut faire concrètement, et ce que les centres de don proposent déjà pour les personnes dans cette situation.
        </p>

        <div className={s.body}>

          <h2>Est-ce médicalement possible ?</h2>

          <p>
            Avoir peur du sang n'est pas une contre-indication médicale au don. Les questionnaires de santé demandent si tu as des problèmes cardiaques, des antécédents de maladies transmissibles, certains traitements en cours. La phobie du sang n'est pas dans la liste des exclusions.
          </p>

          <p>
            Ce qui peut poser problème en revanche, c'est le malaise vasovagal. Si tu t'es déjà évanoui lors d'une prise de sang, tu sais que ça peut arriver. Lors d'un don du sang, on prélève environ 450 ml en 8 à 10 minutes, soit une quantité plus importante que lors d'une simple analyse. Le risque de malaise est réel et les centres le savent. Mais ils le gèrent tous les jours.
          </p>

          <h2>Ce que les centres font déjà pour toi</h2>

          <p>
            Les centres de don du sang en France ont l'habitude des donneurs anxieux. Le don se fait allongé, ce qui supprime déjà une grande partie du risque de malaise. Les infirmiers surveillent en permanence, et un malaise pendant le don est géré en quelques minutes sans aucune conséquence grave. Ce n'est pas une situation d'urgence pour eux, c'est une routine.
          </p>

          <p>
            Tu peux signaler en arrivant que tu as tendance à faire des malaises en voyant le sang ou les aiguilles. Ils peuvent positionner le bras différemment, placer un drap si tu ne veux pas voir la poche, te parler pendant tout le don pour maintenir une conversation. Certains centres ont des équipes particulièrement formées à l'accueil des donneurs anxieux.
          </p>

          <p>
            Un détail qui compte : après le don, tu restes allongé 5 à 10 minutes, puis tu passes en zone de collation obligatoire. Ce temps de récupération est prévu dans le protocole, pas juste proposé. C'est utile pour tout le monde, et encore plus pour les personnes sujettes aux malaises.
          </p>

          <h2>Ce que tu peux faire de ton côté</h2>

          <p>
            La technique qui change vraiment quelque chose, c'est la tension musculaire appliquée. Elle consiste à contracter simultanément les muscles des bras, des jambes et du ventre pendant 15 à 20 secondes, relâcher, et répéter. En comprimant les vaisseaux sanguins, tu forces la pression artérielle à rester stable, ce qui empêche la chute qui précède le malaise.
          </p>

          <p>
            Tu peux pratiquer cette technique chez toi, bien avant le don, jusqu'à ce qu'elle devienne automatique. Le jour du don, tu l'appliques dès les premiers signes de malaise : vision qui se rétrécit, sueurs froides, bourdonnements. Tu n'as pas besoin d'attendre que ça bascule.
          </p>

          <p>
            Quelques préparations simples le jour J : mange normalement avant d'aller (ne viens pas à jeun), hydrate-toi bien dans les heures qui précèdent, évite la caféine le matin si tu es sensible à l'anxiété. Un bon volume sanguin réduit la susceptibilité au malaise.
          </p>

          <div className={s.science}>
            <div className={s.scienceLabel}>Ce que dit la science</div>
            <p className={s.scienceText}>
              Des études menées dans les centres de don montrent que les malaises vasovagaux pendant ou après un don touchent environ 2 à 3 % des donneurs au total, et sont significativement plus fréquents lors du premier don. La bonne nouvelle : les donneurs réguliers présentent un risque bien plus faible, probablement parce que la répétition diminue l'anxiété anticipatoire. Le premier don est presque toujours le plus difficile.
            </p>
          </div>

          <h2>Si c'est trop pour l'instant</h2>

          <p>
            Si tu as une phobie du sang bien installée et que le don te semble encore hors de portée, c'est une information utile, pas un jugement. La phobie du sang n'est pas une fatalité, elle se traite. Des personnes qui s'évanouissaient systématiquement lors de prises de sang réussissent à donner leur sang après un travail de désensibilisation de quelques semaines.
          </p>

          <p>
            Il ne s'agit pas de se forcer. Se forcer à quelque chose qu'on ne gère pas encore renforce souvent la phobie. Il s'agit plutôt de construire, dans l'ordre, les outils qui permettent d'y arriver. La tension musculaire d'abord. Quelques expositions graduelles ensuite, avec des images ou des vidéos, en montant par paliers. Puis la prise de sang. Et un jour, si tu le veux, le don.
          </p>

          <p>
            Beaucoup de personnes qui ont travaillé leur phobie du sang disent que le don est devenu un symbole important pour elles. Pas parce que c'est facile, mais parce que ça prouve que quelque chose a vraiment changé.
          </p>

        </div>

        <div className={s.related}>
          <div className={s.relatedLabel}>À lire aussi</div>
          <div className={s.relatedLinks}>
            <Link to="/blog/prise-de-sang-peur-evanouissement" className={s.relatedLink}>
              <span className={s.relatedLinkTag}>Conseils pratiques</span>
              <p className={s.relatedLinkTitle}>Prise de sang : que faire quand on a peur de s'évanouir</p>
            </Link>
            <Link to="/blog/hemophobie-traitement" className={s.relatedLink}>
              <span className={s.relatedLinkTag}>Comprendre</span>
              <p className={s.relatedLinkTitle}>Hémophobie : ce que c'est vraiment et comment s'en sortir</p>
            </Link>
          </div>
        </div>

        <div className={s.cta}>
          <div className={s.ctaLabel}>Programme de désensibilisation</div>
          <h2 className={s.ctaTitle}>
            Construire les outils, dans l'ordre
          </h2>
          <p className={s.ctaText}>
            Bye Bye Blood propose 7 modules progressifs pour aller de "je ne peux pas regarder du sang" à "je gère une prise de sang sans malaise". La première séance est gratuite.
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
