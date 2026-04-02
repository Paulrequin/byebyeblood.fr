import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { MODULES } from '../data/modules'
import { getProgress, isModuleCompleted, isModuleUnlocked } from '../lib/progress'

const MAX_XP = MODULES.reduce((sum, m) => sum + m.xpBonus + m.exercises.length * 50, 0)
const ALL_BADGES = MODULES.map(m => m.badge)

function greetingFromCount(count) {
  if (count === 0) return 'Prêt à commencer ton parcours ?'
  if (count <= 2) return 'Tu as fait les premiers pas. Continue !'
  if (count < MODULES.length - 1) return 'Tu progresses vraiment bien.'
  if (count === MODULES.length - 1) return "Tu es presque au bout. Plus qu'un module !"
  return 'Programme terminé. Incroyable ! 🏆'
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
      <nav className="sticky top-0 z-10 flex items-center justify-between px-8 py-4 bg-[#0E0E16]/90 backdrop-blur border-b border-[#2A2A38]">
        <span className="text-base font-bold tracking-tight">
          Bye Bye <span className="text-[#CC2233]">Blood</span>
        </span>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#CC2233] flex items-center justify-center text-white text-sm font-bold">
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

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-10 pb-16">

        {/* Greeting */}
        <div className="mb-10">
          <h1 className="text-5xl font-black mb-2 leading-tight">
            Bonjour{firstName ? ` ${firstName}` : ''} 👋
          </h1>
          <p className="text-[#9090A8] text-lg">{greetingFromCount(completedCount)}</p>
        </div>

        {/* Two-column layout */}
        <div className="flex gap-8 items-start flex-col lg:flex-row">

          {/* ── LEFT COLUMN ── */}
          <div className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-6">

            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl p-5 border border-[#2A2A38] bg-[#16161F]">
                <p className="text-xs text-[#9090A8] font-medium mb-2">Modules</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-[#CC2233]">{completedCount}</span>
                  <span className="text-base text-[#3A3A58] font-semibold">/ {MODULES.length}</span>
                </div>
              </div>
              <div className="rounded-2xl p-5 border border-[#2A2A38] bg-[#16161F]">
                <p className="text-xs text-[#9090A8] font-medium mb-2">XP total</p>
                <span className="text-4xl font-black text-[#CC2233]">{xp}</span>
              </div>
            </div>

            {/* Progress */}
            <div className="rounded-2xl p-5 border border-[#2A2A38] bg-[#16161F]">
              <div className="flex justify-between items-center mb-3">
                <p className="text-xs font-semibold text-[#9090A8] uppercase tracking-wider">Progression</p>
                <span className="text-sm font-black text-[#CC2233]">{xpPercent}%</span>
              </div>
              <div className="w-full h-3 bg-[#1E1E2A] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${xpPercent}%`,
                    background: 'linear-gradient(90deg, #CC2233 0%, #FF4455 100%)',
                    boxShadow: xpPercent > 0 ? '0 0 8px #CC2233, 0 0 16px rgba(204,34,51,0.4)' : 'none',
                  }}
                />
              </div>
              <p className="text-xs text-[#6B6B80] mt-2">
                {xpPercent < 25 ? 'Ton parcours commence ici 🔥' : xpPercent < 75 ? 'Tu avances bien 💪' : 'Presque au sommet 🏆'}
              </p>
            </div>

            {/* Badges */}
            <div className="rounded-2xl p-5 border border-[#2A2A38] bg-[#16161F]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-black uppercase tracking-widest text-[#9090A8]">Badges</h2>
                <span className="text-xs text-[#6B6B80]">{badgeIds.length} / {ALL_BADGES.length}</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {ALL_BADGES.map(badge => {
                  const earned = badgeIds.includes(badge.id)
                  return (
                    <div
                      key={badge.id}
                      title={badge.label}
                      className={`relative flex flex-col items-center gap-1.5 py-3 rounded-xl text-center border transition-all ${
                        earned
                          ? 'bg-[#CC2233]/15 border-[#CC2233]/50'
                          : 'bg-[#0E0E16] border-[#2A2A38] opacity-25'
                      }`}
                    >
                      {earned && (
                        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#CC2233]" />
                      )}
                      <span className="text-2xl">{badge.icon}</span>
                      <span className="text-[10px] font-medium leading-tight px-1 text-[#9090A8] line-clamp-2">{badge.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Journal */}
            <div className="rounded-2xl p-5 border border-[#2A2A38] bg-[#16161F]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-black uppercase tracking-widest text-[#9090A8]">Journal</h2>
                {recentJournal.length > 0 && (
                  <span className="text-xs text-[#6B6B80]">{recentJournal.length} entrée{recentJournal.length > 1 ? 's' : ''}</span>
                )}
              </div>
              {recentJournal.length === 0 ? (
                <div className="text-center py-6">
                  <div className="text-3xl mb-2">📓</div>
                  <p className="text-sm text-[#6B6B80]">Complète un module pour commencer à écrire ici.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {recentJournal.map((entry, i) => {
                    const mod = MODULES.find(m => m.id === entry.moduleId)
                    const { label, color } = ratingLabel(entry.rating)
                    return (
                      <div key={i} className="bg-[#0E0E16] rounded-xl p-4 border border-[#2A2A38]">
                        <div className="flex items-start justify-between mb-1">
                          <p className="font-semibold text-[#F0EBF4] text-sm leading-tight">{mod ? mod.title : `Module ${entry.moduleId}`}</p>
                          <span className={`text-sm font-black ml-2 flex-shrink-0 ${color}`}>{label}</span>
                        </div>
                        <p className="text-xs text-[#6B6B80] mb-1">{formatDate(entry.date)}</p>
                        {entry.note && (
                          <p className="text-xs text-[#9090A8] leading-relaxed line-clamp-2">{entry.note}</p>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

          </div>

          {/* ── RIGHT COLUMN : Modules ── */}
          <div className="flex-1 min-w-0">
            <h2 className="text-xs font-black uppercase tracking-widest text-[#9090A8] mb-5">Modules</h2>
            <div className="flex flex-col gap-4">
              {MODULES.map(mod => {
                const isCompleted = isModuleCompleted(mod.id)
                const isUnlocked = isModuleUnlocked(mod.id)
                const isCurrent = isUnlocked && !isCompleted

                return (
                  <div
                    key={mod.id}
                    onClick={() => isUnlocked && navigate(`/module/${mod.id}`)}
                    className={`rounded-2xl border transition-all duration-200 ${
                      !isUnlocked
                        ? 'opacity-35 cursor-not-allowed'
                        : isCurrent
                        ? 'cursor-pointer hover:border-[#CC2233]/60 hover:shadow-lg hover:shadow-[#CC2233]/10'
                        : 'cursor-pointer hover:border-[#4A4A5A]'
                    } ${
                      isCompleted
                        ? 'bg-[#0D1F1A] border-green-900/50'
                        : isCurrent
                        ? 'bg-[#1A1626] border-[#CC2233]/40'
                        : 'bg-[#16161F] border-[#2A2A38]'
                    }`}
                  >
                    <div className="flex items-center gap-5 p-6">
                      {/* Number / status icon */}
                      <div className={`flex-shrink-0 flex items-center justify-center rounded-2xl font-black text-xl w-14 h-14 ${
                        isCompleted
                          ? 'bg-green-900/40 text-green-400'
                          : isCurrent
                          ? 'bg-[#CC2233] text-white'
                          : 'bg-[#1E1E2A] text-[#4A4A5A]'
                      }`}>
                        {isCompleted ? '✓' : !isUnlocked ? '🔒' : mod.id}
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className={`font-bold truncate ${isCurrent ? 'text-xl text-[#F0EBF4]' : 'text-lg text-[#C0BBC8]'}`}>{mod.title}</h3>
                        </div>
                        <p className="text-sm text-[#6B6B80] truncate">{mod.subtitle}</p>
                        <div className="flex items-center gap-2 mt-2">
                          {isCompleted && (
                            <span className="text-xs font-semibold text-green-400 bg-green-900/30 px-2.5 py-0.5 rounded-full">Terminé ✓</span>
                          )}
                          {isCurrent && (
                            <span className="text-xs font-semibold text-[#FF4455] bg-[#CC2233]/10 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4455] animate-pulse inline-block" />
                              En cours
                            </span>
                          )}
                          <span className="text-xs text-[#5A5A70]">{mod.duration}</span>
                        </div>
                      </div>

                      {/* XP + action */}
                      <div className="flex-shrink-0 flex flex-col items-end gap-2">
                        <span className="text-sm font-black text-[#CC2233]">+{mod.xpBonus} XP</span>
                        {isCurrent && (
                          <button
                            onClick={e => { e.stopPropagation(); navigate(`/module/${mod.id}`) }}
                            className="px-4 py-1.5 bg-[#CC2233] hover:bg-[#991122] text-white text-sm font-semibold rounded-lg transition-colors"
                          >
                            Continuer →
                          </button>
                        )}
                        {isCompleted && (
                          <button
                            onClick={e => { e.stopPropagation(); navigate(`/module/${mod.id}`) }}
                            className="px-4 py-1.5 bg-transparent border border-green-700/50 text-green-400 text-sm font-semibold rounded-lg hover:bg-green-900/20 transition-colors"
                          >
                            Revoir
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
