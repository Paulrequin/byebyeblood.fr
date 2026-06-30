-- Supprime la politique qui permet aux utilisateurs de s'auto-attribuer has_access
-- Toutes les mises à jour de profiles passent par les Edge Functions (service role key)
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
