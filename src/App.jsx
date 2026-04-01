import { useEffect, useRef } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Module from './pages/Module'
import Success from './pages/Success'
import { supabase } from './lib/supabase'

export default function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const pathnameRef = useRef(location.pathname)
  pathnameRef.current = location.pathname

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const publicPaths = ['/', '/auth']
        const isNextCheckout = window.location.search.includes('next=checkout')
        if (publicPaths.includes(pathnameRef.current) && !isNextCheckout) {
          navigate('/dashboard')
        }
      }
    })
    return () => subscription.unsubscribe()
  }, [navigate])

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/module/:id" element={<Module />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  )
}
