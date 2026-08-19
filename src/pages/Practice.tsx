import { useEffect, useRef, useState } from 'react'
import { checkPracticeCode } from '@/services/practiceService'
import { randomFiche, type Fiche } from '@/data/fiches'
import { ColorSwatch, ShapeVisual, ImageLevelVisual, getYouTubeEmbedUrl } from '@/components/ExposureVisuals'
import s from './Practice.module.css'

const MIN_SECONDS = 300 // 5 min
const SESSION_KEY = 'practice_ok'

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60)
  const sec = totalSeconds % 60
  return `${m}:${sec.toString().padStart(2, '0')}`
}

function FicheVisualView({ fiche }: { fiche: Fiche }) {
  const { visual } = fiche
  if (visual.kind === 'color') return <ColorSwatch hex={visual.hex} />
  if (visual.kind === 'shape') return <ShapeVisual variant={visual.variant} />
  if (visual.kind === 'image') return <ImageLevelVisual level={visual.level} />

  const embedUrl = getYouTubeEmbedUrl(visual.src)
  if (!embedUrl) return null
  return (
    <div className={s.videoWrap}>
      <iframe
        src={`${embedUrl}?rel=0&modestbranding=1`}
        title="Fiche vidéo"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}

function PracticeSession() {
  const [fiche, setFiche] = useState<Fiche>(() => randomFiche())
  const [elapsed, setElapsed] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => setElapsed(e => e + 1), 1000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [fiche])

  function nextFiche() {
    setFiche(f => randomFiche(f.id))
    setElapsed(0)
  }

  const isVideo = fiche.visual.kind === 'video'
  const ready = elapsed >= MIN_SECONDS
  const pct = Math.min(100, (elapsed / MIN_SECONDS) * 100)

  return (
    <div className={s.practiceCard}>
      <div className={isVideo ? undefined : s.visualWrap}>
        <FicheVisualView fiche={fiche} />
      </div>
      <p className={s.ficheText}>{fiche.text}</p>

      <div>
        <div className={s.timerRow}>
          <span className={s.timerValue}>{formatTime(elapsed)}</span>
          <span className={s.timerLabel}>
            {ready ? 'Objectif atteint' : `Objectif : ${formatTime(MIN_SECONDS)}`}
          </span>
        </div>
        <div className={s.track} style={{ marginTop: '.6rem' }}>
          <div className={s.bar} style={{ width: `${pct}%` }} />
        </div>
      </div>

      {ready ? (
        <button className={s.nextBtn} onClick={nextFiche}>✓ Nouvelle fiche</button>
      ) : (
        <button className={s.skipLink} onClick={nextFiche}>Changer de fiche</button>
      )}
    </div>
  )
}

function CodeGate({ onSuccess }: { onSuccess: () => void }) {
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!code.trim()) return
    setLoading(true)
    setError(null)
    try {
      const valid = await checkPracticeCode(code)
      if (valid) {
        sessionStorage.setItem(SESSION_KEY, '1')
        onSuccess()
      } else {
        setError('Code invalide. Vérifie auprès de la personne qui te l\'a transmis.')
      }
    } catch {
      setError('Une erreur est survenue. Réessaie.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className={s.gateCard} onSubmit={handleSubmit}>
      <h1 className={s.gateTitle}>Fiche de pratique</h1>
      <p className={s.gateSub}>
        Entre le code qui t'a été transmis pour accéder à un exercice d'entretien : une fiche, quelques minutes, à ton rythme.
      </p>
      <input
        className={s.gateInput}
        value={code}
        onChange={e => setCode(e.target.value)}
        placeholder="Code d'accès"
        autoFocus
        autoComplete="off"
      />
      {error && <p className={s.gateError}>{error}</p>}
      <button className={s.gateSubmit} type="submit" disabled={loading}>
        {loading ? 'Vérification…' : 'Entrer'}
      </button>
    </form>
  )
}

export default function Practice() {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1')

  return (
    <div className={s.page}>
      <a href="/" className={s.logo}>Bye Bye <span>Blood</span></a>
      {unlocked ? <PracticeSession /> : <CodeGate onSuccess={() => setUnlocked(true)} />}
      <p className={s.footNote}>
        Ceci n'est pas un dispositif médical. En cas de malaise, arrête l'exercice et assieds-toi.
      </p>
    </div>
  )
}
