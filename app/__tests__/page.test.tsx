import { render, screen } from '@testing-library/react'
import HomePage from '../page'

describe('HomePage', () => {
  it('should render the main heading', () => {
    render(<HomePage />)
    const heading = screen.getByRole('heading', { level: 1, name: /Suivez vos compétences et propulsez votre carrière/i })
    expect(heading).toBeInTheDocument()
  })

  it('should render navigation buttons', () => {
    render(<HomePage />)
    const links = screen.getAllByRole('link', { name: /Connexion/i })
    const commencerLinks = screen.getAllByRole('link', { name: /Commencer/i })

    expect(links.length).toBeGreaterThan(0)
    expect(commencerLinks.length).toBeGreaterThan(0)
  })

  it('should render the SkillTracker logo in navigation', () => {
    render(<HomePage />)
    const logos = screen.getAllByText('SkillTracker')
    // Il devrait y avoir au moins 2 occurrences (nav + footer)
    expect(logos.length).toBeGreaterThanOrEqual(2)
  })

  it('should render all three feature cards', () => {
    render(<HomePage />)

    expect(screen.getByText('Gestion des compétences')).toBeInTheDocument()
    expect(screen.getByText('Suivi de projets')).toBeInTheDocument()
    expect(screen.getByText('Statistiques détaillées')).toBeInTheDocument()
  })

  it('should render the call-to-action section', () => {
    render(<HomePage />)
    const ctaHeading = screen.getByText(/Prêt à booster votre carrière/i)
    expect(ctaHeading).toBeInTheDocument()
  })

  it('should render footer with project description', () => {
    render(<HomePage />)
    const footerText = screen.getByText(/Projet créé dans le cadre de la formation Concepteur Développeur d'Applications/i)
    expect(footerText).toBeInTheDocument()
  })
})
