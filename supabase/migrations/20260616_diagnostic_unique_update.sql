-- Supprime les doublons éventuels (garde la ligne la plus récente par user)
DELETE FROM public.diagnostic_results
WHERE id NOT IN (
  SELECT DISTINCT ON (user_id) id
  FROM public.diagnostic_results
  ORDER BY user_id, created_at DESC
);

-- Contrainte unique sur user_id (nécessaire pour l'upsert)
ALTER TABLE public.diagnostic_results
  ADD CONSTRAINT diagnostic_results_user_id_unique UNIQUE (user_id);

-- Politique UPDATE (manquante dans la migration initiale)
CREATE POLICY "Users can update their own diagnostic results"
  ON public.diagnostic_results
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
