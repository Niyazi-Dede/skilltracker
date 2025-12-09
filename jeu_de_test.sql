-- ============================================
-- SKILLTRACKER - SCRIPT COMPLET D'INITIALISATION
-- Email: niyazidedepro@gmail.com
-- ============================================

-- 1. NETTOYAGE (si besoin de recommencer)
-- ============================================
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP TABLE IF EXISTS projet_competences CASCADE;
DROP TABLE IF EXISTS projets CASCADE;
DROP TABLE IF EXISTS competences CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- 2. CRÉATION DES TABLES
-- ============================================

-- Table profils utilisateurs
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table compétences
CREATE TABLE competences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  nom TEXT NOT NULL,
  description TEXT,
  niveau INTEGER CHECK (niveau >= 1 AND niveau <= 5) DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table projets
CREATE TABLE projets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  nom TEXT NOT NULL,
  description TEXT,
  date_debut DATE,
  date_fin DATE,
  statut TEXT CHECK (statut IN ('en_cours', 'termine', 'pause')) DEFAULT 'en_cours',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table de liaison projets <-> compétences (Many-to-Many)
CREATE TABLE projet_competences (
  projet_id UUID REFERENCES projets(id) ON DELETE CASCADE,
  competence_id UUID REFERENCES competences(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (projet_id, competence_id)
);

-- 3. INDEX POUR PERFORMANCES
-- ============================================
CREATE INDEX idx_competences_user_id ON competences(user_id);
CREATE INDEX idx_projets_user_id ON projets(user_id);
CREATE INDEX idx_projet_competences_projet ON projet_competences(projet_id);
CREATE INDEX idx_projet_competences_competence ON projet_competences(competence_id);

-- 4. ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE competences ENABLE ROW LEVEL SECURITY;
ALTER TABLE projets ENABLE ROW LEVEL SECURITY;
ALTER TABLE projet_competences ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour PROFILES
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Politiques RLS pour COMPETENCES
CREATE POLICY "Users can view own competences"
  ON competences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own competences"
  ON competences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own competences"
  ON competences FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own competences"
  ON competences FOR DELETE
  USING (auth.uid() = user_id);

-- Politiques RLS pour PROJETS
CREATE POLICY "Users can view own projets"
  ON projets FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own projets"
  ON projets FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projets"
  ON projets FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projets"
  ON projets FOR DELETE
  USING (auth.uid() = user_id);

-- Politiques RLS pour PROJET_COMPETENCES
CREATE POLICY "Users can view own projet_competences"
  ON projet_competences FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM projets
      WHERE projets.id = projet_competences.projet_id
      AND projets.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own projet_competences"
  ON projet_competences FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projets
      WHERE projets.id = projet_competences.projet_id
      AND projets.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own projet_competences"
  ON projet_competences FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM projets
      WHERE projets.id = projet_competences.projet_id
      AND projets.user_id = auth.uid()
    )
  );

-- 5. FONCTION ET TRIGGER : Création automatique du profil
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 6. CRÉATION DU PROFIL POUR L'UTILISATEUR EXISTANT
-- ============================================
-- Si l'utilisateur existe déjà dans auth.users, créer son profil
INSERT INTO profiles (id, email, full_name)
SELECT id, email, COALESCE(raw_user_meta_data->>'full_name', '')
FROM auth.users
WHERE email = 'niyazidedepro@gmail.com'
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 7. DONNÉES DE TEST
-- ============================================
DO $$
DECLARE
  user_uuid UUID;
BEGIN
  -- Récupérer l'UUID de l'utilisateur
  SELECT id INTO user_uuid
  FROM auth.users
  WHERE email = 'niyazidedepro@gmail.com';

  -- Vérifier que l'utilisateur existe
  IF user_uuid IS NULL THEN
    RAISE EXCEPTION 'Utilisateur non trouvé. Créez d''abord un compte avec l''email: niyazidedepro@gmail.com';
  END IF;

  -- Insertion de compétences
  INSERT INTO competences (user_id, nom, description, niveau) VALUES
    (user_uuid, 'React', 'Framework JavaScript pour créer des interfaces utilisateur modernes et réactives', 4),
    (user_uuid, 'Node.js', 'Environnement d''exécution JavaScript côté serveur pour créer des APIs', 3),
    (user_uuid, 'PostgreSQL', 'Système de gestion de base de données relationnelle puissant et fiable', 3),
    (user_uuid, 'TypeScript', 'Superset typé de JavaScript pour un code plus robuste', 4),
    (user_uuid, 'Tailwind CSS', 'Framework CSS utilitaire pour un développement rapide', 5),
    (user_uuid, 'Next.js', 'Framework React pour des applications web performantes', 4),
    (user_uuid, 'Git', 'Système de contrôle de version distribué', 4),
    (user_uuid, 'Docker', 'Plateforme de conteneurisation pour le déploiement d''applications', 2),
    (user_uuid, 'Python', 'Langage de programmation polyvalent pour le développement backend', 3),
    (user_uuid, 'API REST', 'Conception et développement d''interfaces de programmation RESTful', 4);

  -- Insertion de projets
  INSERT INTO projets (user_id, nom, description, date_debut, date_fin, statut) VALUES
    (user_uuid, 'SkillTracker', 'Plateforme de suivi de compétences pour étudiants CDA. Application complète avec authentification, CRUD, et dashboard statistiques.', '2025-01-01', NULL, 'en_cours'),
    (user_uuid, 'Portfolio Personnel', 'Site web portfolio professionnel présentant mes projets et compétences', '2024-11-01', '2024-12-15', 'termine'),
    (user_uuid, 'E-Commerce Platform', 'Application e-commerce complète avec panier, paiement et gestion des commandes', '2024-09-01', '2024-11-30', 'termine'),
    (user_uuid, 'Blog API', 'API RESTful pour un blog avec authentification JWT et gestion des articles', '2024-08-01', NULL, 'pause'),
    (user_uuid, 'Task Manager', 'Application de gestion de tâches avec système de priorités et notifications', '2024-12-01', NULL, 'en_cours');

  -- Liaison des compétences aux projets
  -- Pour SkillTracker
  INSERT INTO projet_competences (projet_id, competence_id)
  SELECT
    p.id,
    c.id
  FROM projets p
  CROSS JOIN competences c
  WHERE p.nom = 'SkillTracker'
    AND p.user_id = user_uuid
    AND c.user_id = user_uuid
    AND c.nom IN ('React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Node.js');

  -- Pour Portfolio Personnel
  INSERT INTO projet_competences (projet_id, competence_id)
  SELECT
    p.id,
    c.id
  FROM projets p
  CROSS JOIN competences c
  WHERE p.nom = 'Portfolio Personnel'
    AND p.user_id = user_uuid
    AND c.user_id = user_uuid
    AND c.nom IN ('React', 'Next.js', 'Tailwind CSS', 'TypeScript');

  -- Pour E-Commerce Platform
  INSERT INTO projet_competences (projet_id, competence_id)
  SELECT
    p.id,
    c.id
  FROM projets p
  CROSS JOIN competences c
  WHERE p.nom = 'E-Commerce Platform'
    AND p.user_id = user_uuid
    AND c.user_id = user_uuid
    AND c.nom IN ('React', 'Node.js', 'PostgreSQL', 'API REST', 'TypeScript');

  -- Pour Blog API
  INSERT INTO projet_competences (projet_id, competence_id)
  SELECT
    p.id,
    c.id
  FROM projets p
  CROSS JOIN competences c
  WHERE p.nom = 'Blog API'
    AND p.user_id = user_uuid
    AND c.user_id = user_uuid
    AND c.nom IN ('Node.js', 'PostgreSQL', 'API REST', 'TypeScript');

  -- Pour Task Manager
  INSERT INTO projet_competences (projet_id, competence_id)
  SELECT
    p.id,
    c.id
  FROM projets p
  CROSS JOIN competences c
  WHERE p.nom = 'Task Manager'
    AND p.user_id = user_uuid
    AND c.user_id = user_uuid
    AND c.nom IN ('React', 'Node.js', 'PostgreSQL', 'TypeScript', 'Tailwind CSS');

  -- Message de succès
  RAISE NOTICE 'Données de test insérées avec succès pour l''utilisateur % (UUID: %)', 'niyazidedepro@gmail.com', user_uuid;
END $$;

-- ============================================
-- 8. VÉRIFICATION DES DONNÉES INSÉRÉES
-- ============================================

-- Résumé complet
SELECT
  (SELECT COUNT(*) FROM competences WHERE user_id = (SELECT id FROM auth.users WHERE email = 'niyazidedepro@gmail.com')) as nb_competences,
  (SELECT COUNT(*) FROM projets WHERE user_id = (SELECT id FROM auth.users WHERE email = 'niyazidedepro@gmail.com')) as nb_projets,
  (SELECT COUNT(*) FROM projet_competences pc JOIN projets p ON p.id = pc.projet_id WHERE p.user_id = (SELECT id FROM auth.users WHERE email = 'niyazidedepro@gmail.com')) as nb_liaisons;

-- Voir toutes les compétences
SELECT nom, niveau, description
FROM competences
WHERE user_id = (SELECT id FROM auth.users WHERE email = 'niyazidedepro@gmail.com')
ORDER BY niveau DESC;

-- Voir tous les projets avec le nombre de compétences associées
SELECT
  p.nom,
  p.statut,
  p.date_debut,
  p.date_fin,
  COUNT(pc.competence_id) as nb_competences
FROM projets p
LEFT JOIN projet_competences pc ON p.id = pc.projet_id
WHERE p.user_id = (SELECT id FROM auth.users WHERE email = 'niyazidedepro@gmail.com')
GROUP BY p.id, p.nom, p.statut, p.date_debut, p.date_fin
ORDER BY p.created_at DESC;
