import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useProgress } from '@/hooks/useProgress'
import { MODULES } from '@/data/modules'
import type {
  Module as ModuleType,
  ReadingExerciseData,
  QuizExerciseData,
  JournalExerciseData,
  BreathingExerciseData,
  AppliedTensionExerciseData,
  ColorExposureExerciseData,
  ShapeExposureExerciseData,
  ImageExposureExerciseData,
  ScenarioExerciseData,
} from '@/types'

// ─── Shared types ─────────────────────────────────────────────────────────────

interface FooterAction {
  label: string
  disabled: boolean
  onClick: (() => void) | null
}

interface BaseExerciseProps {
  onNext: () => void
  setFooterAction: (action: FooterAction | null) => void
}

// ─── Spinner ──────────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <div className="h-dvh bg-white flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-4 border-[#E53935]/30 border-t-[#E53935] animate-spin" />
    </div>
  )
}

// ─── CompletionScreen ─────────────────────────────────────────────────────────

function CompletionScreen({ module: mod, totalXP, onDashboard }: { module: ModuleType; totalXP: number; onDashboard: () => void }) {
  return (
    <div className="h-dvh flex items-center justify-center px-6" style={{background:'#FFFCF7', color:'#111', fontFamily:"'Plus Jakarta Sans', sans-serif"}}>
      <div className="text-center" style={{maxWidth:'360px', width:'100%'}}>
        <div style={{fontSize:'3.5rem', marginBottom:'16px'}}>{mod.badge.icon}</div>
        <h1 style={{fontSize:'2rem', fontWeight:800, letterSpacing:'-0.04em', marginBottom:'8px'}}>Module terminé !</h1>
        <p style={{color:'#888', marginBottom:'4px', fontSize:'0.85rem'}}>Badge obtenu</p>
        <p style={{fontSize:'1.1rem', fontWeight:800, color:'#E53935', marginBottom:'32px'}}>{mod.badge.label}</p>
        <div style={{padding:'20px', background:'#fff', border:'1px solid #111', boxShadow:'4px 4px 0 #111', marginBottom:'24px'}}>
          <p style={{fontSize:'0.78rem', color:'#888'}}>+{mod.xpBonus} XP ce module</p>
          <p style={{fontSize:'2.5rem', fontWeight:800, marginTop:'4px', letterSpacing:'-0.04em'}}>
            {totalXP} <span style={{fontSize:'0.85rem', fontWeight:400, color:'#888'}}>XP total</span>
          </p>
        </div>
        <button
          onClick={onDashboard}
          style={{width:'100%', padding:'14px 20px', background:'#E53935', color:'#fff', border:'none', borderRadius:0, fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'0.82rem', fontWeight:700, letterSpacing:'0.04em', textTransform:'uppercase', cursor:'pointer'}}
        >
          Retour au tableau de bord
        </button>
      </div>
    </div>
  )
}

// ─── ReadingExercise ──────────────────────────────────────────────────────────

function ReadingExercise({ title, content, keyPoints, onNext, setFooterAction }: ReadingExerciseData & BaseExerciseProps) {
  const paragraphs = content.split('\n\n')

  useEffect(() => {
    setFooterAction({ label: "J'ai compris →", disabled: false, onClick: onNext })
  }, [onNext, setFooterAction])

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-3xl font-black leading-tight">{title}</h2>
      <div className="flex flex-col gap-6">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-[#222222] text-lg leading-relaxed">{p}</p>
        ))}
      </div>
      {keyPoints && keyPoints.length > 0 && (
        <div style={{padding:'20px 24px', background:'#fff0f0', border:'1px solid #E53935', boxShadow:'3px 3px 0 #E53935'}}>
          <p style={{fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'#E53935', marginBottom:'16px'}}>Points clés</p>
          <ul style={{display:'flex', flexDirection:'column', gap:'10px', listStyle:'none', padding:0, margin:0}}>
            {keyPoints.map((kp, i) => (
              <li key={i} style={{display:'flex', alignItems:'flex-start', gap:'10px', fontSize:'0.95rem', color:'#111'}}>
                <span style={{color:'#E53935', flexShrink:0, fontWeight:700}}>✓</span>
                <span>{kp}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// ─── BreathingExercise ────────────────────────────────────────────────────────

type BreathingPhase = 'idle' | 'inhale' | 'hold' | 'exhale' | 'done'

function BreathingExercise({ technique, title, description, onNext, setFooterAction }: BreathingExerciseData & BaseExerciseProps) {
  const [phase, setPhase]           = useState<BreathingPhase>('idle')
  const [cycleCount, setCycleCount] = useState(0)
  const [scale, setScale]           = useState(1)
  const mountedRef   = useRef(true)
  const timeoutsRef  = useRef<ReturnType<typeof setTimeout>[]>([])

  function scheduleTimeout(fn: () => void, delay: number) {
    const id = setTimeout(fn, delay)
    timeoutsRef.current.push(id)
    return id
  }

  function clearAllTimeouts() {
    timeoutsRef.current.forEach(id => clearTimeout(id))
    timeoutsRef.current = []
  }

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      clearAllTimeouts()
    }
  }, [])

  useEffect(() => {
    if (phase === 'done') {
      setFooterAction({ label: 'Continuer →', disabled: false, onClick: onNext })
    } else {
      setFooterAction(null)
    }
  }, [phase, onNext, setFooterAction])

  const TOTAL_CYCLES = 3

  function runCycle(currentCycle: number) {
    if (!mountedRef.current) return
    if (technique === 'cardiac') {
      setPhase('inhale'); setScale(1.5)
      scheduleTimeout(() => {
        if (!mountedRef.current) return
        setPhase('exhale'); setScale(0.8)
        scheduleTimeout(() => {
          if (!mountedRef.current) return
          const next = currentCycle + 1
          setCycleCount(next)
          if (next < TOTAL_CYCLES) runCycle(next)
          else { setPhase('done'); setScale(1) }
        }, 5000)
      }, 5000)
    } else {
      setPhase('inhale'); setScale(1.5)
      scheduleTimeout(() => {
        if (!mountedRef.current) return
        setPhase('hold'); setScale(1.5)
        scheduleTimeout(() => {
          if (!mountedRef.current) return
          setPhase('exhale'); setScale(0.8)
          scheduleTimeout(() => {
            if (!mountedRef.current) return
            const next = currentCycle + 1
            setCycleCount(next)
            if (next < TOTAL_CYCLES) runCycle(next)
            else { setPhase('done'); setScale(1) }
          }, 8000)
        }, 7000)
      }, 4000)
    }
  }

  const phaseLabels: Record<BreathingPhase, string> = {
    idle: '', inhale: 'Inspire…', hold: 'Retiens…', exhale: 'Expire…', done: 'Bien joué ✓',
  }
  const phaseDuration = technique === 'cardiac'
    ? { inhale: 5000, hold: 0, exhale: 5000 }
    : { inhale: 4000, hold: 7000, exhale: 8000 }
  const transitionDuration =
    phase === 'inhale' ? phaseDuration.inhale :
    phase === 'hold'   ? 0 :
    phase === 'exhale' ? phaseDuration.exhale : 500

  return (
    <div className="flex flex-col items-center gap-8 py-4">
      <div className="text-center">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-sm text-[#888888] max-w-xs">{description}</p>
      </div>
      <div
        className="w-44 h-44 rounded-full border-4 border-[#E53935] flex items-center justify-center"
        style={{
          transform: `scale(${scale})`,
          transition: `transform ${transitionDuration}ms ease-in-out`,
          backgroundColor: phase === 'inhale' ? 'rgba(229,57,53,0.12)' : 'transparent',
        }}
      >
        <span className="text-sm text-[#0A0A0A] font-medium text-center px-4">{phaseLabels[phase]}</span>
      </div>
      {phase !== 'idle' && phase !== 'done' && (
        <p className="text-[#888888] text-sm">Cycle {cycleCount + 1} / {TOTAL_CYCLES}</p>
      )}
      {phase === 'done' && (
        <p className="text-[#276749] text-sm font-semibold">{TOTAL_CYCLES} / {TOTAL_CYCLES} cycles terminés</p>
      )}
      {phase === 'idle' && (
        <button
          onClick={() => runCycle(0)}
          style={{padding:'12px 32px', background:'#E53935', color:'#fff', border:'none', borderRadius:0, fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'0.82rem', fontWeight:700, letterSpacing:'0.04em', textTransform:'uppercase', cursor:'pointer'}}
        >
          Commencer
        </button>
      )}
    </div>
  )
}

// ─── AppliedTensionExercise ───────────────────────────────────────────────────

type TensionPhase = 'idle' | 'tense' | 'release' | 'rest' | 'done'

function AppliedTensionExercise({ title, muscleGroup, instruction, rounds, onNext, setFooterAction }: AppliedTensionExerciseData & BaseExerciseProps) {
  const [phase, setPhase]               = useState<TensionPhase>('idle')
  const [countdown, setCountdown]       = useState(0)
  const [currentRound, setCurrentRound] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  function clearTimer() {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null }
  }

  useEffect(() => { return () => clearTimer() }, [])

  useEffect(() => {
    if (phase === 'done') {
      setFooterAction({ label: 'Continuer →', disabled: false, onClick: onNext })
    } else {
      setFooterAction(null)
    }
  }, [phase, onNext, setFooterAction])

  function startRound(roundIndex: number) {
    setCurrentRound(roundIndex)
    setPhase('tense')
    setCountdown(10)
    let count = 10
    intervalRef.current = setInterval(() => {
      count--
      if (count <= 0) {
        clearTimer()
        setPhase('release')
        setCountdown(0)
        setTimeout(() => {
          setPhase('rest')
          let restCount = 5
          setCountdown(restCount)
          intervalRef.current = setInterval(() => {
            restCount--
            setCountdown(restCount)
            if (restCount <= 0) {
              clearTimer()
              const next = roundIndex + 1
              if (next >= rounds) setPhase('done')
              else startRound(next)
            }
          }, 1000)
        }, 3000)
      } else {
        setCountdown(count)
      }
    }, 1000)
  }

  const phaseConfig: Record<TensionPhase, { label: string; color: string; bg: string }> = {
    idle:    { label: '',          color: 'text-[#0A0A0A]',  bg: 'bg-[#F8F6F2]' },
    tense:   { label: 'TENSEZ',    color: 'text-[#E53935]',  bg: 'bg-[#E53935]/10' },
    release: { label: 'RELÂCHEZ',  color: 'text-[#888888]',  bg: 'bg-[#F8F6F2]' },
    rest:    { label: 'REPOS',     color: 'text-[#AAAAAA]',  bg: 'bg-[#F8F6F2]' },
    done:    { label: '',          color: '',                 bg: 'bg-[#F8F6F2]' },
  }
  const config = phaseConfig[phase]

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-black mb-1">{title}</h2>
        <p className="text-sm text-[#888888]">Groupe musculaire : {muscleGroup}</p>
      </div>
      <div style={{padding:'16px 20px', border:'1px solid #ddd', fontSize:'0.88rem', color:'#333', lineHeight:1.7, background:'#FFFCF7'}}>
        {instruction}
      </div>
      {phase !== 'idle' && phase !== 'done' && (
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'12px', padding:'32px', border:'1px solid #111', background: phase === 'tense' ? '#fff0f0' : '#FFFCF7', boxShadow:'4px 4px 0 #111'}}>
          <span style={{fontSize:'1.5rem', fontWeight:800, letterSpacing:'0.1em', color: phase === 'tense' ? '#E53935' : phase === 'rest' ? '#bbb' : '#888'}}>{config.label}</span>
          {(phase === 'tense' || phase === 'rest') && (
            <span style={{fontSize:'4rem', fontWeight:800, color:'#111', letterSpacing:'-0.04em'}}>{countdown}</span>
          )}
          {phase === 'release' && <span style={{fontSize:'0.9rem', color:'#888'}}>Relâchez progressivement…</span>}
          <p style={{fontSize:'0.75rem', color:'#bbb'}}>Série {currentRound + 1} / {rounds}</p>
        </div>
      )}
      {phase === 'idle' && (
        <button
          onClick={() => startRound(0)}
          style={{width:'100%', padding:'14px 20px', background:'#E53935', color:'#fff', border:'none', borderRadius:0, fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'0.82rem', fontWeight:700, letterSpacing:'0.04em', textTransform:'uppercase', cursor:'pointer'}}
        >
          Commencer les séries
        </button>
      )}
      {phase === 'done' && (
        <div style={{padding:'20px', background:'#f0fff4', border:'1px solid #276749', textAlign:'center'}}>
          <p style={{fontSize:'1rem', fontWeight:700, color:'#276749'}}>Excellent travail !</p>
          <p style={{fontSize:'0.82rem', color:'#888', marginTop:'4px'}}>{rounds} séries complétées</p>
        </div>
      )}
    </div>
  )
}

// ─── ColorExposureExercise ────────────────────────────────────────────────────

function ColorExposureExercise({ colors, onNext, setFooterAction }: ColorExposureExerciseData & BaseExerciseProps) {
  const [index, setIndex] = useState(0)
  const isLast = index === colors.length - 1

  useEffect(() => {
    const onClick = isLast ? onNext : () => setIndex(i => i + 1)
    setFooterAction({ label: isLast ? 'Terminer →' : 'Couleur suivante →', disabled: false, onClick })
  }, [index, isLast, onNext, setFooterAction])

  const current = colors[index]

  return (
    <div className="flex flex-col gap-6">
      <div style={{display:'flex', alignItems:'center', gap:'8px', padding:'10px 14px', background:'#fff0f0', border:'1px solid #E53935', fontSize:'0.82rem', color:'#E53935'}}>
        <span>💪</span>
        <span>Tension musculaire active — contracte bras et jambes</span>
      </div>
      <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'16px', padding:'16px 0'}}>
        <div
          style={{ width:'240px', height:'240px', backgroundColor: current.hex, transition:'background-color 0.7s ease' }}
        />
        <p className="text-[#888888] text-sm text-center">{current.label}</p>
        <p className="text-xs text-[#AAAAAA]">{index + 1} / {colors.length}</p>
      </div>
    </div>
  )
}

// ─── ShapeExposureExercise ────────────────────────────────────────────────────

function ShapeExposureExercise({ shapes, onNext, setFooterAction }: ShapeExposureExerciseData & BaseExerciseProps) {
  const [index, setIndex] = useState(0)
  const isLast = index === shapes.length - 1

  useEffect(() => {
    const onClick = isLast ? onNext : () => setIndex(i => i + 1)
    setFooterAction({ label: isLast ? 'Terminer →' : 'Forme suivante →', disabled: false, onClick })
  }, [index, isLast, onNext, setFooterAction])

  const current = shapes[index]

  function renderShape(variant: string) {
    switch (variant) {
      case 'circle':   return <circle cx="100" cy="100" r="80" fill="#E53935" opacity="0.85" />
      case 'drop':     return <path d="M100 20 C100 20 30 90 30 130 C30 168 62 190 100 190 C138 190 170 168 170 130 C170 90 100 20 100 20Z" fill="#E53935" opacity="0.85" />
      case 'splatter': return <path d="M100 80 C120 60 150 70 145 95 C155 90 165 105 150 115 C160 125 150 145 135 140 C140 155 120 160 110 148 C105 162 85 160 82 145 C68 152 55 138 65 124 C50 118 48 98 65 95 C55 78 72 62 85 72 C85 55 108 50 100 80Z" fill="#E53935" opacity="0.85" />
      case 'complex':  return (
        <>
          <ellipse cx="100" cy="90" rx="65" ry="50" fill="#E53935" opacity="0.7" />
          <circle cx="140" cy="130" r="30" fill="#AA1122" opacity="0.8" />
          <circle cx="70" cy="135" r="22" fill="#E53935" opacity="0.75" />
          <path d="M95 140 Q100 170 105 140" stroke="#AA1122" strokeWidth="8" fill="none" opacity="0.9" />
        </>
      )
      default: return null
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div style={{display:'flex', alignItems:'center', gap:'8px', padding:'10px 14px', background:'#fff0f0', border:'1px solid #E53935', fontSize:'0.82rem', color:'#E53935'}}>
        <span>💪</span>
        <span>Appliquer la tension — contracte bras et jambes</span>
      </div>
      <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'16px', padding:'16px 0'}}>
        <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto">
          {renderShape(current.variant)}
        </svg>
        <p className="text-[#888888] text-sm text-center">{current.label}</p>
        <p className="text-xs text-[#AAAAAA]">{index + 1} / {shapes.length}</p>
      </div>
    </div>
  )
}

// ─── ImageExposureExercise ────────────────────────────────────────────────────

function ImageExposureExercise({ level, title, description, onNext, setFooterAction }: ImageExposureExerciseData & BaseExerciseProps) {
  useEffect(() => {
    setFooterAction({ label: "J'ai regardé, continuer →", disabled: false, onClick: onNext })
  }, [onNext, setFooterAction])

  function renderSVG() {
    if (level === 1) return (
      <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto">
        <defs>
          <radialGradient id="g1" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#E53935" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#440011" stopOpacity="0.1" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="90" fill="url(#g1)" />
        <path d="M60 80 Q100 40 140 80 Q160 110 140 140 Q100 170 60 140 Q40 110 60 80Z" fill="#E53935" opacity="0.4" />
      </svg>
    )
    if (level === 2) return (
      <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto">
        <line x1="100" y1="20" x2="100" y2="180" stroke="#E53935" strokeWidth="8" strokeLinecap="round" />
        <ellipse cx="100" cy="100" rx="40" ry="12" fill="none" stroke="#E53935" strokeWidth="3" opacity="0.6" />
        <circle cx="100" cy="60" r="8" fill="#E53935" opacity="0.8" />
        <circle cx="100" cy="140" r="8" fill="#E53935" opacity="0.8" />
        <path d="M80 80 Q60 100 80 120" stroke="#AA1122" strokeWidth="4" fill="none" />
        <path d="M120 80 Q140 100 120 120" stroke="#AA1122" strokeWidth="4" fill="none" />
      </svg>
    )
    if (level === 3) return (
      <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto">
        <rect x="20" y="60" width="160" height="80" rx="8" fill="#F0EDE8" stroke="#E8E6E0" strokeWidth="2" />
        <ellipse cx="100" cy="100" rx="55" ry="25" fill="#8B1A1A" opacity="0.9" />
        <ellipse cx="100" cy="100" rx="40" ry="18" fill="#E53935" opacity="0.8" />
        <circle cx="85" cy="95" r="5" fill="#FF4455" opacity="0.9" />
        <circle cx="115" cy="105" r="3" fill="#FF4455" opacity="0.7" />
        <path d="M50 100 Q70 85 90 100 Q110 115 130 100 Q150 85 160 100" stroke="#FF6677" strokeWidth="2.5" fill="none" opacity="0.8" />
      </svg>
    )
    return null
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-black mb-1">{title}</h2>
        <p className="text-sm text-[#888888]">{description}</p>
      </div>
      <div style={{display:'flex', alignItems:'center', gap:'8px', padding:'10px 14px', background:'#fff0f0', border:'1px solid #E53935', fontSize:'0.82rem', color:'#E53935'}}>
        <span>💪</span>
        <span>Tension avant de regarder — contracte tes muscles maintenant</span>
      </div>
      <div style={{display:'flex', flexDirection:'column', alignItems:'center', padding:'32px 0', background:'#FFFCF7', border:'1px solid #ddd'}}>
        {renderSVG()}
      </div>
    </div>
  )
}

// ─── QuizExercise ─────────────────────────────────────────────────────────────

function QuizExercise({ questions, onNext, setFooterAction }: QuizExerciseData & BaseExerciseProps) {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selected, setSelected]           = useState<number | null>(null)
  const [score, setScore]                 = useState(0)
  const [showScore, setShowScore]         = useState(false)

  const current = questions[questionIndex]
  const isLast  = questionIndex === questions.length - 1

  const handleNext = useCallback(() => {
    if (isLast) setShowScore(true)
    else { setQuestionIndex(i => i + 1); setSelected(null) }
  }, [isLast])

  useEffect(() => {
    if (showScore) {
      setFooterAction({ label: 'Terminer le quiz →', disabled: false, onClick: onNext })
    } else if (selected !== null) {
      setFooterAction({ label: isLast ? 'Voir les résultats →' : 'Question suivante →', disabled: false, onClick: handleNext })
    } else {
      setFooterAction({ label: 'Choisir une réponse…', disabled: true, onClick: null })
    }
  }, [selected, showScore, isLast, handleNext, onNext, setFooterAction])

  function handleSelect(optionIndex: number) {
    if (selected !== null) return
    setSelected(optionIndex)
    if (optionIndex === current.correct) setScore(s => s + 1)
  }

  if (showScore) {
    return (
      <div style={{display:'flex', flexDirection:'column', gap:'24px'}}>
        <div style={{textAlign:'center', padding:'40px', background:'#fff', border:'1px solid #111', boxShadow:'4px 4px 0 #111'}}>
          <p style={{fontSize:'4rem', fontWeight:800, color:'#E53935', marginBottom:'8px', letterSpacing:'-0.04em'}}>{score} / {questions.length}</p>
          <p style={{color:'#888', fontSize:'0.85rem'}}>bonne{score > 1 ? 's' : ''} réponse{score > 1 ? 's' : ''}</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{display:'flex', flexDirection:'column', gap:'20px'}}>
      <div>
        <p style={{fontSize:'0.65rem', color:'#bbb', marginBottom:'8px', letterSpacing:'0.1em', textTransform:'uppercase'}}>Question {questionIndex + 1} / {questions.length}</p>
        <h2 style={{fontSize:'1.1rem', fontWeight:700, color:'#111'}}>{current.question}</h2>
      </div>
      <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
        {current.options.map((option, i) => {
          let bg = '#FFFCF7', border = '1px solid #ddd', color = '#111'
          if (selected !== null) {
            if (i === current.correct)    { bg = '#f0fff4'; border = '1px solid #276749'; color = '#276749' }
            else if (i === selected)      { bg = '#fff0f0'; border = '1px solid #E53935'; color = '#c62828' }
            else                          { bg = '#f5f5f5'; border = '1px solid #ddd'; color = '#bbb' }
          }
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              style={{width:'100%', textAlign:'left', padding:'12px 16px', border, background:bg, color, fontSize:'0.88rem', cursor:'pointer', fontFamily:"'Plus Jakarta Sans', sans-serif", borderRadius:0, transition:'border-color 0.15s'}}
            >
              {option}
            </button>
          )
        })}
      </div>
      {selected !== null && (
        <div style={{padding:'14px 16px', background:'#FFFCF7', border:'1px solid #ddd', fontSize:'0.82rem', color:'#444'}}>
          <span style={{fontWeight:700, color:'#888'}}>Explication : </span>
          {current.explanation}
        </div>
      )}
    </div>
  )
}

// ─── JournalExercise ──────────────────────────────────────────────────────────

interface JournalExerciseProps extends JournalExerciseData, BaseExerciseProps {
  moduleId: number
  onSaveJournal: (moduleId: number, rating: number, note?: string) => Promise<unknown>
}

function JournalExercise({ prompt, moduleId, onNext, setFooterAction, onSaveJournal }: JournalExerciseProps) {
  const [rating, setRating] = useState<number | null>(null)
  const [note, setNote]     = useState('')

  useEffect(() => {
    if (rating !== null) {
      setFooterAction({
        label: 'Enregistrer →',
        disabled: false,
        onClick: () => {
          onSaveJournal(moduleId, rating, note)
            .then(onNext)
            .catch((err: Error) => {
              console.error('[Journal] Erreur lors de l\'enregistrement :', err)
            })
        },
      })
    } else {
      setFooterAction({ label: 'Sélectionne une note pour continuer', disabled: true, onClick: null })
    }
  }, [rating, note, moduleId, onNext, setFooterAction, onSaveJournal])

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-black mb-2">Journal</h2>
        <p className="text-[#333333] leading-relaxed">{prompt}</p>
      </div>
      <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
        <p style={{fontSize:'0.82rem', color:'#888'}}>Comment te sens-tu ?</p>
        <div style={{display:'flex', gap:'8px', flexWrap:'wrap'}}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(r => (
            <button
              key={r}
              onClick={() => setRating(r)}
              style={{
                width:'40px', height:'40px',
                border: rating === r ? '1px solid #E53935' : '1px solid #ddd',
                background: rating === r ? '#E53935' : '#fff',
                color: rating === r ? '#fff' : '#888',
                fontWeight:700, fontSize:'0.82rem',
                cursor:'pointer', borderRadius:0,
                fontFamily:"'Plus Jakarta Sans', sans-serif",
                transform: rating === r ? 'scale(1.1)' : 'scale(1)',
                transition:'all 0.15s',
              }}
            >
              {r}
            </button>
          ))}
        </div>
        <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.7rem', color:'#bbb'}}>
          <span>Très anxieux·se</span>
          <span>Très serein·e</span>
        </div>
      </div>
      <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
        <label style={{fontSize:'0.78rem', color:'#888'}}>Ajoute une note (optionnel)</label>
        <textarea
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder="Décris ce que tu as ressenti…"
          rows={3}
          style={{width:'100%', background:'#fff', border:'1px solid #ddd', borderRadius:0, padding:'12px 16px', fontSize:'0.85rem', color:'#111', resize:'none', outline:'none', fontFamily:"'Plus Jakarta Sans', sans-serif", boxSizing:'border-box'}}
          onFocus={e => { e.currentTarget.style.borderColor = '#E53935'; e.currentTarget.style.boxShadow = '3px 3px 0 #E53935' }}
          onBlur={e => { e.currentTarget.style.borderColor = '#ddd'; e.currentTarget.style.boxShadow = 'none' }}
        />
      </div>
    </div>
  )
}

// ─── ScenarioExercise ─────────────────────────────────────────────────────────

function ScenarioExercise({ title, situation, steps, onNext, setFooterAction }: ScenarioExerciseData & BaseExerciseProps) {
  const [stepIndex, setStepIndex] = useState(0)
  const isLast = stepIndex === steps.length - 1

  useEffect(() => {
    const onClick = isLast ? onNext : () => setStepIndex(i => i + 1)
    setFooterAction({ label: isLast ? 'Terminer →' : 'Étape suivante →', disabled: false, onClick })
  }, [stepIndex, isLast, onNext, setFooterAction])

  const current = steps[stepIndex]

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 style={{fontSize:'1.3rem', fontWeight:800, letterSpacing:'-0.03em', marginBottom:'12px'}}>{title}</h2>
        <div style={{padding:'14px 16px', background:'#FFFCF7', border:'1px solid #ddd'}}>
          <p style={{fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'#888', marginBottom:'6px'}}>Situation</p>
          <p style={{fontSize:'0.88rem', color:'#333', lineHeight:1.7}}>{situation}</p>
        </div>
      </div>
      <p style={{fontSize:'0.65rem', color:'#bbb', letterSpacing:'0.1em', textTransform:'uppercase'}}>Étape {stepIndex + 1} / {steps.length}</p>
      <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
        <div style={{padding:'14px 16px', background:'#FFFCF7', border:'1px solid #ddd'}}>
          <p style={{fontSize:'0.88rem', color:'#111', lineHeight:1.7}}>{current.instruction}</p>
        </div>
        <div style={{padding:'14px 16px', background:'#fff0f0', border:'1px solid #E53935'}}>
          <p style={{fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'#E53935', marginBottom:'6px'}}>Conseil</p>
          <p style={{fontSize:'0.88rem', color:'#333', lineHeight:1.7}}>{current.tip}</p>
        </div>
      </div>
    </div>
  )
}

// ─── Main Module Component ────────────────────────────────────────────────────

export default function Module() {
  const { id }       = useParams<{ id: string }>()
  const navigate     = useNavigate()
  const { isModuleUnlocked, completeExercise, completeModule, addJournalEntry } = useProgress()

  const [exerciseIndex, setExerciseIndex] = useState(0)
  const [completed, setCompleted]         = useState(false)
  const [earnedXP, setEarnedXP]           = useState(0)
  const [footerAction, setFooterAction]   = useState<FooterAction | null>(null)
  const [isProcessing, setIsProcessing]   = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const moduleId   = id ? parseInt(id, 10) : NaN
  const moduleData = !isNaN(moduleId) ? MODULES.find(m => m.id === moduleId) : undefined

  // Guard : id invalide, module inexistant ou verrouillé
  useEffect(() => {
    if (isNaN(moduleId) || !moduleData || !isModuleUnlocked(moduleId)) {
      navigate('/dashboard')
    }
  }, [moduleId, moduleData, isModuleUnlocked, navigate])

  // Reset footer + scroll quand l'exercice change
  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0
  }, [exerciseIndex])

  const handleExerciseComplete = useCallback(async () => {
    if (!moduleData || isProcessing) return
    setIsProcessing(true)
    try {
      await completeExercise(moduleId, exerciseIndex)
      if (exerciseIndex + 1 >= moduleData.exercises.length) {
        const next = await completeModule(moduleId, moduleData.xpBonus)
        setEarnedXP(next.xp)
        setCompleted(true)
      } else {
        setExerciseIndex(i => i + 1)
      }
    } finally {
      setIsProcessing(false)
    }
  }, [moduleId, exerciseIndex, moduleData, isProcessing, completeExercise, completeModule])

  if (!moduleData) return <Spinner />

  if (completed) {
    return (
      <CompletionScreen
        module={moduleData}
        totalXP={earnedXP}
        onDashboard={() => navigate('/dashboard')}
      />
    )
  }

  const exercise      = moduleData.exercises[exerciseIndex]
  const progressPct   = Math.round((exerciseIndex / moduleData.exercises.length) * 100)
  const baseProps     = { onNext: handleExerciseComplete, setFooterAction }

  return (
    <div className="h-dvh flex flex-col" style={{background:'#FFFCF7', color:'#111', fontFamily:"'Plus Jakarta Sans', sans-serif"}}>

      {/* Header */}
      <div className="sticky top-0 z-10" style={{background:'#FFFCF7', borderBottom:'1px solid #111'}}>
        <div style={{maxWidth:'680px', margin:'0 auto', padding:'1rem 3rem'}}>
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => navigate('/dashboard')} style={{fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.04em', textTransform:'uppercase', color:'#999', background:'none', border:'none', cursor:'pointer', padding:0, fontFamily:"'Plus Jakarta Sans', sans-serif"}} onMouseEnter={e=>(e.currentTarget.style.color='#111')} onMouseLeave={e=>(e.currentTarget.style.color='#999')}>← Dashboard</button>
            <span style={{fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.04em', color:'#E53935', background:'#fff0f0', border:'1px solid #E53935', padding:'4px 10px'}}>+50 XP</span>
          </div>
          <p className="mb-3" style={{fontSize:'0.82rem', fontWeight:700, color:'#111'}}>{moduleData.title}</p>
          <div className="flex items-center gap-3">
            <div className="flex-1 overflow-hidden" style={{height:'3px', background:'#e0e0e0'}}>
              <div
                style={{ width: `${progressPct}%`, height:'100%', background:'#E53935', transition:'width 0.5s ease' }}
              />
            </div>
            <span style={{fontSize:'0.72rem', color:'#bbb', flexShrink:0}}>{exerciseIndex + 1} / {moduleData.exercises.length}</span>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div ref={contentRef} className="flex-1 overflow-y-auto" style={{background:'#FFFCF7'}}>
        <div style={{maxWidth:'680px', margin:'0 auto', padding:'2rem 3rem 10rem 3rem'}}>
          {exercise.type === 'reading'         && <ReadingExercise        key={exerciseIndex} {...exercise} {...baseProps} />}
          {exercise.type === 'breathing'       && <BreathingExercise      key={exerciseIndex} {...exercise} {...baseProps} />}
          {exercise.type === 'applied_tension' && <AppliedTensionExercise key={exerciseIndex} {...exercise} {...baseProps} />}
          {exercise.type === 'color_exposure'  && <ColorExposureExercise  key={exerciseIndex} {...exercise} {...baseProps} />}
          {exercise.type === 'shape_exposure'  && <ShapeExposureExercise  key={exerciseIndex} {...exercise} {...baseProps} />}
          {exercise.type === 'image_exposure'  && <ImageExposureExercise  key={exerciseIndex} {...exercise} {...baseProps} />}
          {exercise.type === 'quiz'            && <QuizExercise           key={exerciseIndex} {...exercise} {...baseProps} />}
          {exercise.type === 'journal'         && (
            <JournalExercise
              key={exerciseIndex}
              {...exercise}
              {...baseProps}
              moduleId={moduleId}
              onSaveJournal={addJournalEntry}
            />
          )}
          {exercise.type === 'scenario'        && <ScenarioExercise key={exerciseIndex} {...(exercise as ScenarioExerciseData)} {...baseProps} />}
        </div>
      </div>

      {/* Fixed footer button */}
      <div className="fixed bottom-0 left-0 right-0 z-10" style={{background:'#FFFCF7', borderTop:'1px solid #111', padding:'1rem 3rem 1.5rem'}}>
        <div style={{maxWidth:'680px', margin:'0 auto'}}>
          {footerAction ? (
            <button
              onClick={footerAction.disabled ? undefined : (footerAction.onClick ?? undefined)}
              disabled={footerAction.disabled}
              style={{
                width:'100%',
                padding:'14px 20px',
                fontFamily:"'Plus Jakarta Sans', sans-serif",
                fontSize:'0.82rem',
                fontWeight:700,
                letterSpacing:'0.04em',
                textTransform:'uppercase',
                border:'none',
                borderRadius:0,
                cursor: footerAction.disabled ? 'not-allowed' : 'pointer',
                background: footerAction.disabled ? '#eee' : '#E53935',
                color: footerAction.disabled ? '#aaa' : '#fff',
                transition:'background 0.15s',
              }}
            >
              {footerAction.label}
            </button>
          ) : (
            <div style={{padding:'0.9rem 1.2rem', background:'#eee'}} />
          )}
        </div>
      </div>

    </div>
  )
}
