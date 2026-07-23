import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import s from './blog/Article.module.css'

export default function Legal() {
  useEffect(() => {
    const prevTitle = document.title
    document.title = 'Mentions légales et CGV - Bye Bye Blood'
    const meta = document.querySelector('meta[name="description"]')
    const prevDesc = meta?.getAttribute('content') ?? ''
    meta?.setAttribute('content', 'Mentions légales, conditions générales de vente et politique de confidentialité de Bye Bye Blood.')
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

        <div className={s.eyebrow}>Légal</div>
        <h1 className={s.h1}>Mentions légales et CGV</h1>

        <div className={s.body}>

          <h2>Éditeur</h2>
          <p>
            <strong>saintvincent</strong> — SAS à associé unique<br />
            RCS Marseille : 100 954 122<br />
            26 Rue Aldebert, 13006 Marseille<br />
            contact@pauldefais.fr
          </p>

          <h2>Hébergement</h2>
          <p>
            Vercel Inc. — 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis.
          </p>

          <h2>Conditions générales de vente</h2>
          <p>
            Bye Bye Blood est un programme numérique de 7 modules. Le module 1 est gratuit. L'accès complet est disponible au prix de <strong>295€ TTC</strong>, paiement unique sans abonnement, traité par Stripe.
          </p>
          <p>
            Conformément à l'article L.221-28 du Code de la consommation, le droit de rétractation ne s'applique pas aux contenus numériques dont l'exécution a commencé avec l'accord exprès de l'acheteur. En accédant au contenu après paiement, tu renonces expressément à ce droit. Pour tout litige, écris à contact@pauldefais.fr.
          </p>

          <h2>Données personnelles</h2>
          <p>
            Responsable du traitement : saintvincent (contact@pauldefais.fr). Données collectées : email, progression dans le programme. Base légale : exécution du contrat (Art. 6.1.b RGPD). Stockage : Supabase (UE). Durée : suppression dans les 30 jours suivant la clôture du compte.
          </p>
          <p>
            Droits d'accès, rectification et suppression : contact@pauldefais.fr. Cookies analytiques (Google Analytics) uniquement avec consentement explicite.
          </p>

          <p style={{marginTop:'3rem', fontSize:'0.82rem', color:'#A0907A'}}>
            Dernière mise à jour : 23 juillet 2026
          </p>

        </div>

      </article>

      <footer className={s.footer}>
        Bye Bye Blood · <Link to="/" style={{color:'inherit'}}>Accueil</Link> · <Link to="/sources" style={{color:'inherit'}}>Fondements scientifiques</Link>
      </footer>

    </div>
  )
}
