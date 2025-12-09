export interface Profile {
  id: string
  email: string
  full_name: string | null
  created_at: string
  updated_at: string
}

export interface Competence {
  id: string
  user_id: string
  nom: string
  description: string | null
  niveau: number
  created_at: string
  updated_at: string
}

export interface Projet {
  id: string
  user_id: string
  nom: string
  description: string | null
  date_debut: string | null
  date_fin: string | null
  statut: 'en_cours' | 'termine' | 'pause'
  created_at: string
  updated_at: string
}

export interface ProjetCompetence {
  projet_id: string
  competence_id: string
  created_at: string
}

// Types pour les projets avec leurs compétences liées
export interface ProjetWithCompetences extends Projet {
  competences?: Competence[]
}

// Types pour les formulaires
export interface CompetenceFormData {
  nom: string
  description?: string
  niveau: number
}

export interface ProjetFormData {
  nom: string
  description?: string
  date_debut?: string
  date_fin?: string
  statut: 'en_cours' | 'termine' | 'pause'
  competence_ids?: string[]
}
