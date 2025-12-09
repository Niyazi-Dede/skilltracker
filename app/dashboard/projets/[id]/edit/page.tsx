import { getProjetWithCompetences, updateProjet, getUserCompetences } from '@/lib/actions/projets'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import type { Competence } from '@/types/database'

export default async function EditProjetPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { data: projet, error } = await getProjetWithCompetences(id)
  const { data: allCompetences } = await getUserCompetences()

  if (error || !projet) {
    redirect('/dashboard/projets')
  }

  const linkedCompetenceIds = projet.competences?.map((c: Competence) => c.id) || []

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Modifier un projet
          </h1>
          <p className="text-gray-600 mt-1">
            Modifiez les informations de votre projet
          </p>
        </div>

        {/* Navigation */}
        <div className="mb-6">
          <Link
            href="/dashboard/projets"
            className="text-blue-600 hover:underline text-sm"
          >
            ← Retour à la liste
          </Link>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-lg shadow p-6">
          <form action={updateProjet.bind(null, id)} className="space-y-6">
            {/* Nom */}
            <div>
              <label
                htmlFor="nom"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nom du projet *
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                required
                defaultValue={projet.nom}
                placeholder="Ex: Application de gestion, Site e-commerce..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                defaultValue={projet.description || ''}
                placeholder="Décrivez votre projet, ses objectifs, les technologies utilisées..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="date_debut"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Date de début
                </label>
                <input
                  type="date"
                  id="date_debut"
                  name="date_debut"
                  defaultValue={projet.date_debut || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="date_fin"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Date de fin
                </label>
                <input
                  type="date"
                  id="date_fin"
                  name="date_fin"
                  defaultValue={projet.date_fin || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Statut */}
            <div>
              <label
                htmlFor="statut"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Statut *
              </label>
              <select
                id="statut"
                name="statut"
                required
                defaultValue={projet.statut}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="en_cours">En cours</option>
                <option value="termine">Terminé</option>
                <option value="pause">En pause</option>
              </select>
            </div>

            {/* Compétences */}
            {allCompetences && allCompetences.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Compétences associées
                </label>
                <div className="border border-gray-300 rounded-md p-4 max-h-60 overflow-y-auto">
                  <div className="space-y-2">
                    {allCompetences.map((competence) => (
                      <label
                        key={competence.id}
                        className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          name="competence_ids"
                          value={competence.id}
                          defaultChecked={linkedCompetenceIds.includes(competence.id)}
                          className="mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <div>
                          <div className="font-medium text-gray-900">
                            {competence.nom}
                          </div>
                          {competence.description && (
                            <div className="text-sm text-gray-500">
                              {competence.description}
                            </div>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Sélectionnez les compétences utilisées dans ce projet
                </p>
              </div>
            )}

            {(!allCompetences || allCompetences.length === 0) && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <p className="text-yellow-800 text-sm">
                  Vous n'avez pas encore de compétences.{' '}
                  <Link
                    href="/dashboard/competences/new"
                    className="font-medium underline"
                  >
                    Créer une compétence
                  </Link>
                </p>
              </div>
            )}

            {/* Boutons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Enregistrer les modifications
              </button>
              <Link
                href="/dashboard/projets"
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors text-center"
              >
                Annuler
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
