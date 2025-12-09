'use server'

import { createClient } from '@/lib/supabase/server'

export async function getDashboardStats() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { data: null, error: 'Non authentifié' }
  }

  // Récupérer le nombre de compétences
  const { count: competencesCount } = await supabase
    .from('competences')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  // Récupérer le nombre de projets
  const { count: projetsCount } = await supabase
    .from('projets')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  // Récupérer le nombre de projets par statut
  const { data: projetsEnCours } = await supabase
    .from('projets')
    .select('id')
    .eq('user_id', user.id)
    .eq('statut', 'en_cours')

  const { data: projetsTermines } = await supabase
    .from('projets')
    .select('id')
    .eq('user_id', user.id)
    .eq('statut', 'termine')

  // Récupérer la répartition des compétences par niveau
  const { data: competences } = await supabase
    .from('competences')
    .select('niveau')
    .eq('user_id', user.id)

  const niveauxRepartition = {
    niveau1: 0,
    niveau2: 0,
    niveau3: 0,
    niveau4: 0,
    niveau5: 0,
  }

  competences?.forEach(comp => {
    niveauxRepartition[`niveau${comp.niveau}` as keyof typeof niveauxRepartition]++
  })

  // Récupérer les derniers projets
  const { data: derniersProjets } = await supabase
    .from('projets')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(3)

  // Récupérer les dernières compétences
  const { data: dernieresCompetences } = await supabase
    .from('competences')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(3)

  return {
    data: {
      totalCompetences: competencesCount || 0,
      totalProjets: projetsCount || 0,
      projetsEnCours: projetsEnCours?.length || 0,
      projetsTermines: projetsTermines?.length || 0,
      niveauxRepartition,
      derniersProjets: derniersProjets || [],
      dernieresCompetences: dernieresCompetences || []
    },
    error: null
  }
}
