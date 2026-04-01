import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { startCheckout } from '../lib/checkout'

const MODULES = [
  { level: 1, title: 'Première approche', desc: 'Illustrations abstraites. Zéro pression.', xp: 100, unlocked: true },
  { level: 2, title: 'Couleur & forme', desc: 'Reconnaissance de couleurs et textures.', xp: 200, unlocked: true },
  { level: 3, title: 'Contexte médical', desc: 'Soins, hôpitaux — dans un cadre sécurisé.', xp: 300, unlocked: false },
  { level: 4, title: 'Exposition progressive', desc: 'Images réalistes, à ton rythme.', xp: 500, unlocked: false },
  { level: 5, title: 'Maîtrise complète', desc: 'Situations réelles. Tu gères.', xp: 1000, unlocked: false },
]

const FEATURES = [
  {
    icon: '🧠',
    title: 'Méthode scientifique',
    desc: "Protocole basé sur la thérapie d'exposition graduelle — validée cliniquement pour les phobies.",
  },
  {
    icon: '🎮',
    title: 'Progression gamifiée',
    desc: 'XP, niveaux, badges. Chaque étape franchie est une victoire réelle.',
  },
  {
    icon: '🔒',
    title: 'À ton rythme',
    desc: "Aucune pression. Tu avances quand tu es prêt·e. Le système s'adapte.",
  },
  {
    icon: '💳',
    title: 'Accès à vie, une seule fois',
    desc: "Un paiement unique. Pas d'abonnement. Tous les modules pour toujours.",
  },
]

export default function Landing() {
  const navigate = useNavigate()
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [checkoutError, setCheckoutError] = useState(null)

  async function handleCheckout() {
    setCheckoutLoading(true)
    setCheckoutError(null)
    try {
      await startCheckout()
    } catch (err) {
      setCheckoutError('Une erreur est survenue. Réessaie.')
      setCheckoutLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0E0E16] text-[#F0EBF4]">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 border-b border-[#2A2A38] bg-[#0E0E16]/80 backdrop-blur-md">
        <span className="text-xl font-bold tracking-tight">
          Bye Bye <span className="text-[#CC2233]">Blood</span>
        </span>
        <button
          onClick={() => navigate('/auth')}
          className="px-4 py-2 text-sm rounded-lg border border-[#CC2233] text-[#CC2233] hover:bg-[#CC2233] hover:text-white transition-colors"
        >
          Se connecter
        </button>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center pt-20">
        {/* Background glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full bg-[#CC2233]/10 blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-xs font-medium rounded-full bg-[#CC2233]/15 text-[#FF4455] border border-[#CC2233]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4455] animate-pulse" />
            Basé sur la thérapie d'exposition graduelle
          </div>

          <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-none mb-6">
            Tu fuis la vue<br />
            <span className="text-[#CC2233]">du sang.</span><br />
            Plus pour longtemps.
          </h1>

          <p className="text-lg text-[#9090A8] max-w-xl mx-auto mb-10 leading-relaxed">
            Une app de désensibilisation progressive. 5 niveaux. Des exercices concrets.
            Un système de progression qui te garde motivé·e jusqu'à la maîtrise complète.
          </p>

          {checkoutError && (
            <p className="text-[#FF4455] text-sm mb-4">{checkoutError}</p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleCheckout}
              disabled={checkoutLoading}
              className="px-8 py-4 bg-[#CC2233] hover:bg-[#991122] disabled:opacity-60 text-white font-semibold rounded-xl transition-all hover:scale-105 animate-pulse-glow"
            >
              {checkoutLoading ? 'Redirection…' : 'Commencer — 29€ une fois'}
            </button>
            <button
              onClick={() => document.getElementById('how').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-[#16161F] hover:bg-[#1E1E2A] text-[#F0EBF4] font-semibold rounded-xl border border-[#2A2A38] transition-colors"
            >
              Comment ça marche ?
            </button>
          </div>

          <p className="mt-5 text-xs text-[#6B6B80]">Accès complet. Aucun abonnement. Remboursé si inefficace sous 14 jours.</p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#6B6B80]">
          <span className="text-xs">Défiler</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#6B6B80] to-transparent" />
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">5 niveaux. Une progression réelle.</h2>
            <p className="text-[#9090A8]">Chaque module déverrouille le suivant. Tu ne sautes aucune étape.</p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-[#2A2A38] hidden sm:block" />

            <div className="flex flex-col gap-4">
              {MODULES.map((mod, i) => (
                <div
                  key={i}
                  className={`relative flex gap-6 p-5 rounded-2xl border transition-all ${
                    mod.unlocked
                      ? 'bg-[#16161F] border-[#CC2233]/40 hover:border-[#CC2233]'
                      : 'bg-[#16161F]/50 border-[#2A2A38] opacity-60'
                  }`}
                >
                  {/* Level badge */}
                  <div
                    className={`relative z-10 flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-xl font-black text-xl ${
                      mod.unlocked ? 'bg-[#CC2233] text-white' : 'bg-[#1E1E2A] text-[#6B6B80]'
                    }`}
                  >
                    {mod.unlocked ? mod.level : '🔒'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-lg">Niveau {mod.level} — {mod.title}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[#CC2233]/15 text-[#FF4455]">+{mod.xp} XP</span>
                    </div>
                    <p className="text-[#9090A8] text-sm">{mod.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-[#16161F]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Pourquoi ça marche</h2>
            <p className="text-[#9090A8]">Pas une simple galerie d'images. Un protocole structuré.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {FEATURES.map((f, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#0E0E16] border border-[#2A2A38] hover:border-[#CC2233]/40 transition-colors">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-[#9090A8] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-24 px-6">
        <div className="max-w-lg mx-auto text-center">
          <div className="p-8 rounded-3xl bg-[#16161F] border border-[#CC2233]/40 relative overflow-hidden">
            {/* Glow */}
            <div className="absolute inset-0 bg-[#CC2233]/5 pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-block px-3 py-1 mb-6 text-xs font-medium rounded-full bg-[#CC2233]/15 text-[#FF4455] border border-[#CC2233]/30">
                Accès complet
              </div>

              <div className="mb-2">
                <span className="text-6xl font-black">29</span>
                <span className="text-2xl font-bold">€</span>
              </div>
              <p className="text-[#6B6B80] text-sm mb-8">Paiement unique · Pas d'abonnement · Accès à vie</p>

              <ul className="text-sm text-left space-y-3 mb-8">
                {[
                  '5 modules complets débloqués',
                  'Suivi de progression XP + badges',
                  'Exercices interactifs à ton rythme',
                  'Accès illimité, pour toujours',
                  'Remboursement sous 14 jours si inefficace',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#9090A8]">
                    <span className="text-[#CC2233]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className="w-full py-4 bg-[#CC2233] hover:bg-[#991122] disabled:opacity-60 text-white font-bold rounded-xl transition-all hover:scale-[1.02] animate-pulse-glow"
              >
                {checkoutLoading ? 'Redirection…' : 'Commencer maintenant — 29€'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 pb-24 border-t border-[#2A2A38] text-center text-sm text-[#6B6B80]">
        <p>© 2026 Bye Bye Blood. Tous droits réservés.</p>
      </footer>
    </div>
  )
}
