import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/contexts/AuthContext'
import { getProfile } from '@/services/profileService'
import type { Profile } from '@/types'

export function useProfile() {
  const { user } = useAuth()

  return useQuery<Profile, Error>({
    queryKey: ['profile', user?.id],
    queryFn: () => getProfile(user!.id),
    enabled: !!user,
    staleTime: 1000 * 60 * 5, // 5 min
    retry: 2,
  })
}
