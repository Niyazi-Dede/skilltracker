import { getProjets } from '@/lib/actions/projets'
import Link from 'next/link'
import { DeleteButton } from './deleteButton'

export default async function ProjetsPage() {
  const { data: projets, error } = await getProjets()

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

  const getStatusBadge = (statut: string) => {
    const styles = {
      en_cours: 'bg-blue-100 text-blue-700',
      termine: 'bg-green-100 text-green-700',
      pause: 'bg-yellow-100 text-yellow-700'
    }
    const labels = {
      en_cours: 'En cours',
      termine: 'Terminé',
      pause: 'En pause'
    }
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${styles[statut as keyof typeof styles]}`}>
        {labels[statut as keyof typeof labels]}
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mes Projets</h1>
            <p className="text-gray-600 mt-1">
              Gérez vos projets et leurs compétences associées
            </p>
          </div>
          <Link
            href="/dashboard/projets/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            + Ajouter un projet
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

        {/* Liste des projets */}
        {!projets || projets.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500 mb-4">
              Vous n'avez pas encore de projets
            </p>
            <Link
              href="/dashboard/projets/new"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Créer votre premier projet
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {projets.map((projet) => (
              <div
                key={projet.id}
                className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {projet.nom}
                      </h3>
                      {getStatusBadge(projet.statut)}
                    </div>

                    {projet.description && (
                      <p className="text-gray-600 mb-4">
                        {projet.description}
                      </p>
                    )}

                    <div className="flex gap-4 text-sm text-gray-500">
                      {projet.date_debut && (
                        <div>
                          <span className="font-medium">Début :</span>{' '}
                          {new Date(projet.date_debut).toLocaleDateString('fr-FR')}
                        </div>
                      )}
                      {projet.date_fin && (
                        <div>
                          <span className="font-medium">Fin :</span>{' '}
                          {new Date(projet.date_fin).toLocaleDateString('fr-FR')}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Link
                      href={`/dashboard/projets/${projet.id}/edit`}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded hover:bg-gray-200 text-sm"
                    >
                      Modifier
                    </Link>
                    <DeleteButton id={projet.id} />
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
