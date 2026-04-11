// ─── Exercises ───────────────────────────────────────────────────────────────

export interface ReadingExerciseData {
  type: 'reading'
  title: string
  content: string
  keyPoints?: string[]
}

export interface QuizQuestion {
  question: string
  options: string[]
  correct: number
  explanation: string
}

export interface QuizExerciseData {
  type: 'quiz'
  questions: QuizQuestion[]
}

export interface JournalExerciseData {
  type: 'journal'
  prompt: string
}

export interface BreathingExerciseData {
  type: 'breathing'
  technique: 'cardiac' | 'box' | '478'
  title: string
  description: string
}

export interface AppliedTensionExerciseData {
  type: 'applied_tension'
  title: string
  muscleGroup: string
  instruction: string
  rounds: number
}

export interface ColorItem {
  hex: string
  label: string
}

export interface ColorExposureExerciseData {
  type: 'color_exposure'
  colors: ColorItem[]
}

export interface ShapeItem {
  variant: 'circle' | 'drop' | 'splatter' | 'complex'
  label: string
}

export interface ShapeExposureExerciseData {
  type: 'shape_exposure'
  shapes: ShapeItem[]
}

export interface ImageExposureExerciseData {
  type: 'image_exposure'
  level: number
  title: string
  description: string
  images?: string[]
}

export interface ScenarioStep {
  instruction: string
  tip: string
}

export interface ScenarioExerciseData {
  type: 'scenario'
  title: string
  situation: string
  steps: ScenarioStep[]
}

export type ExerciseData =
  | ReadingExerciseData
  | QuizExerciseData
  | JournalExerciseData
  | BreathingExerciseData
  | AppliedTensionExerciseData
  | ColorExposureExerciseData
  | ShapeExposureExerciseData
  | ImageExposureExerciseData
  | ScenarioExerciseData

// ─── Badge ───────────────────────────────────────────────────────────────────

export interface Badge {
  id: string
  label: string
  icon: string
}

// ─── Module ──────────────────────────────────────────────────────────────────

export interface Module {
  id: number
  title: string
  subtitle: string
  description: string
  duration: string
  xpBonus: number
  badge: Badge
  exercises: ExerciseData[]
}

// ─── Progress ────────────────────────────────────────────────────────────────

export interface JournalEntry {
  moduleId: number
  rating: number
  note: string
  date: string
}

export interface Progress {
  xp: number
  completedModules: number[]
  completedExercises: Record<number, number[]>
  journal: JournalEntry[]
  badges: string[]
}

// ─── Profile ─────────────────────────────────────────────────────────────────

export interface Profile {
  id: string
  has_access: boolean
  stripe_session_id: string | null
  created_at: string
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string
  email: string | undefined
  user_metadata: {
    full_name?: string
    avatar_url?: string
  }
}
