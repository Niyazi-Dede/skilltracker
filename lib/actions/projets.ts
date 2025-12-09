'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// Récupérer tous les projets de l'utilisateur
export async function getProjets() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { data: null, error: 'Non authentifié' }
  }

  const { data, error } = await supabase
    .from('projets')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return { data, error }
}

// Récupérer un projet par ID
export async function getProjet(id: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { data: null, error: 'Non authentifié' }
  }

  const { data, error } = await supabase
    .from('projets')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  return { data, error }
}

// Récupérer un projet avec ses compétences liées
export async function getProjetWithCompetences(id: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { data: null, error: 'Non authentifié' }
  }

  // Récupérer le projet
  const { data: projet, error: projetError } = await supabase
    .from('projets')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (projetError) {
    return { data: null, error: projetError }
  }

  // Récupérer les compétences liées
  const { data: projetCompetences, error: pcError } = await supabase
    .from('projet_competences')
    .select('competence_id')
    .eq('projet_id', id)

  if (pcError) {
    return { data: projet, error: null }
  }

  const competenceIds = projetCompetences.map(pc => pc.competence_id)

  if (competenceIds.length > 0) {
    const { data: competences } = await supabase
      .from('competences')
      .select('*')
      .in('id', competenceIds)

    return { data: { ...projet, competences }, error: null }
  }

  return { data: { ...projet, competences: [] }, error: null }
}

// Créer un projet
export async function createProjet(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const nom = formData.get('nom') as string
  const description = formData.get('description') as string
  const date_debut = formData.get('date_debut') as string
  const date_fin = formData.get('date_fin') as string
  const statut = formData.get('statut') as string
  const competenceIds = formData.getAll('competence_ids') as string[]

  // Créer le projet
  const { data: projet, error } = await supabase
    .from('projets')
    .insert({
      user_id: user.id,
      nom,
      description,
      date_debut: date_debut || null,
      date_fin: date_fin || null,
      statut
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating projet:', error)
    redirect('/dashboard/projets')
  }

  // Lier les compétences au projet
  if (competenceIds && competenceIds.length > 0) {
    const projetCompetences = competenceIds.map(competenceId => ({
      projet_id: projet.id,
      competence_id: competenceId
    }))

    await supabase
      .from('projet_competences')
      .insert(projetCompetences)
  }

  revalidatePath('/dashboard/projets')
  redirect('/dashboard/projets')
}

// Mettre à jour un projet
export async function updateProjet(id: string, formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const nom = formData.get('nom') as string
  const description = formData.get('description') as string
  const date_debut = formData.get('date_debut') as string
  const date_fin = formData.get('date_fin') as string
  const statut = formData.get('statut') as string
  const competenceIds = formData.getAll('competence_ids') as string[]

  // Mettre à jour le projet
  const { error } = await supabase
    .from('projets')
    .update({
      nom,
      description,
      date_debut: date_debut || null,
      date_fin: date_fin || null,
      statut,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    console.error('Error updating projet:', error)
  }

  // Supprimer les anciennes liaisons
  await supabase
    .from('projet_competences')
    .delete()
    .eq('projet_id', id)

  // Créer les nouvelles liaisons
  if (competenceIds && competenceIds.length > 0) {
    const projetCompetences = competenceIds.map(competenceId => ({
      projet_id: id,
      competence_id: competenceId
    }))

    await supabase
      .from('projet_competences')
      .insert(projetCompetences)
  }

  revalidatePath('/dashboard/projets')
  redirect('/dashboard/projets')
}

// Supprimer un projet
export async function deleteProjet(id: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { error } = await supabase
    .from('projets')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/projets')
}

// Récupérer toutes les compétences de l'utilisateur (pour les formulaires)
export async function getUserCompetences() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { data: null, error: 'Non authentifié' }
  }

  const { data, error } = await supabase
    .from('competences')
    .select('*')
    .eq('user_id', user.id)
    .order('nom', { ascending: true })

  return { data, error }
}
