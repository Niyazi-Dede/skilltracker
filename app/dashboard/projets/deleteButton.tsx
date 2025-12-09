'use client'

import { deleteProjet } from '@/lib/actions/projets'
import { useState } from 'react'

export function DeleteButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      return
    }

    setIsDeleting(true)
    await deleteProjet(id)
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 text-sm disabled:opacity-50"
    >
      {isDeleting ? 'Suppression...' : 'Supprimer'}
    </button>
  )
}
