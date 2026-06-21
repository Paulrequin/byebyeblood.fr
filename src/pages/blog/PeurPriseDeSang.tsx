import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import s from './Article.module.css'

export default function PeurPriseDeSang() {
  useEffect(() => {
    const prevTitle = document.title
    document.title = 'Prise de sang : que faire quand on a peur du sang - Bye Bye Blood'
    const meta = document.querySelector('meta[name="description"]')
    const prevDesc = meta?.getAttribute('content') ?? ''
    meta?.setAttribute('content', "Tu as une prise de sang et tu as peur de t'évanouir ? Voici la technique validée scientifiquement pour ne pas faire de malaise, ce qu'il faut dire à l'infirmier·e, et comment préparer le rendez-vous.")
    return () => {
      document.title = prevTitle
      meta?.setAttribute('content', prevDesc)
    }
  }, [])

  return (
    <div className={s.page}>

      <nav className={s.nav}>
        <Link to="/" className={s.navLogo}>Bye Bye <span>Blood</span></Link>
        <Link to="/" className={s.backLink}>← Accueil</Link>
      </nav>

      <article className={s.wrap}>

        <div className={s.eyebrow}>Hémophobie · Conseils pratiques</div>

        <h1 className={s.h1}>
          Prise de sang : que faire quand on a peur de s'évanouir
        </h1>

        <div className={s.meta}>
          <span>8 min de lecture</span>
          <span>·</span>
          <span>Mis à jour le 21 juin 2026</span>
        </div>

        <p className={s.intro}>
          Tu as un rendez-vous pour une prise de sang. Depuis que tu l'as noté dans ton agenda, quelque chose se serre dans ta poitrine. Tu connais la séquence : la salle d'attente, l'odeur du cabinet, l'aiguille, et ce moment où tu sens que tout bascule. Si tu lis cet article, tu n'es pas fragile. Tu as une réaction physiologique précise, documentée, que 3 à 4 % de la population partage. Et elle se traite.
        </p>

        <div className={s.body}>

          <h2>Pourquoi tu t'évanouis - et ce n'est pas ce que tu crois</h2>

          <p>
            La plupart des phobies accélèrent le cœur. L'adrénaline monte, la pression grimpe, le corps se prépare à fuir. L'hémophobie fait exactement l'inverse.
          </p>

          <p>
            Quand tu aperçois du sang ou que tu anticipes une prise de sang, ton cerveau envoie un signal au nerf vague - le plus long nerf du système nerveux autonome, qui relie le cerveau à la plupart des organes vitaux. Ce nerf ralentit brutalement le cœur et dilate les vaisseaux sanguins. La pression artérielle s'effondre. Le cerveau reçoit momentanément moins de sang. Tu perds connaissance.
          </p>

          <p>
            C'est ce que les médecins appellent la réponse vasovagale biphasique. Elle est distincte de toutes les autres phobies, ce qui explique pourquoi les techniques classiques de gestion du stress ne suffisent pas. Respirer lentement calme l'anxiété, oui. Mais ça ne remonte pas la pression artérielle.
          </p>

          <div className={s.science}>
            <div className={s.scienceLabel}>Ce que dit la science</div>
            <p className={s.scienceText}>
              Le professeur Lars-Göran Öst (Université de Stockholm) a documenté ce mécanisme dès 1987 dans Behaviour Research and Therapy. Ses travaux ont montré que l'hémophobie est la seule phobie spécifique associée à une réponse diphasique : accélération cardiaque initiale suivie d'une chute brutale. Cette particularité nécessite une technique de traitement dédiée.
            </p>
          </div>

          <h2>Les signes que ton corps envoie avant le malaise</h2>

          <p>
            Le malaise vasovagal n'arrive jamais d'un coup. Il annonce son arrivée, et tu as entre 20 et 60 secondes pour agir. Apprendre à les reconnaître change tout.
          </p>

          <p>Les premiers signes :</p>
          <ul>
            <li>La vision qui se rétrécit sur les bords, comme un tunnel</li>
            <li>Des sueurs froides soudaines sur le front ou les paumes</li>
            <li>Des bourdonnements dans les oreilles</li>
            <li>Une légère nausée et une sensation de froid</li>
            <li>La pâleur - que toi tu ne vois pas, mais que l'infirmier·e remarque toujours</li>
          </ul>

          <p>
            Dès que tu ressens l'un de ces signes, tu n'es pas obligé d'attendre la suite. Tu peux intervenir directement sur le mécanisme physiologique.
          </p>

          <h2>La technique que personne ne t'explique</h2>

          <p>
            Si le problème est une chute de pression artérielle, la solution est de l'augmenter volontairement. C'est le principe de la tension musculaire appliquée (Applied Tension), développée par Öst et Sterner en 1987.
          </p>

          <p>La technique, pas à pas :</p>

          <ol className={s.steps}>
            <li className={s.step}>
              <span className={s.stepN}>01</span>
              <span>Contracte simultanément les muscles de tes bras, de tes jambes et de ton ventre - aussi fort que tu peux - pendant 15 à 20 secondes.</span>
            </li>
            <li className={s.step}>
              <span className={s.stepN}>02</span>
              <span>Relâche progressivement sur 20 à 30 secondes. Tu sentiras peut-être une légère bouffée de chaleur au visage : c'est le sang qui remonte.</span>
            </li>
            <li className={s.step}>
              <span className={s.stepN}>03</span>
              <span>Répète le cycle 5 fois.</span>
            </li>
          </ol>

          <p>
            Quand tes muscles se contractent, ils compriment les vaisseaux sanguins et forcent le sang vers le cerveau. La pression remonte. Le malaise recule.
          </p>

          <div className={s.science}>
            <div className={s.scienceLabel}>Ce que dit la science</div>
            <p className={s.scienceText}>
              Dans les études d'Öst, la tension musculaire appliquée a permis d'éliminer les évanouissements chez la quasi-totalité des patients traités, y compris chez des personnes qui s'évanouissaient systématiquement depuis des années. Une méta-analyse publiée dans Clinical Psychology Review confirme que c'est la technique la plus efficace pour l'hémophobie, avec des taux de succès supérieurs à 80 % à un an de suivi.
            </p>
          </div>

          <p>
            Tu peux pratiquer cette technique maintenant, avant même le rendez-vous. Contracte et relâche cinq fois de suite. C'est ça, la technique dans son intégralité. Plus tu la pratiques à froid, plus elle sera naturelle le jour J.
          </p>

          <h2>Ce qu'il faut dire à l'infirmier·e avant de commencer</h2>

          <p>
            Une phrase suffit : <strong>"J'ai tendance à faire des malaises en voyant le sang. Est-ce qu'on peut adapter ?"</strong>
          </p>

          <p>Ce que tu peux demander :</p>
          <ul>
            <li><strong>S'allonger</strong> plutôt que rester assis. La position allongée supprime l'effet de la gravité et réduit considérablement le risque d'évanouissement.</li>
            <li><strong>Ne pas voir les tubes</strong> après le prélèvement. Demande à ce qu'ils soient rangés directement hors de ta vue.</li>
            <li><strong>Être prévenu juste avant</strong> l'insertion de l'aiguille. L'anticipation non annoncée est plus difficile à gérer que l'annonce directe.</li>
            <li><strong>Parler pendant le prélèvement.</strong> Une conversation active détourne l'attention et stabilise la respiration naturellement.</li>
          </ul>

          <p>
            Les infirmiers et infirmières connaissent bien la peur des prises de sang. Ces demandes sont courantes et toujours accordées. Il n'y a aucune raison de ne pas les formuler.
          </p>

          <h2>Préparer le rendez-vous à l'avance</h2>

          <p><strong>La veille</strong></p>
          <ul>
            <li>Mange normalement, dans la limite de ce que prescrit l'ordonnance.</li>
            <li>Évite la caféine en fin de journée - elle amplifie l'anxiété anticipatoire.</li>
            <li>Rappelle-toi que le malaise vasovagal est désagréable mais pas dangereux, et que tu as maintenant un outil pour l'anticiper.</li>
          </ul>

          <p><strong>Le matin du rendez-vous</strong></p>
          <ul>
            <li>Hydrate-toi bien. Un bon volume sanguin réduit la susceptibilité au malaise.</li>
            <li>Mange quelque chose de léger si ton ordonnance le permet. Un jeûne prolongé fragilise.</li>
            <li>Prévois d'arriver quelques minutes en avance pour t'installer sans précipitation.</li>
          </ul>

          <p><strong>Dans la salle d'attente</strong></p>
          <ul>
            <li>Assieds-toi dos aux autres patients si possible - les réactions d'autres personnes peuvent amplifier la tienne.</li>
            <li>Pratique 2 à 3 cycles de tension musculaire dès que tu sens l'anxiété monter. Inutile d'attendre d'être dans la cabine.</li>
            <li>Respire lentement : 5 secondes d'inspiration, 5 secondes d'expiration. La respiration lente active le système parasympathique et stabilise le rythme cardiaque.</li>
          </ul>

          <p><strong>Pendant la prise de sang</strong></p>
          <ul>
            <li>Tourne la tête dans la direction opposée au bras piqué.</li>
            <li>Continue à parler ou à écouter l'infirmier·e.</li>
            <li>Applique la tension musculaire dès les premiers signes de malaise.</li>
            <li>Si tu sens le malaise arriver malgré tout, préviens immédiatement. Une position allongée et quelques minutes suffisent dans la grande majorité des cas.</li>
          </ul>

          <h2>Et après ce rendez-vous ?</h2>

          <p>
            Si tu as déjà repoussé un rendez-vous médical à cause de la peur, si tu t'es retrouvé épuisé après avoir lutté contre toi-même, si tu évites certaines situations pour ne pas croiser du sang - cette prise de sang est un symptôme. Pas le problème.
          </p>

          <p>
            Le problème, c'est une phobie spécifique qui, sans traitement, tend à s'aggraver. Chaque évitement confirme au cerveau que le danger est réel. Chaque confrontation surmontée de justesse ne suffit pas à désapprendre la peur.
          </p>

          <p>
            Ce qui fonctionne, c'est une désensibilisation progressive : s'exposer graduellement, avec les bons outils, jusqu'à ce que le cerveau réapprenne que le sang n'est pas une menace. Les études montrent des améliorations significatives en 3 à 6 semaines pour la majorité des personnes qui s'y tiennent.
          </p>

        </div>

        <div className={s.cta}>
          <div className={s.ctaLabel}>Programme de désensibilisation</div>
          <h2 className={s.ctaTitle}>
            Aller plus loin que la prochaine prise de sang
          </h2>
          <p className={s.ctaText}>
            Bye Bye Blood propose 7 modules progressifs combinant exposition graduelle, tension musculaire appliquée et principes ACT. La première séance est gratuite, sans engagement.
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
