-- Ajoute une contrainte unique sur user_id pour permettre l'upsert
-- et une politique UPDATE pour que les utilisateurs puissent modifier leurs résultats

ALTER TABLE public.diagnostic_results
  ADD CONSTRAINT diagnostic_results_user_id_unique UNIQUE (user_id);

CREATE POLICY "Users can update their own diagnostic results"
  ON public.diagnostic_results
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
