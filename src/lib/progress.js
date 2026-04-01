const KEY = 'bbb_progress'

function get() {
  try { return JSON.parse(localStorage.getItem(KEY)) || fresh() }
  catch { return fresh() }
}

function fresh() {
  return { xp: 0, completedModules: [], completedExercises: {}, journal: [], badges: [] }
}

function save(p) { localStorage.setItem(KEY, JSON.stringify(p)) }

export function getProgress() { return get() }

export function isModuleUnlocked(id) {
  if (id === 1) return true
  return get().completedModules.includes(id - 1)
}

export function isModuleCompleted(id) { return get().completedModules.includes(id) }

export function completeExercise(moduleId, exerciseIndex) {
  const p = get()
  if (!p.completedExercises[moduleId]) p.completedExercises[moduleId] = []
  if (!p.completedExercises[moduleId].includes(exerciseIndex)) {
    p.completedExercises[moduleId].push(exerciseIndex)
    p.xp += 50
  }
  save(p)
  return p.xp
}

export function completeModule(moduleId, bonusXP = 100) {
  const p = get()
  if (!p.completedModules.includes(moduleId)) {
    p.completedModules.push(moduleId)
    p.xp += bonusXP
    if (!p.badges.includes(`module_${moduleId}`)) p.badges.push(`module_${moduleId}`)
  }
  save(p)
  return p
}

export function addJournalEntry(moduleId, rating, note = '') {
  const p = get()
  p.journal.push({ moduleId, rating, note, date: new Date().toISOString() })
  save(p)
}

export function getTotalXP() { return get().xp }
export function getJournal() { return get().journal }
export function getBadgeIds() { return get().badges }
export function getCompletedModulesCount() { return get().completedModules.length }
