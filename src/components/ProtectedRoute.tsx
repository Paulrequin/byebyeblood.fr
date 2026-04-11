import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

/**
 * Redirige vers /auth si l'utilisateur n'est pas connecté.
 * Préserve l'URL cible dans `?next=` pour redirection post-login.
 */
export function ProtectedRoute() {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="h-dvh flex items-center justify-center bg-white">
        <div className="w-10 h-10 rounded-full border-4 border-[#E53935]/30 border-t-[#E53935] animate-spin" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />
  }

  return <Outlet />
}

/**
 * Redirige vers /dashboard si l'utilisateur est déjà connecté.
 * Utilisé sur / et /auth pour éviter d'y retourner quand on est déjà auth.
 */
export function PublicOnlyRoute() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="h-dvh flex items-center justify-center bg-white">
        <div className="w-10 h-10 rounded-full border-4 border-[#E53935]/30 border-t-[#E53935] animate-spin" />
      </div>
    )
  }

  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
