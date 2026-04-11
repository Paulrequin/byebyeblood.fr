-- ─── 1. Supprimer la colonne email redondante dans profiles ───────────────────
--        (l'email est déjà dans auth.users, inutile de le dupliquer)
ALTER TABLE profiles DROP COLUMN IF EXISTS email;

-- ─── 2. Table user_progress ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS user_progress (
  user_id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  xp                 INTEGER NOT NULL DEFAULT 0,
  completed_modules  INTEGER[] NOT NULL DEFAULT '{}',
  completed_exercises JSONB NOT NULL DEFAULT '{}',
  journal            JSONB NOT NULL DEFAULT '[]',
  badges             TEXT[] NOT NULL DEFAULT '{}',
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── 3. RLS ───────────────────────────────────────────────────────────────────
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own progress"
  ON user_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can upsert own progress"
  ON user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- ─── 4. Index pour les requêtes par user_id ───────────────────────────────────
CREATE INDEX IF NOT EXISTS user_progress_user_id_idx ON user_progress(user_id);
