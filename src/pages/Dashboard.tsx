import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/contexts/AuthContext'
import { useProfile } from '@/hooks/useProfile'
import { useProgress } from '@/hooks/useProgress'
import { signOut } from '@/services/authService'
import { startCheckout } from '@/services/profileService'
import { supabase } from '@/lib/supabase'
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
  const location = useLocation()
  const { user } = useAuth()

  const { data: profile, isLoading: profileLoading } = useProfile()
  const { progress, isLoading: progressLoading, isModuleCompleted, isModuleUnlocked } = useProgress()

  const { data: hasDiagnostic, isLoading: diagnosticLoading, isFetching: diagnosticFetching } = useQuery({
    queryKey: ['diagnostic', user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from('diagnostic_results')
        .select('id')
        .eq('user_id', user!.id)
        .limit(1)
      return Array.isArray(data) && data.length > 0
    },
    enabled: !!user && !!profile?.has_access,
  })

  useEffect(() => { window.scrollTo(0, 0) }, [])

  useEffect(() => {
    const fromDiagnostic = location.state?.fromDiagnostic
    if (!diagnosticLoading && !diagnosticFetching && hasDiagnostic === false && profile?.has_access && !fromDiagnostic) {
      navigate('/diagnostic', { replace: true })
    }
  }, [hasDiagnostic, diagnosticLoading, diagnosticFetching, profile, navigate, location.state])

  if (profileLoading || progressLoading || diagnosticLoading || diagnosticFetching) {
    return <div className={s.loading}><div className={s.spinner} /></div>
  }

  const hasAccess = profile?.has_access ?? false

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  async function handleCheckout() {
    await startCheckout()
  }

  const xp             = progress.xp
  const completedCount = progress.completedModules.length
  const journal        = progress.journal
  const badgeIds       = progress.badges

  const currentMod = MODULES.find(mod => {
    const isCompleted = progress.completedModules.includes(mod.id)
    const isUnlocked  = hasAccess ? (mod.id === 1 || progress.completedModules.includes(mod.id - 1)) : mod.id === 1
    return isUnlocked && !isCompleted
  })

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
          <a href="/sources" style={{fontSize:'0.75rem', color:'#A0907A', textDecoration:'none', marginRight:'8px'}} title="Fondements scientifiques">Sciences</a>
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

        {!hasAccess && (
          <div className={s.upsellBanner}>
            <div className={s.upsellText}>
              <span className={s.upsellTitle}>1ʳᵉ séance gratuite débloquée</span>
              <span className={s.upsellSub}>Débloque les {MODULES.length} modules pour 295€ TTC, une seule fois.</span>
            </div>
            <button className={s.upsellBtn} onClick={handleCheckout}>
              Débloquer l'accès complet →
            </button>
          </div>
        )}

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

            {currentMod && (
              <div className={s.heroCard} onClick={() => navigate(`/module/${currentMod.id}`)}>
                <span className={s.heroTag}>
                  <span className={s.heroTagDot} />
                  Module en cours
                </span>
                <h2 className={s.heroTitle}>{currentMod.title}</h2>
                <p className={s.heroSub}>{currentMod.subtitle}</p>
                <div className={s.heroFooter}>
                  <span className={s.heroDuration}>{currentMod.duration} · +{currentMod.xpBonus} XP</span>
                  <button
                    className={s.heroCta}
                    onClick={e => { e.stopPropagation(); navigate(`/module/${currentMod.id}`) }}
                  >
                    Continuer →
                  </button>
                </div>
              </div>
            )}

            {!currentMod && completedCount === MODULES.length && (
              <div style={{display:'flex', flexDirection:'column', gap:'16px', marginBottom:'8px'}}>

                {/* Étape 1 : première prise de sang */}
                <div style={{padding:'28px', background:'#FFF5F0', border:'1.5px solid #EE3D2E', boxShadow:'4px 4px 0 #E7DCC9'}}>
                  <p style={{fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'#EE3D2E', marginBottom:'10px'}}>Prochaine étape</p>
                  <h2 style={{fontSize:'1.3rem', fontWeight:800, letterSpacing:'-0.03em', color:'#1C1714', marginBottom:'8px', lineHeight:1.25}}>Ta première vraie prise de sang</h2>
                  <p style={{fontSize:'0.88rem', color:'#555', lineHeight:1.65, marginBottom:'20px'}}>
                    Le programme est terminé. Les outils sont en toi. Il reste une étape : les utiliser en vrai, dans un vrai laboratoire, avec une vraie aiguille.
                  </p>
                  <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                    {[
                      ['🏥', 'Choisir un petit laboratoire privé de ville', 'Plus calme qu\'un hôpital, le personnel est habitué aux patients anxieux.'],
                      ['📞', 'Appeler à l\'avance', '«J\'ai une phobie du sang, est-ce que je peux m\'allonger ?» Cette demande est connue et accueillie.'],
                      ['💪', 'Commencer la tension musculaire dès la salle d\'attente', 'Pas au moment de l\'aiguille - bien avant, pour maintenir ta pression artérielle stable.'],
                      ['🎧', 'Mettre des écouteurs en attendant', 'Quelque chose de calme ou de familier pour rester ancré·e dans le moment présent.'],
                      ['🔁', 'Si malaise : ce n\'est pas un échec', 'Recommence dans une semaine. La courbe d\'apprentissage n\'est pas une ligne droite.'],
                    ].map(([icon, title, sub]) => (
                      <div key={title} style={{display:'flex', gap:'12px', alignItems:'flex-start', padding:'12px 14px', background:'#FFFDF8', border:'1px solid #E7DCC9'}}>
                        <span style={{fontSize:'1.1rem', flexShrink:0, marginTop:'1px'}}>{icon}</span>
                        <div>
                          <p style={{fontSize:'0.85rem', fontWeight:700, color:'#1C1714', marginBottom:'2px'}}>{title}</p>
                          <p style={{fontSize:'0.78rem', color:'#888', lineHeight:1.5}}>{sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rester actif */}
                <div style={{padding:'24px 28px', background:'#FBF5EA', border:'1.5px solid #1C1714', boxShadow:'4px 4px 0 #E7DCC9'}}>
                  <p style={{fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'#888', marginBottom:'10px'}}>Rester actif</p>
                  <h3 style={{fontSize:'1.1rem', fontWeight:800, letterSpacing:'-0.02em', color:'#1C1714', marginBottom:'16px'}}>Quatre façons de maintenir les acquis</h3>
                  <div style={{display:'flex', flexDirection:'column', gap:'14px'}}>
                    {[
                      {
                        icon: '🩸',
                        title: 'Donner son sang régulièrement',
                        body: 'Le don du sang est l\'exposition d\'entretien la plus complète qui existe : encadrée, planifiée, et au service d\'une valeur (aider les autres). Les études montrent que l\'action engagée en direction d\'une valeur renforce la tolérance à l\'inconfort bien plus qu\'une exposition purement technique. EFS (Établissement Français du Sang) accepte les donneurs tous les 8 semaines (hommes) et 12 semaines (femmes).',
                        tag: 'Öst & Sterner, 1991 - Hayes, ACT',
                      },
                      {
                        icon: '🚑',
                        title: 'Passer le PSC1 (Premiers Secours Civiques)',
                        body: 'Une formation de 7 heures qui inclut des scénarios réels d\'hémorragie avec simulation. Craske et al. (2008) sur l\'apprentissage inhibiteur : les expositions dans des contextes variés généralisent mieux la désensibilisation qu\'un seul type d\'exposition répété. Le PSC1 couvre exactement ce contexte différent - et il te rend utile en situation réelle.',
                        tag: 'Craske et al., 2008',
                      },
                      {
                        icon: '👥',
                        title: 'Accompagner un proche à ses prises de sang',
                        body: 'Rachman (1989) a documenté la vicarious extinction : observer quelqu\'un traverser sereinement une situation anxiogène renforce l\'extinction chez le spectateur. Être la personne qui accompagne, au lieu d\'être accompagnée, inverse le rôle et consolide les acquis.',
                        tag: 'Rachman, 1989',
                      },
                      {
                        icon: '📅',
                        title: 'Une exposition d\'entretien par mois',
                        body: 'Craske, Treanor et al. (2014) : une exposition espacée toutes les 3 à 4 semaines prévient le retour de la peur, documenté chez 20 à 30 % des personnes traitées pour phobie spécifique. Une vidéo du module 8, un scénario relu, un exercice de tension - quelques minutes suffisent.',
                        tag: 'Craske et al., 2014',
                      },
                    ].map(item => (
                      <div key={item.title} style={{display:'flex', gap:'14px', alignItems:'flex-start', padding:'16px', background:'#FFFDF8', border:'1px solid #E7DCC9'}}>
                        <span style={{fontSize:'1.3rem', flexShrink:0, marginTop:'2px'}}>{item.icon}</span>
                        <div style={{flex:1}}>
                          <p style={{fontSize:'0.88rem', fontWeight:700, color:'#1C1714', marginBottom:'4px'}}>{item.title}</p>
                          <p style={{fontSize:'0.78rem', color:'#555', lineHeight:1.6, marginBottom:'6px'}}>{item.body}</p>
                          <p style={{fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', color:'#A0907A'}}>{item.tag}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <a
                    href="/pratique"
                    style={{display:'block', textAlign:'center', marginTop:'18px', padding:'12px', background:'#FBF5EA', border:'1.5px solid #1C1714', borderRadius:8, fontSize:'0.8rem', fontWeight:700, color:'#1C1714', textDecoration:'none'}}
                  >
                    Faire une fiche d'entretien →
                  </a>
                </div>

              </div>
            )}

            <p className={s.modulesSectionTitle}>Tous les modules</p>
            <div className={s.modulesList}>
              {MODULES.map(mod => {
                const isCompleted = isModuleCompleted(mod.id)
                const isUnlocked  = hasAccess ? isModuleUnlocked(mod.id) : mod.id === 1
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
