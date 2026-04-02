import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { MODULES } from '../data/modules'
import { isModuleUnlocked, completeExercise, completeModule, addJournalEntry } from '../lib/progress'

// ---------------------------------------------------------------------------
// Spinner
// ---------------------------------------------------------------------------
function Spinner() {
  return (
    <div className="h-dvh bg-[#0E0E16] flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-4 border-[#CC2233]/30 border-t-[#CC2233] animate-spin" />
    </div>
  )
}

// ---------------------------------------------------------------------------
// CompletionScreen
// ---------------------------------------------------------------------------
function CompletionScreen({ module: mod, totalXP, onDashboard }) {
  return (
    <div className="h-dvh bg-[#0E0E16] text-[#F0EBF4] flex items-center justify-center px-6">
      <div className="text-center max-w-sm w-full">
        <div className="text-6xl mb-4">{mod.badge.icon}</div>
        <h1 className="text-3xl font-black mb-2">Module terminé !</h1>
        <p className="text-[#9090A8] mb-1">Badge obtenu</p>
        <p className="text-xl font-bold text-[#CC2233] mb-5">{mod.badge.label}</p>
        <div className="p-5 rounded-2xl bg-[#16161F] border border-[#2A2A38] mb-8">
          <p className="text-sm text-[#9090A8]">+{mod.xpBonus} XP ce module</p>
          <p className="text-3xl font-black mt-1">
            {totalXP} <span className="text-sm font-normal text-[#9090A8]">XP total</span>
          </p>
        </div>
        <button
          onClick={onDashboard}
          className="w-full py-4 bg-[#CC2233] hover:bg-[#991122] text-white font-bold rounded-xl transition-colors"
        >
          Retour au tableau de bord
        </button>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// ReadingExercise
// ---------------------------------------------------------------------------
function ReadingExercise({ title, content, keyPoints, onNext, setFooterAction }) {
  const paragraphs = content.split('\n\n')

  useEffect(() => {
    setFooterAction({ label: "J'ai compris →", disabled: false, onClick: onNext })
  }, [onNext, setFooterAction])

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-black">{title}</h2>
      <div className="flex flex-col gap-4">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-[#D0CBDA] leading-relaxed">{p}</p>
        ))}
      </div>
      {keyPoints && keyPoints.length > 0 && (
        <div className="p-4 rounded-2xl bg-[#16161F] border border-[#2A2A38]">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-3">Points clés</p>
          <ul className="flex flex-col gap-2">
            {keyPoints.map((kp, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[#F0EBF4]">
                <span className="text-[#CC2233] mt-0.5 flex-shrink-0">✓</span>
                <span>{kp}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// BreathingExercise
// ---------------------------------------------------------------------------
function BreathingExercise({ technique, title, description, onNext, setFooterAction }) {
  const [phase, setPhase] = useState('idle')
  const [cycleCount, setCycleCount] = useState(0)
  const [scale, setScale] = useState(1)
  const mountedRef = useRef(true)
  const timeoutsRef = useRef([])

  function scheduleTimeout(fn, delay) {
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

  // Footer button: only show when done
  useEffect(() => {
    if (phase === 'done') {
      setFooterAction({ label: 'Continuer →', disabled: false, onClick: onNext })
    } else {
      setFooterAction(null)
    }
  }, [phase, onNext, setFooterAction])

  const TOTAL_CYCLES = 3

  function runCycle(currentCycle) {
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

  const phaseLabels = { idle: '', inhale: 'Inspire…', hold: 'Retiens…', exhale: 'Expire…', done: 'Bien joué ✓' }
  const phaseDuration = technique === 'cardiac' ? { inhale: 5000, exhale: 5000 } : { inhale: 4000, hold: 7000, exhale: 8000 }
  const transitionDuration = phase === 'inhale' ? phaseDuration.inhale : phase === 'hold' ? 0 : phase === 'exhale' ? phaseDuration.exhale : 500

  return (
    <div className="flex flex-col items-center gap-8 py-4">
      <div className="text-center">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-sm text-[#9090A8] max-w-xs">{description}</p>
      </div>

      <div
        className="w-44 h-44 rounded-full border-4 border-[#CC2233] flex items-center justify-center"
        style={{
          transform: `scale(${scale})`,
          transition: `transform ${transitionDuration}ms ease-in-out`,
          backgroundColor: phase === 'inhale' ? 'rgba(204,34,51,0.12)' : 'transparent',
        }}
      >
        <span className="text-sm text-[#F0EBF4] font-medium text-center px-4">{phaseLabels[phase]}</span>
      </div>

      {phase !== 'idle' && phase !== 'done' && (
        <p className="text-[#9090A8] text-sm">Cycle {cycleCount + 1} / {TOTAL_CYCLES}</p>
      )}
      {phase === 'done' && (
        <p className="text-green-400 text-sm font-semibold">{TOTAL_CYCLES} / {TOTAL_CYCLES} cycles terminés</p>
      )}
      {phase === 'idle' && (
        <button
          onClick={() => runCycle(0)}
          className="px-8 py-3 bg-[#CC2233] hover:bg-[#991122] text-white font-semibold rounded-xl transition-colors"
        >
          Commencer
        </button>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// AppliedTensionExercise
// ---------------------------------------------------------------------------
function AppliedTensionExercise({ title, muscleGroup, instruction, rounds, onNext, setFooterAction }) {
  const [phase, setPhase] = useState('idle')
  const [countdown, setCountdown] = useState(0)
  const [currentRound, setCurrentRound] = useState(0)
  const intervalRef = useRef(null)

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

  function startRound(roundIndex) {
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

  const phaseConfig = {
    idle: { label: '', color: 'text-[#F0EBF4]', bg: 'bg-[#16161F]' },
    tense: { label: 'TENSEZ', color: 'text-[#CC2233]', bg: 'bg-[#CC2233]/10' },
    release: { label: 'RELÂCHEZ', color: 'text-[#9090A8]', bg: 'bg-[#16161F]' },
    rest: { label: 'REPOS', color: 'text-[#6B6B80]', bg: 'bg-[#16161F]' },
    done: { label: '', color: '', bg: 'bg-[#16161F]' },
  }
  const config = phaseConfig[phase]

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-black mb-1">{title}</h2>
        <p className="text-sm text-[#9090A8]">Groupe musculaire : {muscleGroup}</p>
      </div>
      <div className={`p-5 rounded-2xl border border-[#2A2A38] text-sm text-[#D0CBDA] leading-relaxed ${config.bg}`}>
        {instruction}
      </div>
      {phase !== 'idle' && phase !== 'done' && (
        <div className={`flex flex-col items-center gap-3 p-8 rounded-2xl border border-[#2A2A38] ${config.bg}`}>
          <span className={`text-2xl font-black tracking-widest ${config.color}`}>{config.label}</span>
          {(phase === 'tense' || phase === 'rest') && (
            <span className="text-6xl font-black text-[#F0EBF4]">{countdown}</span>
          )}
          {phase === 'release' && <span className="text-base text-[#9090A8]">Relâchez progressivement…</span>}
          <p className="text-sm text-[#6B6B80]">Série {currentRound + 1} / {rounds}</p>
        </div>
      )}
      {phase === 'idle' && (
        <button
          onClick={() => startRound(0)}
          className="w-full py-3 bg-[#CC2233] hover:bg-[#991122] text-white font-semibold rounded-xl transition-colors"
        >
          Commencer les séries
        </button>
      )}
      {phase === 'done' && (
        <div className="p-5 rounded-2xl bg-[#0D1F1A] border border-green-900/50 text-center">
          <p className="text-lg font-bold text-green-400">Excellent travail !</p>
          <p className="text-sm text-[#9090A8] mt-1">{rounds} séries complétées</p>
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// ColorExposureExercise
// ---------------------------------------------------------------------------
function ColorExposureExercise({ colors, onNext, setFooterAction }) {
  const [index, setIndex] = useState(0)
  const isLast = index === colors.length - 1

  useEffect(() => {
    const onClick = isLast ? onNext : () => setIndex(i => i + 1)
    setFooterAction({ label: isLast ? 'Terminer →' : 'Couleur suivante →', disabled: false, onClick })
  }, [index, isLast, onNext, setFooterAction])

  const current = colors[index]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#CC2233]/10 border border-[#CC2233]/20 text-sm text-[#FF4455]">
        <span>💪</span>
        <span>Tension musculaire active — contracte bras et jambes</span>
      </div>
      <div className="flex flex-col items-center gap-4 py-4">
        <div
          className="w-64 h-64 rounded-3xl mx-auto transition-all duration-700"
          style={{ backgroundColor: current.hex }}
        />
        <p className="text-[#9090A8] text-sm text-center">{current.label}</p>
        <p className="text-xs text-[#6B6B80]">{index + 1} / {colors.length}</p>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// ShapeExposureExercise
// ---------------------------------------------------------------------------
function ShapeExposureExercise({ shapes, onNext, setFooterAction }) {
  const [index, setIndex] = useState(0)
  const isLast = index === shapes.length - 1

  useEffect(() => {
    const onClick = isLast ? onNext : () => setIndex(i => i + 1)
    setFooterAction({ label: isLast ? 'Terminer →' : 'Forme suivante →', disabled: false, onClick })
  }, [index, isLast, onNext, setFooterAction])

  const current = shapes[index]

  function renderShape(variant) {
    switch (variant) {
      case 'circle': return <circle cx="100" cy="100" r="80" fill="#CC2233" opacity="0.85" />
      case 'drop': return <path d="M100 20 C100 20 30 90 30 130 C30 168 62 190 100 190 C138 190 170 168 170 130 C170 90 100 20 100 20Z" fill="#CC2233" opacity="0.85" />
      case 'splatter': return <path d="M100 80 C120 60 150 70 145 95 C155 90 165 105 150 115 C160 125 150 145 135 140 C140 155 120 160 110 148 C105 162 85 160 82 145 C68 152 55 138 65 124 C50 118 48 98 65 95 C55 78 72 62 85 72 C85 55 108 50 100 80Z" fill="#CC2233" opacity="0.85" />
      case 'complex': return (
        <>
          <ellipse cx="100" cy="90" rx="65" ry="50" fill="#CC2233" opacity="0.7" />
          <circle cx="140" cy="130" r="30" fill="#AA1122" opacity="0.8" />
          <circle cx="70" cy="135" r="22" fill="#CC2233" opacity="0.75" />
          <path d="M95 140 Q100 170 105 140" stroke="#AA1122" strokeWidth="8" fill="none" opacity="0.9" />
        </>
      )
      default: return null
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#CC2233]/10 border border-[#CC2233]/20 text-sm text-[#FF4455]">
        <span>💪</span>
        <span>Appliquer la tension — contracte bras et jambes</span>
      </div>
      <div className="flex flex-col items-center gap-4 py-4">
        <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto">
          {renderShape(current.variant)}
        </svg>
        <p className="text-[#9090A8] text-sm text-center">{current.label}</p>
        <p className="text-xs text-[#6B6B80]">{index + 1} / {shapes.length}</p>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// ImageExposureExercise
// ---------------------------------------------------------------------------
function ImageExposureExercise({ level, title, description, onNext, setFooterAction }) {
  useEffect(() => {
    setFooterAction({ label: "J'ai regardé, continuer →", disabled: false, onClick: onNext })
  }, [onNext, setFooterAction])

  function renderSVG() {
    if (level === 1) return (
      <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto">
        <defs>
          <radialGradient id="g1" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#CC2233" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#440011" stopOpacity="0.1" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="90" fill="url(#g1)" />
        <path d="M60 80 Q100 40 140 80 Q160 110 140 140 Q100 170 60 140 Q40 110 60 80Z" fill="#CC2233" opacity="0.4" />
      </svg>
    )
    if (level === 2) return (
      <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto">
        <line x1="100" y1="20" x2="100" y2="180" stroke="#CC2233" strokeWidth="8" strokeLinecap="round" />
        <ellipse cx="100" cy="100" rx="40" ry="12" fill="none" stroke="#CC2233" strokeWidth="3" opacity="0.6" />
        <circle cx="100" cy="60" r="8" fill="#CC2233" opacity="0.8" />
        <circle cx="100" cy="140" r="8" fill="#CC2233" opacity="0.8" />
        <path d="M80 80 Q60 100 80 120" stroke="#AA1122" strokeWidth="4" fill="none" />
        <path d="M120 80 Q140 100 120 120" stroke="#AA1122" strokeWidth="4" fill="none" />
      </svg>
    )
    if (level === 3) return (
      <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto">
        <rect x="20" y="60" width="160" height="80" rx="8" fill="#1A1A2E" stroke="#2A2A38" strokeWidth="2" />
        <ellipse cx="100" cy="100" rx="55" ry="25" fill="#8B1A1A" opacity="0.9" />
        <ellipse cx="100" cy="100" rx="40" ry="18" fill="#CC2233" opacity="0.8" />
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
        <p className="text-sm text-[#9090A8]">{description}</p>
      </div>
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#CC2233]/10 border border-[#CC2233]/20 text-sm text-[#FF4455]">
        <span>💪</span>
        <span>Tension avant de regarder — contracte tes muscles maintenant</span>
      </div>
      <div className="flex flex-col items-center py-6 bg-[#16161F] rounded-2xl border border-[#2A2A38]">
        {renderSVG()}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// QuizExercise
// ---------------------------------------------------------------------------
function QuizExercise({ questions, onNext, setFooterAction }) {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)

  const current = questions[questionIndex]
  const isLast = questionIndex === questions.length - 1

  function handleNext() {
    if (isLast) setShowScore(true)
    else { setQuestionIndex(i => i + 1); setSelected(null) }
  }

  // Update footer based on state
  useEffect(() => {
    if (showScore) {
      setFooterAction({ label: 'Terminer le quiz →', disabled: false, onClick: onNext })
    } else if (selected !== null) {
      setFooterAction({ label: isLast ? 'Voir les résultats →' : 'Question suivante →', disabled: false, onClick: handleNext })
    } else {
      setFooterAction({ label: 'Choisir une réponse…', disabled: true, onClick: null })
    }
  }, [selected, showScore, isLast, questionIndex])

  function handleSelect(optionIndex) {
    if (selected !== null) return
    setSelected(optionIndex)
    if (optionIndex === current.correct) setScore(s => s + 1)
  }

  if (showScore) {
    return (
      <div className="flex flex-col gap-6">
        <div className="text-center p-10 rounded-2xl bg-[#16161F] border border-[#2A2A38]">
          <p className="text-6xl font-black text-[#CC2233] mb-2">{score} / {questions.length}</p>
          <p className="text-[#9090A8]">bonne{score > 1 ? 's' : ''} réponse{score > 1 ? 's' : ''}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-xs text-[#6B6B80] mb-2">Question {questionIndex + 1} / {questions.length}</p>
        <h2 className="text-lg font-bold">{current.question}</h2>
      </div>
      <div className="flex flex-col gap-2">
        {current.options.map((option, i) => {
          let style = 'bg-[#16161F] border-[#2A2A38] text-[#F0EBF4] hover:border-[#CC2233]/50'
          if (selected !== null) {
            if (i === current.correct) style = 'bg-green-900/30 border-green-500/60 text-green-300'
            else if (i === selected) style = 'bg-red-900/30 border-red-500/60 text-red-300'
            else style = 'bg-[#16161F] border-[#2A2A38] text-[#6B6B80] opacity-60'
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
        <div className="p-4 rounded-xl bg-[#16161F] border border-[#2A2A38] text-sm text-[#D0CBDA]">
          <span className="font-semibold text-[#9090A8]">Explication : </span>
          {current.explanation}
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// JournalExercise
// ---------------------------------------------------------------------------
function JournalExercise({ prompt, moduleId, onNext, setFooterAction }) {
  const [rating, setRating] = useState(null)
  const [note, setNote] = useState('')

  useEffect(() => {
    if (rating !== null) {
      setFooterAction({
        label: 'Enregistrer →',
        disabled: false,
        onClick: () => { addJournalEntry(moduleId, rating, note); onNext() },
      })
    } else {
      setFooterAction({ label: 'Sélectionne une note pour continuer', disabled: true, onClick: null })
    }
  }, [rating, note, moduleId, onNext, setFooterAction])

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-black mb-2">Journal</h2>
        <p className="text-[#D0CBDA] leading-relaxed">{prompt}</p>
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-sm text-[#9090A8]">Comment te sens-tu ?</p>
        <div className="flex gap-2 flex-wrap">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(r => (
            <button
              key={r}
              onClick={() => setRating(r)}
              className={`w-10 h-10 rounded-xl border font-bold text-sm transition-all ${
                rating === r
                  ? 'bg-[#CC2233] border-[#CC2233] text-white scale-110'
                  : 'bg-[#16161F] border-[#2A2A38] text-[#9090A8] hover:border-[#CC2233]/60'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
        <div className="flex justify-between text-xs text-[#6B6B80]">
          <span>Très anxieux·se</span>
          <span>Très serein·e</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm text-[#9090A8]">Ajoute une note (optionnel)</label>
        <textarea
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder="Décris ce que tu as ressenti…"
          rows={3}
          className="w-full bg-[#16161F] border border-[#2A2A38] rounded-xl px-4 py-3 text-sm text-[#F0EBF4] placeholder-[#6B6B80] resize-none focus:outline-none focus:border-[#CC2233]/50"
        />
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// ScenarioExercise
// ---------------------------------------------------------------------------
function ScenarioExercise({ title, situation, steps, onNext, setFooterAction }) {
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
        <div className="p-4 rounded-xl bg-[#16161F] border border-[#2A2A38]">
          <p className="text-sm font-semibold text-[#9090A8] mb-1">Situation</p>
          <p className="text-sm text-[#D0CBDA] leading-relaxed">{situation}</p>
        </div>
      </div>
      <p className="text-xs text-[#6B6B80]">Étape {stepIndex + 1} / {steps.length}</p>
      <div className="flex flex-col gap-3">
        <div className="p-4 rounded-xl bg-[#16161F] border border-[#2A2A38]">
          <p className="text-sm text-[#F0EBF4] leading-relaxed">{current.instruction}</p>
        </div>
        <div className="p-4 rounded-xl border border-[#CC2233]/20" style={{ background: 'rgba(204,34,51,0.05)' }}>
          <p className="text-xs font-semibold text-[#FF4455] mb-1">Conseil</p>
          <p className="text-sm text-[#D0CBDA] leading-relaxed">{current.tip}</p>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main Module Component
// ---------------------------------------------------------------------------
export default function Module() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [ready, setReady] = useState(false)
  const [exerciseIndex, setExerciseIndex] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [earnedXP, setEarnedXP] = useState(0)
  const [footerAction, setFooterAction] = useState(null)
  const contentRef = useRef(null)

  const moduleId = parseInt(id)
  const moduleData = MODULES.find(m => m.id === moduleId)

  useEffect(() => {
    async function guard() {
      if (!import.meta.env.DEV) {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) { navigate('/auth'); return }
        const { data: profile } = await supabase.from('profiles').select('has_access').eq('id', user.id).single()
        if (!profile?.has_access) { navigate('/'); return }
      }
      if (!moduleData || !isModuleUnlocked(moduleId)) { navigate('/dashboard'); return }
      setReady(true)
    }
    guard()
  }, [navigate, moduleId, moduleData])

  // Reset footer + scroll to top when exercise changes
  useEffect(() => {
    setFooterAction(null)
    if (contentRef.current) contentRef.current.scrollTop = 0
  }, [exerciseIndex])

  const handleExerciseComplete = useCallback(() => {
    completeExercise(moduleId, exerciseIndex)
    if (exerciseIndex + 1 >= moduleData.exercises.length) {
      const finalProgress = completeModule(moduleId, moduleData.xpBonus)
      setEarnedXP(finalProgress.xp)
      setCompleted(true)
    } else {
      setExerciseIndex(i => i + 1)
    }
  }, [moduleId, exerciseIndex, moduleData])

  if (!ready) return <Spinner />

  if (completed) {
    return (
      <CompletionScreen
        module={moduleData}
        totalXP={earnedXP}
        onDashboard={() => navigate('/dashboard')}
      />
    )
  }

  const exercise = moduleData.exercises[exerciseIndex]
  const progress = Math.round((exerciseIndex / moduleData.exercises.length) * 100)
  const exerciseProps = { ...exercise, onNext: handleExerciseComplete, setFooterAction }

  return (
    <div className="h-dvh bg-[#0E0E16] text-[#F0EBF4] flex flex-col">

      {/* Header */}
      <div className="flex-shrink-0 px-6 pt-5 pb-4 border-b border-[#2A2A38]">
        <div className="max-w-xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <button onClick={() => navigate('/dashboard')} className="text-sm text-[#6B6B80] hover:text-[#F0EBF4] transition-colors">← Dashboard</button>
            <p className="text-xs text-[#6B6B80] text-center truncate max-w-[40%]">{moduleData.title}</p>
            <span className="text-sm text-[#9090A8]">{exerciseIndex + 1} / {moduleData.exercises.length}</span>
          </div>
          <div className="w-full h-1.5 bg-[#2A2A38] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#CC2233] to-[#FF4455] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div ref={contentRef} className="flex-1 overflow-y-auto">
        <div className="max-w-xl mx-auto px-6 pt-6 pb-4">
          <div className="flex justify-end mb-4">
            <span className="text-xs px-2.5 py-1 rounded-full bg-[#CC2233]/15 text-[#FF4455]">+50 XP</span>
          </div>
          {exercise.type === 'reading' && <ReadingExercise {...exerciseProps} />}
          {exercise.type === 'breathing' && <BreathingExercise {...exerciseProps} />}
          {exercise.type === 'applied_tension' && <AppliedTensionExercise {...exerciseProps} />}
          {exercise.type === 'color_exposure' && <ColorExposureExercise {...exerciseProps} />}
          {exercise.type === 'shape_exposure' && <ShapeExposureExercise {...exerciseProps} />}
          {exercise.type === 'image_exposure' && <ImageExposureExercise {...exerciseProps} />}
          {exercise.type === 'quiz' && <QuizExercise {...exerciseProps} />}
          {exercise.type === 'journal' && <JournalExercise {...exerciseProps} />}
          {exercise.type === 'scenario' && <ScenarioExercise {...exerciseProps} />}
        </div>
      </div>

      {/* Fixed footer button */}
      <div className="flex-shrink-0 px-6 pt-3 pb-6 bg-[#0E0E16] border-t border-[#2A2A38]">
        <div className="max-w-xl mx-auto">
          {footerAction ? (
            <button
              onClick={footerAction.disabled ? undefined : footerAction.onClick}
              disabled={footerAction.disabled}
              className={`w-full py-4 font-semibold rounded-xl transition-all text-sm ${
                footerAction.disabled
                  ? 'bg-[#1E1E2A] text-[#4A4A5A] cursor-not-allowed'
                  : 'bg-[#CC2233] hover:bg-[#991122] text-white active:scale-[0.98]'
              }`}
            >
              {footerAction.label}
            </button>
          ) : (
            <div className="w-full py-4 rounded-xl bg-[#1E1E2A]" />
          )}
        </div>
      </div>

    </div>
  )
}
