import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { ProtectedRoute, PublicOnlyRoute } from '@/components/ProtectedRoute'
import CookieBanner from '@/components/CookieBanner'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Module from './pages/Module'
import Success from './pages/Success'
import DiagnosticSUD from './pages/DiagnosticSUD'
import SourcesScientifiques from './pages/SourcesScientifiques'
import Legal from './pages/Legal'
import BlogIndex from './pages/blog/BlogIndex'
import PeurPriseDeSang from './pages/blog/PeurPriseDeSang'
import EnfantPeurPriseDeSang from './pages/blog/EnfantPeurPriseDeSang'
import HemophobieTraitement from './pages/blog/HemophobieTraitement'
import DonDuSangPeur from './pages/blog/DonDuSangPeur'
import MalaiseVagal from './pages/blog/MalaiseVagal'
import PeurDesAiguilles from './pages/blog/PeurDesAiguilles'
import GrossessePeurDuSang from './pages/blog/GrossessePeurDuSang'

function PageViewTracker() {
  const location = useLocation()
  useEffect(() => {
    window.gtag?.('event', 'page_view', {
      page_path: location.pathname + location.search,
    })
  }, [location])
  return null
}

export default function App() {
  return (
    <>
    <PageViewTracker />
    <Routes>
      {/* Landing - accessible à tous, connecté ou non */}
      <Route path="/" element={<Landing />} />

      {/* Sources scientifiques - page publique */}
      <Route path="/sources" element={<SourcesScientifiques />} />
      <Route path="/legal" element={<Legal />} />

      {/* Blog */}
      <Route path="/blog" element={<BlogIndex />} />
      <Route path="/blog/prise-de-sang-peur-evanouissement" element={<PeurPriseDeSang />} />
      <Route path="/blog/enfant-peur-prise-de-sang" element={<EnfantPeurPriseDeSang />} />
      <Route path="/blog/hemophobie-traitement" element={<HemophobieTraitement />} />
      <Route path="/blog/don-du-sang-peur-hemophobie" element={<DonDuSangPeur />} />
      <Route path="/blog/malaise-vagal-causes-symptomes" element={<MalaiseVagal />} />
      <Route path="/blog/peur-des-aiguilles-trypanophobie" element={<PeurDesAiguilles />} />
      <Route path="/blog/grossesse-peur-du-sang-analyses" element={<GrossessePeurDuSang />} />

      {/* Auth - redirige vers /dashboard si déjà connecté */}
      <Route element={<PublicOnlyRoute />}>
        <Route path="/auth" element={<Auth />} />
      </Route>

      {/* Routes protégées - redirigent vers /auth si non connecté */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/module/:id" element={<Module />} />
        <Route path="/success" element={<Success />} />
        <Route path="/diagnostic" element={<DiagnosticSUD />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    <CookieBanner />
    </>
  )
}
