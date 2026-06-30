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

          <h2>Éditeur du site</h2>
          <p>
            Le site <strong>byebyeblood.fr</strong> est édité par :<br />
            <strong>Paul Defais</strong><br />
            Statut : [À COMPLÉTER - auto-entrepreneur / SASU / etc.]<br />
            SIRET : [À COMPLÉTER]<br />
            Adresse : [À COMPLÉTER]<br />
            Email : contact@pauldefais.fr
          </p>

          <h2>Hébergement</h2>
          <p>
            Le site est hébergé par <strong>Vercel Inc.</strong>, 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis.
          </p>

          <h2>Propriété intellectuelle</h2>
          <p>
            L'ensemble du contenu de ce site (textes, structure, programme, exercices) est protégé par le droit d'auteur. Toute reproduction, même partielle, est interdite sans autorisation écrite préalable.
          </p>

          <h2>Conditions générales de vente</h2>

          <h3 style={{fontSize:'1rem', fontWeight:600, marginTop:'1.5rem', marginBottom:'0.5rem'}}>Produit</h3>
          <p>
            Bye Bye Blood propose un programme numérique de désensibilisation progressive à l'hémophobie, composé de 7 modules accessibles en ligne. La première séance (module 1) est accessible gratuitement après inscription. L'accès aux 7 modules complets est disponible au prix de <strong>295€ TTC</strong>, en un seul paiement, sans abonnement.
          </p>

          <h3 style={{fontSize:'1rem', fontWeight:600, marginTop:'1.5rem', marginBottom:'0.5rem'}}>Paiement</h3>
          <p>
            Le paiement est sécurisé par <strong>Stripe</strong>. Les coordonnées bancaires ne transitent jamais par nos serveurs. L'accès complet est activé immédiatement après confirmation du paiement.
          </p>

          <h3 style={{fontSize:'1rem', fontWeight:600, marginTop:'1.5rem', marginBottom:'0.5rem'}}>Droit de rétractation</h3>
          <p>
            Conformément à l'article L.221-28 du Code de la consommation, le droit de rétractation ne s'applique pas aux contenus numériques dont l'exécution a commencé avec l'accord exprès de l'acheteur. En accédant au contenu après paiement, tu renonces expressément à ton droit de rétractation. En cas de problème, contacte-nous à contact@pauldefais.fr - nous trouverons une solution.
          </p>

          <h3 style={{fontSize:'1rem', fontWeight:600, marginTop:'1.5rem', marginBottom:'0.5rem'}}>Accès et durée</h3>
          <p>
            L'accès au programme est personnel, non transférable, et à durée illimitée. Il est conditionné au maintien du compte utilisateur.
          </p>

          <h2>Données personnelles (RGPD)</h2>
          <p>
            Les données collectées (email, prénom optionnel, progression dans le programme) sont utilisées uniquement pour le fonctionnement du service. Elles sont stockées sur les serveurs de <strong>Supabase</strong> (Union Européenne). Elles ne sont ni vendues ni partagées avec des tiers à des fins commerciales.
          </p>
          <p>
            Conformément au RGPD, tu disposes d'un droit d'accès, de rectification et de suppression de tes données. Pour exercer ces droits, écris à contact@pauldefais.fr. Un compte peut être supprimé à tout moment depuis l'interface ou sur simple demande.
          </p>
          <p>
            <strong>Responsable du traitement :</strong> Paul Defais, contact@pauldefais.fr<br />
            <strong>Données traitées :</strong> adresse email, prénom (optionnel), progression et journal de bord dans le programme<br />
            <strong>Base légale :</strong> exécution du contrat (Art. 6.1.b RGPD)<br />
            <strong>Durée de conservation :</strong> durée du compte, puis suppression dans les 30 jours suivant la clôture
          </p>

          <h2>Cookies</h2>
          <p>
            Ce site utilise Google Analytics (GA4) pour mesurer l'audience, uniquement avec ton consentement explicite. Si tu refuses les cookies via la bannière, aucune donnée n'est collectée. Aucun cookie publicitaire n'est utilisé.
          </p>

          <h2>Avertissement médical</h2>
          <p>
            Bye Bye Blood est un programme éducatif, pas un dispositif médical. Il n'est pas destiné à remplacer un suivi médical ou psychologique. Si tu souffres de malaises fréquents, d'antécédents cardiaques, ou d'une phobie sévère, consulte un professionnel de santé avant de commencer.
          </p>

          <p style={{marginTop:'3rem', fontSize:'0.82rem', color:'#A0907A'}}>
            Dernière mise à jour : 30 juin 2026
          </p>

        </div>

      </article>

      <footer className={s.footer}>
        Bye Bye Blood · <Link to="/" style={{color:'inherit'}}>Accueil</Link> · <Link to="/sources" style={{color:'inherit'}}>Fondements scientifiques</Link>
      </footer>

    </div>
  )
}
