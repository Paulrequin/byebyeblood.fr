// Visuels d'exposition partagés entre les modules (Module.tsx) et la page de
// pratique post-programme (Practice.tsx). Purs composants de rendu — aucune
// dépendance à l'état des modules ou à Supabase.

export function ColorSwatch({ hex }: { hex: string }) {
  return (
    <div
      style={{ width: '240px', height: '240px', backgroundColor: hex, transition: 'background-color 0.7s ease' }}
    />
  )
}

export function ShapeVisual({ variant }: { variant: string }) {
  function renderShape(v: string) {
    switch (v) {
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
    <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto">
      {renderShape(variant)}
    </svg>
  )
}

export function ImageLevelVisual({ level }: { level: number }) {
  switch (level) {
    case 1: return (
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
    case 2: return (
      <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto">
        <line x1="100" y1="20" x2="100" y2="180" stroke="#E53935" strokeWidth="8" strokeLinecap="round" />
        <ellipse cx="100" cy="100" rx="40" ry="12" fill="none" stroke="#E53935" strokeWidth="3" opacity="0.6" />
        <circle cx="100" cy="60" r="8" fill="#E53935" opacity="0.8" />
        <circle cx="100" cy="140" r="8" fill="#E53935" opacity="0.8" />
        <path d="M80 80 Q60 100 80 120" stroke="#AA1122" strokeWidth="4" fill="none" />
        <path d="M120 80 Q140 100 120 120" stroke="#AA1122" strokeWidth="4" fill="none" />
      </svg>
    )
    case 3: return (
      <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto">
        <rect x="20" y="60" width="160" height="80" rx="8" fill="#F0EDE8" stroke="#E8E6E0" strokeWidth="2" />
        <ellipse cx="100" cy="100" rx="55" ry="25" fill="#8B1A1A" opacity="0.9" />
        <ellipse cx="100" cy="100" rx="40" ry="18" fill="#E53935" opacity="0.8" />
        <circle cx="85" cy="95" r="5" fill="#FF4455" opacity="0.9" />
        <circle cx="115" cy="105" r="3" fill="#FF4455" opacity="0.7" />
        <path d="M50 100 Q70 85 90 100 Q110 115 130 100 Q150 85 160 100" stroke="#FF6677" strokeWidth="2.5" fill="none" opacity="0.8" />
      </svg>
    )
    case 4: return (
      <svg viewBox="0 0 220 200" className="w-48 h-48 mx-auto">
        <rect width="220" height="200" fill="#F5F0EA" />
        <path d="M50 60 Q55 58 170 62 Q180 64 182 100 Q180 136 170 138 Q55 142 50 140 Q38 120 38 100 Q38 80 50 60Z" fill="#D4A987" />
        <path d="M50 60 Q55 58 170 62 Q176 64 178 80 Q176 70 165 68 Q55 64 48 66Z" fill="#C4957A" opacity="0.5" />
        <path d="M60 95 Q90 88 130 92 Q155 95 170 100" stroke="#5B7FBB" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.75" />
        <path d="M80 100 Q100 106 120 103 Q140 100 155 104" stroke="#6A8FC9" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.5" />
        <path d="M55 75 Q52 100 55 125" stroke="#B8896A" strokeWidth="2" fill="none" opacity="0.4" />
        <text x="110" y="170" textAnchor="middle" fontSize="10" fill="#888" fontFamily="sans-serif">veine antécubitale</text>
      </svg>
    )
    case 5: return (
      <svg viewBox="0 0 220 200" className="w-48 h-48 mx-auto">
        <rect width="220" height="200" fill="#F5F0EA" />
        <rect x="15" y="30" width="190" height="145" rx="6" fill="#E8E4DC" stroke="#D0C8BB" strokeWidth="1.5" />
        <rect x="30" y="50" width="22" height="80" rx="10" fill="#CC1111" opacity="0.9" />
        <rect x="30" y="50" width="22" height="12" rx="5" fill="#880000" />
        <rect x="33" y="56" width="6" height="60" rx="3" fill="#FF4444" opacity="0.3" />
        <rect x="62" y="55" width="22" height="75" rx="10" fill="#7B3F9E" opacity="0.85" />
        <rect x="62" y="55" width="22" height="12" rx="5" fill="#4A1A6E" />
        <rect x="65" y="61" width="6" height="55" rx="3" fill="#BB88DD" opacity="0.3" />
        <rect x="32" y="82" width="18" height="20" rx="2" fill="white" opacity="0.85" />
        <line x1="34" y1="87" x2="48" y2="87" stroke="#ccc" strokeWidth="1" />
        <line x1="34" y1="91" x2="48" y2="91" stroke="#ccc" strokeWidth="1" />
        <line x1="34" y1="95" x2="44" y2="95" stroke="#ccc" strokeWidth="1" />
        <rect x="100" y="60" width="45" height="35" rx="3" fill="white" stroke="#D0C8BB" strokeWidth="1" />
        <line x1="108" y1="68" x2="137" y2="68" stroke="#ddd" strokeWidth="0.8" />
        <line x1="108" y1="73" x2="137" y2="73" stroke="#ddd" strokeWidth="0.8" />
        <line x1="108" y1="78" x2="130" y2="78" stroke="#ddd" strokeWidth="0.8" />
        <line x1="108" y1="83" x2="133" y2="83" stroke="#ddd" strokeWidth="0.8" />
        <rect x="105" y="108" width="70" height="8" rx="4" fill="#A0A0A0" />
        <rect x="105" y="108" width="18" height="8" rx="4" fill="#C8C8C8" />
        <polygon points="175,108 183,112 175,116" fill="#888" />
        <text x="110" y="165" textAnchor="middle" fontSize="9.5" fill="#888" fontFamily="sans-serif">matériel de prélèvement</text>
      </svg>
    )
    default: return null
  }
}

export function getYouTubeEmbedUrl(src: string): string | null {
  // Already an embed URL
  if (src.includes('youtube.com/embed/')) return src
  // youtu.be/ID
  const shortMatch = src.match(/youtu\.be\/([a-zA-Z0-9_-]+)/)
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`
  // youtube.com/watch?v=ID
  const watchMatch = src.match(/[?&]v=([a-zA-Z0-9_-]+)/)
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`
  return null
}
