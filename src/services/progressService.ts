import { supabase } from '@/lib/supabase'
import type { Progress, JournalEntry } from '@/types'

// ─── Types Supabase row ───────────────────────────────────────────────────────

interface ProgressRow {
  user_id: string
  xp: number
  completed_modules: number[]
  completed_exercises: Record<number, number[]>
  journal: JournalEntry[]
  badges: string[]
  updated_at: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function emptyProgress(): Progress {
  return { xp: 0, completedModules: [], completedExercises: {}, journal: [], badges: [] }
}

function rowToProgress(row: ProgressRow): Progress {
  return {
    xp: row.xp,
    completedModules: row.completed_modules,
    completedExercises: row.completed_exercises,
    journal: row.journal,
    badges: row.badges,
  }
}

// ─── API ─────────────────────────────────────────────────────────────────────

export async function fetchProgress(userId: string): Promise<Progress> {
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle()

  if (error) throw error
  if (!data) return emptyProgress()
  return rowToProgress(data as ProgressRow)
}

export async function saveProgress(userId: string, progress: Progress): Promise<void> {
  const { error } = await supabase
    .from('user_progress')
    .upsert({
      user_id: userId,
      xp: progress.xp,
      completed_modules: progress.completedModules,
      completed_exercises: progress.completedExercises,
      journal: progress.journal,
      badges: progress.badges,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' })

  if (error) throw error
}

export async function completeExercise(
  userId: string,
  progress: Progress,
  moduleId: number,
  exerciseIndex: number,
): Promise<Progress> {
  const next = structuredClone(progress)
  if (!next.completedExercises[moduleId]) next.completedExercises[moduleId] = []
  if (!next.completedExercises[moduleId].includes(exerciseIndex)) {
    next.completedExercises[moduleId].push(exerciseIndex)
    next.xp += 50
  }
  await saveProgress(userId, next)
  return next
}

export async function completeModule(
  userId: string,
  progress: Progress,
  moduleId: number,
  bonusXP = 100,
): Promise<Progress> {
  const next = structuredClone(progress)
  if (!next.completedModules.includes(moduleId)) {
    next.completedModules.push(moduleId)
    next.xp += bonusXP
    const badgeId = `module_${moduleId}`
    if (!next.badges.includes(badgeId)) next.badges.push(badgeId)
  }
  await saveProgress(userId, next)
  return next
}

export async function addJournalEntry(
  userId: string,
  progress: Progress,
  moduleId: number,
  rating: number,
  note = '',
): Promise<Progress> {
  const next = structuredClone(progress)
  next.journal.push({ moduleId, rating, note, date: new Date().toISOString() })
  await saveProgress(userId, next)
  return next
}
