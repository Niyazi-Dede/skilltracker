# Critères du Titre Professionnel CDA (Concepteur Développeur d'Applications)

## 📋 Vue d'ensemble

Le titre professionnel **Concepteur Développeur d'Applications** est un diplôme de **niveau 6** (équivalent Bac+3/4) qui certifie les compétences en conception et développement d'applications informatiques.

## 🎯 Les 11 compétences obligatoires

### Bloc 1 : Développer une application sécurisée

#### 1. Installer et configurer son environnement de travail en fonction du projet
- Mettre en place l'environnement de développement
- Installer et configurer les outils nécessaires
- Gérer les versions avec Git

#### 2. Développer des interfaces utilisateur
- Créer des interfaces web responsives
- Utiliser des frameworks frontend (React, Next.js, etc.)
- Respecter les normes d'accessibilité

#### 3. Développer des composants métier
- Implémenter la logique métier
- Créer des composants réutilisables
- Gérer les états et les flux de données

#### 4. Contribuer à la gestion d'un projet informatique
- Utiliser des outils de gestion de projet
- Documenter le code et les processus
- Collaborer en équipe

---

### Bloc 2 : Concevoir et développer une application sécurisée organisée en couches

#### 5. Analyser les besoins et maquetter une application
- Recueillir les besoins utilisateur
- Créer des maquettes et prototypes
- Définir les user stories

#### 6. Définir l'architecture logicielle d'une application
- Concevoir l'architecture technique
- Choisir les patterns de conception
- Définir les couches applicatives

#### 7. Concevoir et mettre en place une base de données relationnelle
- Modéliser les données (MCD, MLD)
- Créer les tables et relations
- Mettre en place les contraintes et index

#### 8. Développer des composants d'accès aux données SQL et NoSQL
- Créer des requêtes SQL optimisées
- Implémenter des ORM
- Gérer les transactions

---

### Bloc 3 : Préparer le déploiement d'une application sécurisée

#### 9. Préparer et exécuter les plans de tests d'une application
- Écrire des tests unitaires
- Écrire des tests d'intégration
- Mettre en place des tests end-to-end
- Générer des rapports de couverture

#### 10. Préparer et documenter le déploiement d'une application
- Créer des guides de déploiement
- Documenter l'architecture
- Préparer les environnements (dev, staging, prod)

#### 11. Contribuer à la mise en production dans une démarche DevOps
- Mettre en place des pipelines CI/CD
- Automatiser les déploiements
- Utiliser des conteneurs (Docker)
- Monitorer les applications en production

---

## 📊 Couverture du projet SkillTracker

### ✅ Compétences couvertes (9/11 = 82%)

1. ✅ **Installer et configurer son environnement**
   - Next.js 14, TypeScript, Supabase, Git configurés

2. ✅ **Développer des interfaces utilisateur**
   - Pages React avec Next.js App Router
   - Design responsive avec Tailwind CSS
   - Landing page, dashboard, formulaires CRUD

3. ✅ **Développer des composants métier**
   - Server Actions pour la logique métier
   - Composants réutilisables (DeleteButton, Navigation)
   - Gestion d'état et validation

4. ✅ **Contribuer à la gestion d'un projet**
   - Git pour le versioning
   - Documentation (CONTEXT.md)
   - Code organisé et structuré

5. ✅ **Analyser les besoins et maquetter**
   - Application définie selon besoins CDA
   - Maquettes réalisées (landing page, dashboard, CRUD)
   - User stories implicites dans les fonctionnalités

6. ✅ **Définir l'architecture logicielle**
   - Architecture Next.js App Router (Server/Client Components)
   - Server Actions pour les mutations
   - Séparation des responsabilités (lib/actions, components, app)

7. ✅ **Concevoir et mettre en place une BDD**
   - Base PostgreSQL sur Supabase
   - 4 tables avec relations (profiles, competences, projets, projet_competences)
   - Contraintes, index, et Row Level Security (RLS)

8. ✅ **Développer des composants d'accès aux données**
   - Server Actions avec Supabase client
   - Requêtes SQL via Supabase
   - Gestion des relations Many-to-Many

9. ✅ **Préparer et exécuter les plans de tests**
   - Jest + React Testing Library configurés
   - Tests unitaires pour la landing page
   - Scripts de test (test, test:watch, test:coverage)

### 🔄 Compétences partielles ou manquantes (2/11 = 18%)

10. 🔄 **Préparer et documenter le déploiement**
    - ❌ Guide de déploiement manquant
    - ❌ Documentation d'architecture à compléter
    - ✅ Structure de projet documentée (CONTEXT.md)

11. 🔄 **Contribuer à la mise en production DevOps**
    - ❌ Pipeline CI/CD manquant
    - ❌ Automatisation des déploiements manquante
    - ❌ Conteneurisation Docker manquante
    - ❌ Monitoring manquant

---

## 🎯 Actions pour atteindre 100%

### Pour la compétence 10 : Documentation déploiement
- [ ] Créer un guide de déploiement Vercel
- [ ] Documenter la configuration des variables d'environnement
- [ ] Créer un schéma d'architecture technique
- [ ] Documenter les prérequis et dépendances

### Pour la compétence 11 : DevOps
- [ ] Créer un Dockerfile
- [ ] Mettre en place GitHub Actions
- [ ] Pipeline CI : tests automatiques sur chaque push
- [ ] Pipeline CD : déploiement automatique sur Vercel
- [ ] Ajouter des badges de statut (build, tests)

---

## 📚 Référence officielle

**Document REAC CDA V04 - 24/05/2023**
- Code RNCP : 37873
- Niveau : 6 (Bac+3/4)
- Durée de formation : ~600h
- Validation : Mise en situation professionnelle + entretien

---

## ✨ Forces du projet actuel

- Architecture moderne (Next.js 14, TypeScript)
- Sécurité (RLS, authentification)
- Tests unitaires en place
- Code propre et bien structuré
- Design professionnel et responsive
- Base de données bien conçue

## 🚀 Prochaines étapes recommandées

1. **Court terme** (pour validation CDA)
   - Ajouter plus de tests (augmenter la couverture)
   - Créer un guide de déploiement
   - Mettre en place GitHub Actions
   - Déployer sur Vercel

2. **Moyen terme** (amélioration continue)
   - Ajouter des tests E2E (Playwright)
   - Conteneuriser avec Docker
   - Mettre en place un monitoring
   - Améliorer la documentation technique

3. **Long terme** (évolution du projet)
   - Export PDF
   - Mode sombre
   - Système de tags
   - Partage de profil public
