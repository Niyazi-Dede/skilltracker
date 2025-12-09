import { render, screen, fireEvent } from '@testing-library/react'
import { DeleteButton } from './deleteButton'

// Mock de la fonction deleteCompetence
jest.mock('@/lib/actions/competences', () => ({
  deleteCompetence: jest.fn(() => Promise.resolve({ error: null }))
}))

// Mock de window.confirm
global.confirm = jest.fn(() => true)

describe('DeleteButton Component', () => {
  it('devrait afficher le bouton de suppression', () => {
    render(<DeleteButton id="test-id" />)

    const button = screen.getByRole('button', { name: /supprimer/i })
    expect(button).toBeInTheDocument()
  })

  it('devrait afficher une confirmation avant suppression', () => {
    render(<DeleteButton id="test-id" />)

    const button = screen.getByRole('button', { name: /supprimer/i })
    fireEvent.click(button)

    expect(global.confirm).toHaveBeenCalledWith('Êtes-vous sûr de vouloir supprimer cette compétence ?')
  })
})
