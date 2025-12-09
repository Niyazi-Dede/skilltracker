import { getCompetence, updateCompetence } from '@/lib/actions/competences'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function EditCompetencePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { data: competence, error } = await getCompetence(id)

  if (error || !competence) {
    redirect('/dashboard/competences')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Modifier une compétence
          </h1>
          <p className="text-gray-600 mt-1">
            Modifiez les informations de votre compétence
          </p>
        </div>

        {/* Navigation */}
        <div className="mb-6">
          <Link
            href="/dashboard/competences"
            className="text-blue-600 hover:underline text-sm"
          >
            ← Retour à la liste
          </Link>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-lg shadow p-6">
          <form action={updateCompetence.bind(null, id)} className="space-y-6">
            {/* Nom */}
            <div>
              <label
                htmlFor="nom"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nom de la compétence *
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                required
                defaultValue={competence.nom}
                placeholder="Ex: React, Node.js, Photoshop..."
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
                defaultValue={competence.description || ''}
                placeholder="Décrivez votre expérience avec cette compétence..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Niveau */}
            <div>
              <label
                htmlFor="niveau"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Niveau de maîtrise *
              </label>
              <select
                id="niveau"
                name="niveau"
                required
                defaultValue={competence.niveau.toString()}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1">1 - Débutant</option>
                <option value="2">2 - Élémentaire</option>
                <option value="3">3 - Intermédiaire</option>
                <option value="4">4 - Avancé</option>
                <option value="5">5 - Expert</option>
              </select>
              <p className="mt-2 text-sm text-gray-500">
                1 = Débutant | 5 = Expert
              </p>
            </div>

            {/* Boutons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Enregistrer les modifications
              </button>
              <Link
                href="/dashboard/competences"
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
