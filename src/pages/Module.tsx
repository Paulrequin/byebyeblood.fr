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
    <div className="h-dvh bg-white text-[#0A0A0A] flex items-center justify-center px-6">
      <div className="text-center max-w-sm w-full">
        <div className="text-6xl mb-4">{mod.badge.icon}</div>
        <h1 className="text-3xl font-black mb-2">Module terminé !</h1>
        <p className="text-[#888888] mb-1">Badge obtenu</p>
        <p className="text-xl font-bold text-[#E53935] mb-5">{mod.badge.label}</p>
        <div className="p-5 rounded-2xl bg-[#F8F6F2] border border-[#E8E6E0] mb-8">
          <p className="text-sm text-[#888888]">+{mod.xpBonus} XP ce module</p>
          <p className="text-3xl font-black mt-1">
            {totalXP} <span className="text-sm font-normal text-[#888888]">XP total</span>
          </p>
        </div>
        <button
          onClick={onDashboard}
          className="w-full py-4 bg-[#E53935] hover:bg-[#C62828] text-white font-bold rounded-xl transition-colors"
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
        <div className="p-6 rounded-2xl bg-[#fff5f5] border-2 border-[#E53935]/20">
          <p className="text-sm font-bold uppercase tracking-wider text-[#E53935] mb-4">Points clés</p>
          <ul className="flex flex-col gap-3">
            {keyPoints.map((kp, i) => (
              <li key={i} className="flex items-start gap-3 text-base text-[#1a1a1a]">
                <span className="text-[#E53935] mt-0.5 flex-shrink-0 font-bold">✓</span>
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
          className="px-8 py-3 bg-[#E53935] hover:bg-[#C62828] text-white font-semibold rounded-xl transition-colors"
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
      <div className={`p-5 rounded-2xl border border-[#E8E6E0] text-sm text-[#333333] leading-relaxed ${config.bg}`}>
        {instruction}
      </div>
      {phase !== 'idle' && phase !== 'done' && (
        <div className={`flex flex-col items-center gap-3 p-8 rounded-2xl border border-[#E8E6E0] ${config.bg}`}>
          <span className={`text-2xl font-black tracking-widest ${config.color}`}>{config.label}</span>
          {(phase === 'tense' || phase === 'rest') && (
            <span className="text-6xl font-black text-[#0A0A0A]">{countdown}</span>
          )}
          {phase === 'release' && <span className="text-base text-[#888888]">Relâchez progressivement…</span>}
          <p className="text-sm text-[#AAAAAA]">Série {currentRound + 1} / {rounds}</p>
        </div>
      )}
      {phase === 'idle' && (
        <button
          onClick={() => startRound(0)}
          className="w-full py-3 bg-[#E53935] hover:bg-[#C62828] text-white font-semibold rounded-xl transition-colors"
        >
          Commencer les séries
        </button>
      )}
      {phase === 'done' && (
        <div className="p-5 rounded-2xl bg-[#F0FFF4] border border-[#9AE6B4] text-center">
          <p className="text-lg font-bold text-[#276749]">Excellent travail !</p>
          <p className="text-sm text-[#888888] mt-1">{rounds} séries complétées</p>
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
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#E53935]/10 border border-[#E53935]/20 text-sm text-[#E53935]">
        <span>💪</span>
        <span>Tension musculaire active — contracte bras et jambes</span>
      </div>
      <div className="flex flex-col items-center gap-4 py-4">
        <div
          className="w-64 h-64 rounded-3xl mx-auto transition-all duration-700"
          style={{ backgroundColor: current.hex }}
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
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#E53935]/10 border border-[#E53935]/20 text-sm text-[#E53935]">
        <span>💪</span>
        <span>Appliquer la tension — contracte bras et jambes</span>
      </div>
      <div className="flex flex-col items-center gap-4 py-4">
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
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#E53935]/10 border border-[#E53935]/20 text-sm text-[#E53935]">
        <span>💪</span>
        <span>Tension avant de regarder — contracte tes muscles maintenant</span>
      </div>
      <div className="flex flex-col items-center py-6 bg-[#F8F6F2] rounded-2xl border border-[#E8E6E0]">
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

  function handleNext() {
    if (isLast) setShowScore(true)
    else { setQuestionIndex(i => i + 1); setSelected(null) }
  }

  useEffect(() => {
    if (showScore) {
      setFooterAction({ label: 'Terminer le quiz →', disabled: false, onClick: onNext })
    } else if (selected !== null) {
      setFooterAction({ label: isLast ? 'Voir les résultats →' : 'Question suivante →', disabled: false, onClick: handleNext })
    } else {
      setFooterAction({ label: 'Choisir une réponse…', disabled: true, onClick: null })
    }
  // handleNext est recréé dans le scope — dépendances explicites couvrent tous les cas
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, showScore, isLast, questionIndex, onNext, setFooterAction])

  function handleSelect(optionIndex: number) {
    if (selected !== null) return
    setSelected(optionIndex)
    if (optionIndex === current.correct) setScore(s => s + 1)
  }

  if (showScore) {
    return (
      <div className="flex flex-col gap-6">
        <div className="text-center p-10 rounded-2xl bg-[#F8F6F2] border border-[#E8E6E0]">
          <p className="text-6xl font-black text-[#E53935] mb-2">{score} / {questions.length}</p>
          <p className="text-[#888888]">bonne{score > 1 ? 's' : ''} réponse{score > 1 ? 's' : ''}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-xs text-[#AAAAAA] mb-2">Question {questionIndex + 1} / {questions.length}</p>
        <h2 className="text-lg font-bold">{current.question}</h2>
      </div>
      <div className="flex flex-col gap-2">
        {current.options.map((option, i) => {
          let style = 'bg-[#F8F6F2] border-[#E8E6E0] text-[#0A0A0A] hover:border-[#E53935]/50'
          if (selected !== null) {
            if (i === current.correct) style = 'bg-[#F0FFF4] border-[#9AE6B4] text-[#276749]'
            else if (i === selected)   style = 'bg-[#FFF0F0] border-[#FFCCCC] text-[#C62828]'
            else                       style = 'bg-[#F8F6F2] border-[#E8E6E0] text-[#AAAAAA] opacity-60'
          }
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${style}`}
            >
              {option}
            </button>
          )
        })}
      </div>
      {selected !== null && (
        <div className="p-4 rounded-xl bg-[#F8F6F2] border border-[#E8E6E0] text-sm text-[#333333]">
          <span className="font-semibold text-[#888888]">Explication : </span>
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
      <div className="flex flex-col gap-3">
        <p className="text-sm text-[#888888]">Comment te sens-tu ?</p>
        <div className="flex gap-2 flex-wrap">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(r => (
            <button
              key={r}
              onClick={() => setRating(r)}
              className={`w-10 h-10 rounded-xl border font-bold text-sm transition-all ${
                rating === r
                  ? 'bg-[#E53935] border-[#E53935] text-white scale-110'
                  : 'bg-[#F8F6F2] border-[#E8E6E0] text-[#888888] hover:border-[#E53935]/60'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
        <div className="flex justify-between text-xs text-[#AAAAAA]">
          <span>Très anxieux·se</span>
          <span>Très serein·e</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm text-[#888888]">Ajoute une note (optionnel)</label>
        <textarea
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder="Décris ce que tu as ressenti…"
          rows={3}
          className="w-full bg-[#F8F6F2] border border-[#E8E6E0] rounded-xl px-4 py-3 text-sm text-[#0A0A0A] placeholder-[#CCCCCC] resize-none focus:outline-none focus:border-[#E53935]/50"
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
        <h2 className="text-xl font-black mb-2">{title}</h2>
        <div className="p-4 rounded-xl bg-[#F8F6F2] border border-[#E8E6E0]">
          <p className="text-sm font-semibold text-[#888888] mb-1">Situation</p>
          <p className="text-sm text-[#333333] leading-relaxed">{situation}</p>
        </div>
      </div>
      <p className="text-xs text-[#AAAAAA]">Étape {stepIndex + 1} / {steps.length}</p>
      <div className="flex flex-col gap-3">
        <div className="p-4 rounded-xl bg-[#F8F6F2] border border-[#E8E6E0]">
          <p className="text-sm text-[#0A0A0A] leading-relaxed">{current.instruction}</p>
        </div>
        <div className="p-4 rounded-xl border border-[#E53935]/20" style={{ background: 'rgba(229,57,53,0.05)' }}>
          <p className="text-xs font-semibold text-[#E53935] mb-1">Conseil</p>
          <p className="text-sm text-[#333333] leading-relaxed">{current.tip}</p>
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
    <div className="h-dvh bg-white text-[#0A0A0A] flex flex-col">

      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-[#f0f0f0]">
        <div style={{maxWidth:'680px', margin:'0 auto', padding:'1rem 3rem'}}>
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => navigate('/dashboard')} className="text-sm font-medium text-[#888888] hover:text-[#0A0A0A] transition-colors">← Dashboard</button>
            <span className="text-sm font-bold px-3 py-1 rounded-full bg-[#E53935]/10 text-[#E53935]">+50 XP</span>
          </div>
          <p className="text-sm font-semibold text-[#1a1a1a] mb-3">{moduleData.title}</p>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-[#ddd] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#E53935] to-[#FF4455] rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <span className="text-xs text-[#AAAAAA] flex-shrink-0">{exerciseIndex + 1} / {moduleData.exercises.length}</span>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div ref={contentRef} className="flex-1 overflow-y-auto">
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
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#f0f0f0] z-10" style={{padding:'1rem 3rem 1.5rem'}}>
        <div style={{maxWidth:'680px', margin:'0 auto'}}>
          {footerAction ? (
            <button
              onClick={footerAction.disabled ? undefined : (footerAction.onClick ?? undefined)}
              disabled={footerAction.disabled}
              className={`w-full font-bold rounded-2xl transition-all text-base ${
                footerAction.disabled
                  ? 'bg-[#EFEFEC] text-[#AAAAAA] cursor-not-allowed'
                  : 'bg-[#E53935] hover:bg-[#C62828] text-white active:scale-[0.98] shadow-lg'
              }`}
              style={{padding:'0.9rem 1.2rem'}}
            >
              {footerAction.label}
            </button>
          ) : (
            <div style={{padding:'0.9rem 1.2rem'}} className="w-full rounded-2xl bg-[#EFEFEC]" />
          )}
        </div>
      </div>

    </div>
  )
}
