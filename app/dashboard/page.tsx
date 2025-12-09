import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getDashboardStats } from '@/lib/actions/dashboard'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/login')
  }

  // Récupérer le profil utilisateur
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.id)
    .single()

  const { data: stats } = await getDashboardStats()

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Tableau de bord
          </h1>
          <p className="text-gray-600 mt-1">
            Bienvenue {profile?.full_name || user.email}
          </p>
        </div>

        {/* Statistiques */}
        {stats && (
          <>
            {/* Cartes de statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Compétences</p>
                    <p className="text-3xl font-bold text-blue-600">
                      {stats.totalCompetences}
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Projets</p>
                    <p className="text-3xl font-bold text-green-600">
                      {stats.totalProjets}
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Projets en cours</p>
                    <p className="text-3xl font-bold text-yellow-600">
                      {stats.projetsEnCours}
                    </p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Projets terminés</p>
                    <p className="text-3xl font-bold text-purple-600">
                      {stats.projetsTermines}
                    </p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Répartition des compétences par niveau */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Répartition des compétences par niveau
              </h2>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((niveau) => {
                  const count = stats.niveauxRepartition[`niveau${niveau}` as keyof typeof stats.niveauxRepartition]
                  const percentage = stats.totalCompetences > 0
                    ? (count / stats.totalCompetences) * 100
                    : 0
                  return (
                    <div key={niveau}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Niveau {niveau}</span>
                        <span className="font-medium text-gray-900">{count}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Activité récente */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Dernières compétences */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Dernières compétences
                  </h2>
                  <Link
                    href="/dashboard/competences"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Voir tout
                  </Link>
                </div>
                {stats.dernieresCompetences.length > 0 ? (
                  <div className="space-y-3">
                    {stats.dernieresCompetences.map((competence) => (
                      <div key={competence.id} className="border-l-4 border-blue-600 pl-3 py-1">
                        <div className="font-medium text-gray-900">{competence.nom}</div>
                        <div className="text-sm text-gray-500">
                          Niveau {competence.niveau}/5
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Aucune compétence</p>
                )}
              </div>

              {/* Derniers projets */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Derniers projets
                  </h2>
                  <Link
                    href="/dashboard/projets"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Voir tout
                  </Link>
                </div>
                {stats.derniersProjets.length > 0 ? (
                  <div className="space-y-3">
                    {stats.derniersProjets.map((projet) => (
                      <div key={projet.id} className="border-l-4 border-green-600 pl-3 py-1">
                        <div className="font-medium text-gray-900">{projet.nom}</div>
                        <div className="text-sm text-gray-500">
                          {projet.statut === 'en_cours' && 'En cours'}
                          {projet.statut === 'termine' && 'Terminé'}
                          {projet.statut === 'pause' && 'En pause'}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Aucun projet</p>
                )}
              </div>
            </div>
          </>
        )}

        {/* Actions rapides */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Actions rapides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/dashboard/competences"
              className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium text-gray-900">Compétences</span>
            </Link>

            <Link
              href="/dashboard/projets"
              className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all"
            >
              <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              <span className="font-medium text-gray-900">Projets</span>
            </Link>

            <Link
              href="/dashboard/competences/new"
              className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="font-medium text-gray-900">Nouvelle compétence</span>
            </Link>

            <Link
              href="/dashboard/projets/new"
              className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all"
            >
              <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="font-medium text-gray-900">Nouveau projet</span>
            </Link>
          </div>
        </div>

        {/* Déconnexion */}
        <div className="bg-white rounded-lg shadow p-6">
          <form action="/api/auth/signout" method="POST">
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Se déconnecter
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
