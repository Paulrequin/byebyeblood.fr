// Fiches de pratique post-programme (page /pratique).
// Contenu réutilisé tel quel depuis les modules 4 (couleurs), 5 (formes),
// 6 (images) et 8 (vidéos) de src/data/modules.ts.

export type FicheVisual =
  | { kind: 'color'; hex: string }
  | { kind: 'shape'; variant: string }
  | { kind: 'image'; level: number }
  | { kind: 'video'; src: string }

export interface Fiche {
  id: string
  visual: FicheVisual
  text: string
}

export const FICHES: Fiche[] = [
  // Module 4 — couleurs
  { id: 'color-1', visual: { kind: 'color', hex: '#FFE8E8' }, text: "Rose très pâle : observe simplement cette teinte, sans jugement." },
  { id: 'color-2', visual: { kind: 'color', hex: '#FFCCCC' }, text: "Rose clair : remarque ce qui se passe en toi, accueille-le." },
  { id: 'color-3', visual: { kind: 'color', hex: '#FF8888' }, text: "Rose soutenu : reste présent·e, tu fais de la place à cette couleur." },
  { id: 'color-4', visual: { kind: 'color', hex: '#EE3344' }, text: "Rouge vif : tu choisis de regarder, c'est un acte courageux." },
  { id: 'color-5', visual: { kind: 'color', hex: '#CC0022' }, text: "Rouge profond : tu as traversé tout le spectre en restant là." },

  // Module 5 — formes
  { id: 'shape-circle',   visual: { kind: 'shape', variant: 'circle' },   text: "Cercle : observe depuis le soi ciel, laisse la réaction être là." },
  { id: 'shape-drop',     visual: { kind: 'shape', variant: 'drop' },     text: "Goutte : tu es l'observateur·trice, pas la réaction." },
  { id: 'shape-splatter', visual: { kind: 'shape', variant: 'splatter' }, text: "Éclaboussure : remarque ce qui se passe sans en être emporté·e." },
  { id: 'shape-complex',  visual: { kind: 'shape', variant: 'complex' },  text: "Forme complexe : tu es le ciel. Cette forme est de la météo." },

  // Module 6 — images
  { id: 'image-1', visual: { kind: 'image', level: 1 }, text: "Niveau 1 : composition abstraite. Observe les formes et les dégradés depuis ta position de soi observateur." },
  { id: 'image-2', visual: { kind: 'image', level: 2 }, text: "Niveau 2 : schéma médical. Contracte tes muscles, reste présent·e." },
  { id: 'image-3', visual: { kind: 'image', level: 3 }, text: "Niveau 3 : représentation médicale. Tu as tous les outils, tu sais pourquoi tu es là." },
  { id: 'image-4', visual: { kind: 'image', level: 4 }, text: "Niveau 4 : bras avec veine visible. Pas de matériel, pas d'aiguille. Juste l'anatomie." },
  { id: 'image-5', visual: { kind: 'image', level: 5 }, text: "Niveau 5 : matériel de prélèvement. Le plateau vu de dessus, avant toute procédure. Tension maintenue." },

  // Module 8 — vidéos
  { id: 'video-1', visual: { kind: 'video', src: 'https://www.youtube.com/watch?v=VYZXHU21TqQ' }, text: "Trouver les veines : une infirmière explique comment repérer et préparer une veine. Aucun sang visible." },
  { id: 'video-2', visual: { kind: 'video', src: 'https://www.youtube.com/watch?v=ep8QGJ144V8' }, text: "Prélèvement sanguin veineux : le protocole complet, de la préparation à la compresse finale." },
  { id: 'video-3', visual: { kind: 'video', src: 'https://www.youtube.com/watch?v=8Nx9l6rXx3Q' }, text: "Hémocultures : plusieurs tubes, plus de sang visible. L'exposition la plus intense de ce module." },
]

export function randomFiche(excludeId?: string): Fiche {
  const pool = excludeId ? FICHES.filter(f => f.id !== excludeId) : FICHES
  return pool[Math.floor(Math.random() * pool.length)]
}
