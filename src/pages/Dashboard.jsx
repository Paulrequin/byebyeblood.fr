import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { MODULES } from '../data/modules'
import { getProgress, isModuleCompleted, isModuleUnlocked } from '../lib/progress'

const MAX_XP = 2350
const ALL_BADGES = MODULES.map(m => m.badge)

function greetingFromCount(count) {
  if (count === 0) return 'Prêt à commencer ton parcours ?'
  if (count <= 2) return 'Tu as fait les premiers pas. Continue !'
  if (count <= 5) return 'Tu progresses vraiment bien.'
  return 'Tu es presque au bout. Incroyable ! 🏆'
}

function formatDate(iso) {
  try {
    const d = new Date(iso)
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
  } catch {
    return ''
  }
}

function ratingLabel(r) {
  if (r <= 3) return { label: `${r}/10`, color: 'text-rose-400' }
  if (r <= 6) return { label: `${r}/10`, color: 'text-yellow-400' }
  return { label: `${r}/10`, color: 'text-green-400' }
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [hasAccess, setHasAccess] = useState(null)
  const [xp, setXp] = useState(0)
  const [completedCount, setCompletedCount] = useState(0)
  const [journal, setJournal] = useState([])
  const [badgeIds, setBadgeIds] = useState([])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    async function init() {
      if (import.meta.env.DEV) {
        setUser({ email: 'dev@local.test' })
      } else {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) { navigate('/auth'); return }
        setUser(user)

        const { data: profile } = await supabase
          .from('profiles')
          .select('has_access')
          .eq('id', user.id)
          .single()

        if (!profile?.has_access) {
          navigate('/')
          return
        }
      }

      const prog = getProgress()
      setXp(prog.xp)
      setCompletedCount(prog.completedModules.length)
      setJournal(prog.journal)
      setBadgeIds(prog.badges)

      setHasAccess(true)
    }
    init()
  }, [navigate])

  if (hasAccess === null) {
    return (
      <div className="min-h-screen bg-[#0E0E16] flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-[#CC2233]/20 border-t-[#CC2233] animate-spin" />
      </div>
    )
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    navigate('/')
  }

  const xpPercent = Math.min(100, Math.round((xp / MAX_XP) * 100))
  const recentJournal = [...journal].reverse().slice(0, 5)
  const GENERIC_NAMES = ['dev', 'user', 'admin', 'test', 'null']
  const rawFirstName = user?.user_metadata?.full_name?.split(' ')[0] ?? user?.email?.split('@')[0] ?? ''
  const firstName = GENERIC_NAMES.includes(rawFirstName.toLowerCase()) ? '' : rawFirstName
  const userInitial = firstName?.[0]?.toUpperCase() ?? '?'

  return (
    <div className="min-h-screen flex flex-col bg-[#0E0E16] text-[#F0EBF4]">

      {/* Nav */}
      <nav className="sticky top-0 z-10 flex items-center justify-between px-8 py-3 bg-[#0E0E16] border-b border-[#2A2A38]">
        <span className="text-base font-bold tracking-tight">
          Bye Bye <span className="text-[#CC2233]">Blood</span>
        </span>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#CC2233] flex items-center justify-center text-white text-sm font-bold">
            {userInitial}
          </div>
          <button
            onClick={handleSignOut}
            className="text-sm text-[#6B6B80] hover:text-[#F0EBF4] transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </nav>

      <main className="flex-1 w-full flex flex-col items-center">
        <div className="w-full max-w-2xl px-5 pt-8 pb-24">

          {/* Hero greeting */}
          <div className="mb-10">
            <h1 className="text-4xl font-black mb-1 leading-tight">Bonjour{firstName ? ` ${firstName}` : ''} 👋</h1>
            <p className="text-[#9090A8] text-base">{greetingFromCount(completedCount)}</p>
          </div>

          {/* XP Card unifiée */}
          <div className="rounded-3xl p-6 mb-10 border border-[#2A2A38]" style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #16161F 100%)' }}>
            {/* Stats row */}
            <div className="flex items-center mb-5">
              <div className="flex-1">
                <p className="text-sm font-medium text-[#9090A8] mb-1">Modules terminés</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-[#CC2233]">{completedCount}</span>
                  <span className="text-lg text-[#3A3A58] font-semibold">/ 7</span>
                </div>
              </div>
              <div className="w-px h-12 bg-[#2A2A38] mx-4" />
              <div className="flex-1">
                <p className="text-sm font-medium text-[#9090A8] mb-1">XP total</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-[#CC2233]">{xp}</span>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs font-semibold text-[#9090A8] uppercase tracking-wider">Progression</p>
              <span className="text-sm font-black text-[#CC2233]">{xpPercent}%</span>
            </div>
            <div className="w-full h-3.5 bg-[#1E1E2A] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${xpPercent}%`,
                  background: 'linear-gradient(90deg, #CC2233 0%, #FF4455 100%)',
                  boxShadow: xpPercent > 0 ? '0 0 8px #CC2233, 0 0 16px rgba(204,34,51,0.5)' : 'none',
                }}
              />
            </div>
            <p className="text-xs text-[#6B6B80] mt-2">
              {xpPercent < 25
                ? 'Ton parcours commence ici 🔥'
                : xpPercent < 75
                ? 'Tu avances bien 💪'
                : 'Presque au sommet 🏆'}
            </p>
          </div>

          {/* Badges */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-black uppercase tracking-widest text-[#9090A8]">Badges</h2>
              <span className="text-xs text-[#6B6B80] font-medium">{badgeIds.length} / {ALL_BADGES.length}</span>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
              {ALL_BADGES.map(badge => {
                const earned = badgeIds.includes(badge.id)
                return (
                  <div
                    key={badge.id}
                    title={badge.label}
                    className={`relative flex-shrink-0 flex flex-col items-center gap-2 w-20 h-24 justify-center rounded-2xl text-center border transition-all ${
                      earned
                        ? 'bg-[#CC2233]/20 border-[#CC2233]/60 opacity-100'
                        : 'bg-transparent border-[#2A2A38] opacity-20'
                    }`}
                  >
                    {earned && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#CC2233]" />
                    )}
                    <span className="text-3xl">{badge.icon}</span>
                    <span className={`text-xs font-semibold leading-tight px-1 ${earned ? 'text-[#F0EBF4]' : 'text-[#9090A8]'}`}>{badge.label}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Modules */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-black uppercase tracking-widest text-[#9090A8]">Modules</h2>
            </div>
            <div className="flex flex-col gap-5">
              {MODULES.map(mod => {
                const isCompleted = isModuleCompleted(mod.id)
                const isUnlocked = isModuleUnlocked(mod.id)
                const isCurrent = isUnlocked && !isCompleted

                return (
                  <div
                    key={mod.id}
                    onClick={() => isUnlocked && navigate(`/module/${mod.id}`)}
                    className={`rounded-2xl overflow-hidden transition-all ${
                      !isUnlocked
                        ? 'opacity-35 cursor-not-allowed'
                        : 'cursor-pointer'
                    }`}
                  >
                    <div className={`flex items-center gap-4 p-7 border-l-4 ${
                      isCompleted
                        ? 'bg-[#0D1F1A] border-l-green-500 border border-green-900/40'
                        : isCurrent
                        ? 'bg-[#1E1A2E] border-l-[#CC2233] border border-[#CC2233]/30'
                        : 'bg-[#16161F] border-l-transparent border border-[#2A2A38]'
                    }`}>
                      {/* Icon */}
                      <div className={`flex-shrink-0 flex items-center justify-center rounded-2xl font-black ${!isUnlocked ? 'w-8 h-8 text-sm' : 'w-14 h-14 text-xl'} ${
                        isCompleted
                          ? 'bg-green-900/40 text-green-400'
                          : isCurrent
                          ? 'bg-[#CC2233] text-white'
                          : 'bg-[#1E1E2A] text-[#4A4A5A]'
                      }`}>
                        {isCompleted ? '✓' : !isUnlocked ? <span className="text-sm">🔒</span> : mod.id}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-bold text-[#F0EBF4] truncate ${isCurrent ? 'text-xl' : 'text-lg'}`}>{mod.title}</h3>
                        <p className="text-sm text-[#8080A0] truncate">{mod.subtitle}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          {isCompleted && (
                            <span className="text-xs font-semibold text-green-400 bg-green-900/30 px-2 py-0.5 rounded-full">Terminé ✓</span>
                          )}
                          {isCurrent && (
                            <span className="text-xs font-semibold text-[#FF4455] bg-[#CC2233]/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4455] animate-pulse inline-block" />
                              En cours
                            </span>
                          )}
                          <span className="text-xs text-[#6B6B80]">{mod.duration}</span>
                        </div>
                      </div>

                      {/* XP + Continuer */}
                      <div className="flex-shrink-0 min-w-fit text-right whitespace-nowrap flex flex-col items-end gap-1">
                        <p className="text-sm font-black text-[#CC2233]">+{mod.xpBonus} XP</p>
                        {isCurrent && (
                          <button
                            onClick={e => { e.stopPropagation(); navigate(`/module/${mod.id}`) }}
                            className="text-sm text-[#CC2233] hover:underline bg-transparent border-none cursor-pointer"
                          >
                            Continuer →
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Journal */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-black uppercase tracking-widest text-[#9090A8]">Journal</h2>
              {recentJournal.length > 0 && (
                <span className="text-xs text-[#6B6B80]">{recentJournal.length} entrée{recentJournal.length > 1 ? 's' : ''}</span>
              )}
            </div>
            {recentJournal.length === 0 ? (
              <div className="bg-[#16161F] rounded-2xl p-8 text-center border border-[#2A2A38]">
                <div className="text-4xl mb-3">📓</div>
                <p className="font-semibold text-[#F0EBF4] mb-1">Ton journal est vide</p>
                <p className="text-sm text-[#6B6B80]">Complète un module pour commencer à écrire ici.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {recentJournal.map((entry, i) => {
                  const mod = MODULES.find(m => m.id === entry.moduleId)
                  const { label, color } = ratingLabel(entry.rating)
                  return (
                    <div key={i} className="bg-[#16161F] rounded-2xl p-5 border border-[#2A2A38]">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-bold text-[#F0EBF4] text-sm">{mod ? mod.title : `Module ${entry.moduleId}`}</p>
                          <p className="text-xs text-[#6B6B80]">{formatDate(entry.date)}</p>
                        </div>
                        <span className={`text-base font-black ${color}`}>{label}</span>
                      </div>
                      {entry.note && (
                        <p className="text-sm text-[#9090A8] mt-2 leading-relaxed">{entry.note}</p>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  )
}
