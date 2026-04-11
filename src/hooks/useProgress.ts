import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/contexts/AuthContext'
import {
  fetchProgress,
  completeExercise,
  completeModule,
  addJournalEntry,
} from '@/services/progressService'
import type { Progress } from '@/types'

const QUERY_KEY = (userId: string) => ['progress', userId]

const EMPTY_PROGRESS: Progress = {
  xp: 0,
  completedModules: [],
  completedExercises: {},
  journal: [],
  badges: [],
}

export function useProgress() {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const query = useQuery<Progress, Error>({
    queryKey: QUERY_KEY(user?.id ?? ''),
    queryFn: () => fetchProgress(user!.id),
    enabled: !!user,
    staleTime: 1000 * 30,
    retry: 2,
  })

  const progress = query.data ?? EMPTY_PROGRESS

  // Lit le progress depuis le cache au moment de la mutation (évite les stale closures)
  function currentProgress(): Progress {
    return queryClient.getQueryData<Progress>(QUERY_KEY(user?.id ?? '')) ?? EMPTY_PROGRESS
  }

  const exerciseMutation = useMutation({
    mutationFn: ({ moduleId, exerciseIndex }: { moduleId: number; exerciseIndex: number }) =>
      completeExercise(user!.id, currentProgress(), moduleId, exerciseIndex),
    onSuccess: (next) => {
      if (user) queryClient.setQueryData(QUERY_KEY(user.id), next)
    },
  })

  const moduleMutation = useMutation({
    mutationFn: ({ moduleId, bonusXP }: { moduleId: number; bonusXP?: number }) =>
      completeModule(user!.id, currentProgress(), moduleId, bonusXP),
    onSuccess: (next) => {
      if (user) queryClient.setQueryData(QUERY_KEY(user.id), next)
    },
  })

  const journalMutation = useMutation({
    mutationFn: ({ moduleId, rating, note }: { moduleId: number; rating: number; note?: string }) =>
      addJournalEntry(user!.id, currentProgress(), moduleId, rating, note),
    onSuccess: (next) => {
      if (user) queryClient.setQueryData(QUERY_KEY(user.id), next)
    },
  })

  return {
    progress,
    isLoading: query.isLoading,
    isError: query.isError,
    completeExercise: (moduleId: number, exerciseIndex: number) =>
      exerciseMutation.mutateAsync({ moduleId, exerciseIndex }),
    completeModule: (moduleId: number, bonusXP?: number) =>
      moduleMutation.mutateAsync({ moduleId, bonusXP }),
    addJournalEntry: (moduleId: number, rating: number, note?: string) =>
      journalMutation.mutateAsync({ moduleId, rating, note }),
    isModuleCompleted: (id: number) => progress.completedModules.includes(id),
    isModuleUnlocked: (id: number) => id === 1 || progress.completedModules.includes(id - 1),
  }
}
