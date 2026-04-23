CREATE TABLE IF NOT EXISTS public.diagnostic_results (
  id            uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id       uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  score_total   integer     NOT NULL CHECK (score_total >= 0 AND score_total <= 80),
  profil        text        NOT NULL,
  scores_details jsonb      NOT NULL DEFAULT '{}',
  created_at    timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.diagnostic_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own diagnostic results"
  ON public.diagnostic_results
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read their own diagnostic results"
  ON public.diagnostic_results
  FOR SELECT
  USING (auth.uid() = user_id);
