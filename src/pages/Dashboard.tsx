import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { useProfile } from '@/hooks/useProfile'
import { useProgress } from '@/hooks/useProgress'
import { signOut } from '@/services/authService'
import { MODULES } from '@/data/modules'
import s from './Dashboard.module.css'

const MAX_XP     = MODULES.reduce((sum, m) => sum + m.xpBonus + m.exercises.length * 50, 0)
const ALL_BADGES = MODULES.map(m => m.badge)

function greetingFromCount(count: number): string {
  if (count === 0) return 'Prêt à commencer ton parcours ?'
  if (count <= 2) return 'Tu as fait les premiers pas. Continue !'
  if (count < MODULES.length - 1) return 'Tu progresses vraiment bien.'
  if (count === MODULES.length - 1) return "Tu es presque au bout. Plus qu'un module !"
  return 'Programme terminé. Incroyable ! 🏆'
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
  } catch { return '' }
}

function ratingClass(r: number): string {
  if (r <= 3) return s.ratingBad
  if (r <= 6) return s.ratingMid
  return s.ratingGood
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const { data: profile, isLoading: profileLoading } = useProfile()
  const { progress, isLoading: progressLoading, isModuleCompleted, isModuleUnlocked } = useProgress()

  useEffect(() => { window.scrollTo(0, 0) }, [])

  useEffect(() => {
    if (!profileLoading && profile && !profile.has_access) {
      navigate('/')
    }
  }, [profile, profileLoading, navigate])

  if (profileLoading || progressLoading) {
    return <div className={s.loading}><div className={s.spinner} /></div>
  }

  if (!profile?.has_access) return null

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  const xp             = progress.xp
  const completedCount = progress.completedModules.length
  const journal        = progress.journal
  const badgeIds       = progress.badges

  const xpPercent     = Math.min(100, Math.round((xp / MAX_XP) * 100))
  const recentJournal = [...journal].reverse().slice(0, 5)
  const GENERIC_NAMES = ['dev', 'user', 'admin', 'test', 'null']
  const rawFirstName  = user?.user_metadata?.full_name?.split(' ')[0] ?? user?.email?.split('@')[0] ?? ''
  const firstName     = GENERIC_NAMES.includes(rawFirstName.toLowerCase()) ? '' : rawFirstName
  const userInitial   = firstName?.[0]?.toUpperCase() ?? '?'

  return (
    <div className={s.page}>

      {/* ── NAV ── */}
      <nav className={s.nav}>
        <span className={s.navLogo}>
          Bye Bye <span className={s.navLogoRed}>Blood</span>
        </span>
        <div className={s.navRight}>
          <div className={s.avatar}>{userInitial}</div>
          <button className={s.signOutBtn} onClick={handleSignOut}>Déconnexion</button>
        </div>
      </nav>

      <main className={s.main}>

        <div className={s.greeting}>
          <h1 className={s.greetTitle}>
            Bonjour{firstName ? ` ${firstName}` : ''} 👋
          </h1>
          <p className={s.greetSub}>{greetingFromCount(completedCount)}</p>
        </div>

        <div className={s.layout}>

          {/* ── SIDEBAR ── */}
          <aside className={s.sidebar}>

            <div className={s.statsGrid}>
              <div className={s.statCard}>
                <p className={s.statLabel}>Modules</p>
                <div>
                  <span className={s.statValue}>{completedCount}</span>
                  <span className={s.statDenom}>/ {MODULES.length}</span>
                </div>
              </div>
              <div className={s.statCard}>
                <p className={s.statLabel}>XP total</p>
                <span className={s.statValue}>{xp}</span>
              </div>
            </div>

            <div className={s.card}>
              <div className={s.progressHeader}>
                <span className={s.progressTitle}>Progression</span>
                <span className={s.progressPct}>{xpPercent}%</span>
              </div>
              <div className={s.progressTrack}>
                <div className={s.progressFill} style={{ width: `${xpPercent}%` }} />
              </div>
              <p className={s.progressHint}>
                {xpPercent < 25 ? 'Ton parcours commence ici 🔥' : xpPercent < 75 ? 'Tu avances bien 💪' : 'Presque au sommet 🏆'}
              </p>
            </div>

            <div className={s.card}>
              <div className={s.cardHeader}>
                <span className={s.cardTitle}>Badges</span>
                <span className={s.cardCount}>{badgeIds.length} / {ALL_BADGES.length}</span>
              </div>
              <div className={s.badgeGrid}>
                {ALL_BADGES.map(badge => {
                  const earned = badgeIds.includes(badge.id)
                  return (
                    <div
                      key={badge.id}
                      title={badge.label}
                      className={`${s.badge} ${earned ? s.badgeEarned : s.badgeLocked}`}
                    >
                      {earned && <span className={s.badgeDot} />}
                      <span className={s.badgeIcon}>{badge.icon}</span>
                      <span className={s.badgeLabel}>{badge.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className={s.card}>
              <div className={s.cardHeader}>
                <span className={s.cardTitle}>Journal</span>
                {recentJournal.length > 0 && (
                  <span className={s.cardCount}>{recentJournal.length} entrée{recentJournal.length > 1 ? 's' : ''}</span>
                )}
              </div>
              {recentJournal.length === 0 ? (
                <div className={s.journalEmpty}>
                  <div className={s.journalEmptyIcon}>📓</div>
                  <p className={s.journalEmptyText}>Complète un module pour commencer à écrire ici.</p>
                </div>
              ) : (
                <div className={s.journalList}>
                  {recentJournal.map((entry, i) => {
                    const mod = MODULES.find(m => m.id === entry.moduleId)
                    return (
                      <div key={i} className={s.journalItem}>
                        <div className={s.journalTop}>
                          <p className={s.journalMod}>{mod ? mod.title : `Module ${entry.moduleId}`}</p>
                          <span className={ratingClass(entry.rating)}>{entry.rating}/10</span>
                        </div>
                        <p className={s.journalDate}>{formatDate(entry.date)}</p>
                        {entry.note && <p className={s.journalNote}>{entry.note}</p>}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

          </aside>

          {/* ── MODULES ── */}
          <div className={s.content}>
            <p className={s.modulesSectionTitle}>Modules</p>
            <div className={s.modulesList}>
              {MODULES.map(mod => {
                const isCompleted = isModuleCompleted(mod.id)
                const isUnlocked  = isModuleUnlocked(mod.id)
                const isCurrent   = isUnlocked && !isCompleted

                return (
                  <div
                    key={mod.id}
                    onClick={() => isUnlocked && navigate(`/module/${mod.id}`)}
                    className={[
                      s.moduleCard,
                      isUnlocked   ? s.moduleCardClickable : s.moduleCardLocked,
                      isCurrent    ? s.moduleCardCurrent   : '',
                      isCompleted  ? s.moduleCardDone      : '',
                    ].join(' ')}
                  >
                    <div className={[
                      s.moduleNum,
                      isCurrent   ? s.moduleNumCurrent : '',
                      isCompleted ? s.moduleNumDone    : '',
                    ].join(' ')}>
                      {isCompleted ? '✓' : !isUnlocked ? '🔒' : mod.id}
                    </div>

                    <div className={s.moduleInfo}>
                      <h3 className={`${s.moduleTitle} ${isCurrent ? s.moduleTitleCurrent : ''}`}>
                        {mod.title}
                      </h3>
                      <p className={s.moduleSub}>{mod.subtitle}</p>
                      <div className={s.moduleMeta}>
                        {isCompleted && <span className={s.tagDone}>Terminé ✓</span>}
                        {isCurrent && (
                          <span className={s.tagCurrent}>
                            <span className={s.tagDot} />
                            En cours
                          </span>
                        )}
                        <span className={s.tagDuration}>{mod.duration}</span>
                      </div>
                    </div>

                    <div className={s.moduleActions}>
                      <span className={s.xpBadge}>+{mod.xpBonus} XP</span>
                      {isCurrent && (
                        <button
                          className={s.btnContinue}
                          onClick={e => { e.stopPropagation(); navigate(`/module/${mod.id}`) }}
                        >
                          Continuer →
                        </button>
                      )}
                      {isCompleted && (
                        <button
                          className={s.btnReview}
                          onClick={e => { e.stopPropagation(); navigate(`/module/${mod.id}`) }}
                        >
                          Revoir
                        </button>
                      )}
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
