import { supabase } from '@/lib/supabase'

/**
 * Vérifie un code d'accès invité pour la page de pratique (/pratique).
 * Passe par la fonction Postgres check_practice_code (SECURITY DEFINER) :
 * le client ne peut jamais lister les codes, seulement tester leur validité.
 */
export async function checkPracticeCode(code: string): Promise<boolean> {
  const { data, error } = await supabase.rpc('check_practice_code', { p_code: code.trim() })
  if (error) throw error
  return data === true
}
