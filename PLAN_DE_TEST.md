# Plan de Test - SkillTracker

## 1. Objectifs des tests
- Valider le bon fonctionnement des Server Actions
- Vérifier l'intégrité des composants React
- Assurer la sécurité des opérations CRUD
- Garantir une couverture minimale du code critique

## 2. Périmètre des tests

### 2.1 Tests unitaires
#### Server Actions
- ✅ `getCompetences()` : Récupération de la liste des compétences
- ✅ `getCompetence(id)` : Récupération d'une compétence par ID
- ⚪ `createCompetence()` : Création d'une nouvelle compétence
- ⚪ `updateCompetence()` : Mise à jour d'une compétence
- ⚪ `deleteCompetence()` : Suppression d'une compétence

#### Composants React
- ✅ `DeleteButton` : Bouton de suppression avec confirmation
- ⚪ Formulaires de création/édition
- ⚪ Pages de listing

### 2.2 Tests d'intégration
- ⚪ Authentification utilisateur
- ⚪ Workflow complet CRUD compétences
- ⚪ Workflow complet CRUD projets
- ⚪ Liaison projet-compétences

### 2.3 Tests de sécurité
- ⚪ Vérification RLS (Row Level Security)
- ⚪ Protection des routes authentifiées
- ⚪ Validation des inputs utilisateur

## 3. Environnement de test
- **Framework** : Jest + Testing Library
- **Environnement** : jsdom (simulation navigateur)
- **Mocks** : Supabase client, next/navigation

## 4. Critères de succès
- ✅ 2 tests de Server Actions passants
- ✅ 1 test de composant React passant
- ⚪ Couverture de code > 50% sur les fichiers critiques
- ⚪ 0 erreur sur `npm test`

## 5. Commandes de test
```bash
# Lancer tous les tests
npm test

# Mode watch (développement)
npm run test:watch

# Générer un rapport de couverture
npm run test:coverage
```

## 6. Scénarios de test prioritaires

### Scénario 1 : Gestion des compétences
1. Créer une nouvelle compétence
2. Lister les compétences
3. Modifier une compétence existante
4. Supprimer une compétence
5. Vérifier que la compétence n'existe plus

### Scénario 2 : Gestion des projets
1. Créer un nouveau projet
2. Lier des compétences au projet
3. Modifier le projet et ses compétences
4. Supprimer le projet
5. Vérifier la cascade de suppression

### Scénario 3 : Authentification
1. Inscription d'un nouvel utilisateur
2. Connexion avec email/mot de passe
3. Accès aux pages protégées
4. Déconnexion
5. Vérification de la redirection login

## 7. Résultats attendus
- Tous les tests unitaires doivent passer
- Les mocks doivent simuler correctement Supabase
- Aucune régression sur les fonctionnalités existantes

## 8. Non-couvert (hors périmètre)
- Tests E2E (Playwright/Cypress) - trop complexe pour MVP
- Tests de charge/performance - non nécessaire pour examen
- Tests de compatibilité navigateur - Next.js gère ça
- Tests visuels/snapshot - pas prioritaire

## 9. Maintenance
- Lancer les tests avant chaque commit
- Mettre à jour les tests lors de modifications fonctionnelles
- Ajouter des tests pour chaque nouveau bug corrigé

---

**Statut** : ✅ Plan validé - Tests de base implémentés
**Date** : 2025-12-09
**Couverture actuelle** : ~15% (Server Actions + 1 composant)
