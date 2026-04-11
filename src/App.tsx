import { Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute, PublicOnlyRoute } from '@/components/ProtectedRoute'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Module from './pages/Module'
import Success from './pages/Success'

export default function App() {
  return (
    <Routes>
      {/* Routes publiques — redirigent vers /dashboard si déjà connecté */}
      <Route element={<PublicOnlyRoute />}>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
      </Route>

      {/* Routes protégées — redirigent vers /auth si non connecté */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/module/:id" element={<Module />} />
        <Route path="/success" element={<Success />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
