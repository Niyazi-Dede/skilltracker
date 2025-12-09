import { getCompetences } from '@/lib/actions/competences'
import Link from 'next/link'
import { DeleteButton } from './deleteButton'

export default async function CompetencesPage() {
  const { data: competences, error } = await getCompetences()

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 text-red-500 p-4 rounded">
            Erreur : {String(error)}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mes Compétences</h1>
            <p className="text-gray-600 mt-1">
              Gérez vos compétences professionnelles
            </p>
          </div>
          <Link
            href="/dashboard/competences/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            + Ajouter une compétence
          </Link>
        </div>

        {/* Navigation */}
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="text-blue-600 hover:underline text-sm"
          >
            ← Retour au tableau de bord
          </Link>
        </div>

        {/* Liste des compétences */}
        {!competences || competences.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500 mb-4">
              Vous n'avez pas encore de compétences
            </p>
            <Link
              href="/dashboard/competences/new"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Créer votre première compétence
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {competences.map((competence) => (
              <div
                key={competence.id}
                className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {competence.nom}
                    </h3>
                    {competence.description && (
                      <p className="text-gray-600 mb-4">
                        {competence.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Niveau :</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`h-2 w-8 rounded ${
                              level <= competence.niveau
                                ? 'bg-blue-600'
                                : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {competence.niveau}/5
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Link
                      href={`/dashboard/competences/${competence.id}/edit`}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded hover:bg-gray-200 text-sm"
                    >
                      Modifier
                    </Link>
                    <DeleteButton id={competence.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}