import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import s from './DiagnosticSUD.module.css'

const SITUATIONS = [
  'Entendre le mot "sang"',
  'Lire un article médical avec le mot "blessure"',
  'Voir un pansement sur quelqu\'un',
  'Voir une égratignure sur ta peau',
  'Regarder une seringue en photo',
  'Être dans une salle d\'attente médicale',
  'Regarder une prise de sang en vidéo',
  'Voir une plaie ouverte en photo',
]

const EMOJI_OPTIONS = [
  { emoji: '😊', value: 0,  label: 'Aucune gêne' },
  { emoji: '🙂', value: 2,  label: 'Légère' },
  { emoji: '😐', value: 5,  label: 'Modérée' },
  { emoji: '😰', value: 7,  label: 'Forte' },
  { emoji: '😱', value: 10, label: 'Extrême' },
]

interface Profile {
  name: string
  badge: string
  description: string
}

function getProfile(score: number): Profile {
  if (score <= 20) return {
    name: 'Phobie légère',
    badge: '🟡',
    description: 'Tu ressens une légère gêne face aux stimuli liés au sang, mais elle reste gérable. Un programme de désensibilisation progressive t\'aidera à la surmonter facilement.',
  }
  if (score <= 50) return {
    name: 'Phobie modérée',
    badge: '🟠',
    description: 'Ta phobie du sang provoque un inconfort notable et peut interférer avec certaines situations du quotidien. Le programme est conçu exactement pour ce niveau.',
  }
  return {
    name: 'Phobie sévère',
    badge: '🔴',
    description: 'Les situations liées au sang déclenchent une forte réaction chez toi. Avec un accompagnement structuré, une désensibilisation progressive est tout à fait possible.',
  }
}

export default function DiagnosticSUD() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [step, setStep] = useState(0)
  const [scores, setScores] = useState<(number | null)[]>(Array(8).fill(null))
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState<{ score: number; profile: Profile } | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)

  function handleSelectScore(value: number) {
    setScores(prev => {
      const next = [...prev]
      next[step] = value
      return next
    })
  }

  async function handleNext() {
    if (step < 7) {
      setStep(s => s + 1)
      return
    }
    const finalScore = scores.reduce<number>((sum, v) => sum + (v ?? 0), 0)
    const finalProfile = getProfile(finalScore)
    setResult({ score: finalScore, profile: finalProfile })
    setShowResult(true)
    await saveResults(finalScore, finalProfile)
  }

  function handlePrev() {
    if (step > 0) setStep(s => s - 1)
  }

  async function saveResults(finalScore: number, finalProfile: Profile) {
    if (!user) return
    setSaveError(null)
    try {
      const scoresDetails: Record<string, number> = {}
      SITUATIONS.forEach((situation, i) => {
        scoresDetails[situation] = scores[i] ?? 0
      })
      await supabase.from('diagnostic_results').insert({
        user_id: user.id,
        score_total: finalScore,
        profil: finalProfile.name,
        scores_details: scoresDetails,
      })
    } catch (err) {
      setSaveError('Erreur lors de la sauvegarde des résultats.')
      console.error('[DiagnosticSUD] save error:', err)
    }
  }

  if (showResult && result) {
    return (
      <div className={s.resultPage}>
        <div className={s.resultCard}>
          <div className={s.resultBadge}>{result.profile.badge}</div>
          <h1 className={s.resultTitle}>{result.profile.name}</h1>
          <p className={s.resultDesc}>{result.profile.description}</p>
          <div className={s.scoreBox}>
            <span className={s.scoreLabel}>Ton score</span>
            <span className={s.scoreValue}>{result.score} / 80</span>
          </div>
          {saveError && <p className={s.saveError}>{saveError}</p>}
          <button className={s.btnStart} onClick={() => navigate('/dashboard')}>
            Commencer mon programme
          </button>
        </div>
      </div>
    )
  }

  const canNext = scores[step] !== null
  const progress = ((step + 1) / 8) * 100

  return (
    <div className={s.page}>
      <div className={s.container}>

        <div className={s.progressArea}>
          <div className={s.progressHeader}>
            <span className={s.progressCount}>{step + 1} / 8</span>
            <span className={s.progressLabel}>situations</span>
          </div>
          <div className={s.progressTrack}>
            <div className={s.progressFill} style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className={s.card}>
          <p className={s.situationLabel}>Situation {step + 1}</p>
          <h2 className={s.situationText}>{SITUATIONS[step]}</h2>
          <p className={s.questionText}>Quel niveau de gêne cela te provoque-t-il ?</p>

          <div className={s.emojiRow}>
            {EMOJI_OPTIONS.map(opt => (
              <button
                key={opt.value}
                className={`${s.emojiBtn} ${scores[step] === opt.value ? s.emojiBtnSelected : ''}`}
                onClick={() => handleSelectScore(opt.value)}
                aria-pressed={scores[step] === opt.value}
                aria-label={opt.label}
              >
                <span className={s.emojiIcon}>{opt.emoji}</span>
                <span className={s.emojiLabel}>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={s.navRow}>
          <button
            className={s.btnPrev}
            onClick={handlePrev}
            style={{ visibility: step > 0 ? 'visible' : 'hidden' }}
          >
            ← Précédent
          </button>
          <button
            className={s.btnNext}
            onClick={handleNext}
            disabled={!canNext}
          >
            {step === 7 ? 'Voir mon résultat' : 'Suivant →'}
          </button>
        </div>

      </div>
    </div>
  )
}
