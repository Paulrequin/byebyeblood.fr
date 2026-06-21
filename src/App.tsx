import { Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute, PublicOnlyRoute } from '@/components/ProtectedRoute'
import CookieBanner from '@/components/CookieBanner'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Module from './pages/Module'
import Success from './pages/Success'
import DiagnosticSUD from './pages/DiagnosticSUD'
import SourcesScientifiques from './pages/SourcesScientifiques'
import BlogIndex from './pages/blog/BlogIndex'
import PeurPriseDeSang from './pages/blog/PeurPriseDeSang'
import EnfantPeurPriseDeSang from './pages/blog/EnfantPeurPriseDeSang'
import HemophobieTraitement from './pages/blog/HemophobieTraitement'
import DonDuSangPeur from './pages/blog/DonDuSangPeur'

export default function App() {
  return (
    <>
    <Routes>
      {/* Landing - accessible à tous, connecté ou non */}
      <Route path="/" element={<Landing />} />

      {/* Sources scientifiques - page publique */}
      <Route path="/sources" element={<SourcesScientifiques />} />

      {/* Blog */}
      <Route path="/blog" element={<BlogIndex />} />
      <Route path="/blog/prise-de-sang-peur-evanouissement" element={<PeurPriseDeSang />} />
      <Route path="/blog/enfant-peur-prise-de-sang" element={<EnfantPeurPriseDeSang />} />
      <Route path="/blog/hemophobie-traitement" element={<HemophobieTraitement />} />
      <Route path="/blog/don-du-sang-peur-hemophobie" element={<DonDuSangPeur />} />

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
