'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// Récupérer toutes les compétences de l'utilisateur
export async function getCompetences() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { data: null, error: 'Non authentifié' }
  }

  const { data, error } = await supabase
    .from('competences')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return { data, error }
}

// Récupérer une compétence par ID
export async function getCompetence(id: string) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { data: null, error: 'Non authentifié' }
  }

  const { data, error } = await supabase
    .from('competences')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  return { data, error }
}

// Créer une compétence
export async function createCompetence(formData: FormData) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  const nom = formData.get('nom') as string
  const description = formData.get('description') as string
  const niveau = parseInt(formData.get('niveau') as string)

  const { error } = await supabase
    .from('competences')
    .insert({
      user_id: user.id,
      nom,
      description,
      niveau
    })

  if (error) {
    console.error('Error creating competence:', error)
  }

  revalidatePath('/dashboard/competences')
  redirect('/dashboard/competences')
}

// Mettre à jour une compétence
export async function updateCompetence(id: string, formData: FormData) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  const nom = formData.get('nom') as string
  const description = formData.get('description') as string
  const niveau = parseInt(formData.get('niveau') as string)

  const { error } = await supabase
    .from('competences')
    .update({
      nom,
      description,
      niveau,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    console.error('Error updating competence:', error)
  }

  revalidatePath('/dashboard/competences')
  redirect('/dashboard/competences')
}

// Supprimer une compétence
export async function deleteCompetence(id: string) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  const { error } = await supabase
    .from('competences')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/competences')
}