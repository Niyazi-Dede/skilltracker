# SkillTracker - Plateforme de suivi de compétences

## 🎯 Objectif du projet
Application web permettant aux étudiants en formation CDA de suivre leurs compétences professionnelles et de générer un portfolio pour leur examen de titre professionnel.

## 📚 Contexte
Projet créé dans le cadre de la formation **Concepteur Développeur d'Applications (CDA)** niveau 6.
Ce projet doit couvrir les **11 compétences obligatoires** du référentiel CDA pour validation du titre.

## 🛠️ Stack technique
- **Frontend**: Next.js 14+ (App Router) + React + TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js Server Actions
- **Base de données**: Supabase (PostgreSQL)
- **Authentification**: Supabase Auth
- **Déploiement**: Vercel (prévu)
- **CI/CD**: GitHub Actions (prévu)

## 🗄️ Structure de la base de données

### Table `profiles`
- Profil utilisateur lié à Supabase Auth
- Créé automatiquement à l'inscription via trigger

### Table `competences`
- Liste des compétences de l'utilisateur
- Champs: nom, description, niveau (1-5)

### Table `projets`
- Projets réalisés par l'utilisateur
- Champs: nom, description, dates, statut

### Table `projet_competences`
- Table de liaison Many-to-Many entre projets et compétences

## 📋 Fonctionnalités à implémenter

### ✅ Déjà fait
- [x] Setup Next.js + Supabase
- [x] Authentification (signup/login/logout)
- [x] Dashboard protégé avec statistiques complètes
- [x] Base de données créée avec RLS
- [x] Server Actions pour compétences (lib/actions/competences.ts)
- [x] CRUD Compétences complet
  - [x] Liste des compétences
  - [x] Ajouter une compétence
  - [x] Modifier une compétence
  - [x] Supprimer une compétence
- [x] CRUD Projets complet
  - [x] Liste des projets
  - [x] Créer un projet
  - [x] Modifier un projet
  - [x] Supprimer un projet
  - [x] Lier des compétences à un projet
- [x] Tableau de bord amélioré
  - [x] Statistiques (nombre de compétences, projets)
  - [x] Graphiques de visualisation (niveaux de compétences)
  - [x] Dernières activités
- [x] Tests unitaires
  - [x] Configuration Jest + Testing Library
  - [x] Tests des composants React
  - [x] Tests de validation des données
  - [x] Plan de test documenté
- [x] Déploiement & CI/CD
  - [x] Documentation de déploiement complète
  - [x] GitHub Actions pour tests automatiques
  - [x] Pipeline CI/CD complet (4 jobs)
  - [x] Configuration Vercel

### 📝 Améliorations futures (hors périmètre examen)
- [ ] Export PDF
  - [ ] Génération de CV de compétences
  - [ ] Export de la liste des projets
- [ ] Système de tags pour les compétences
- [ ] Recherche et filtres avancés
- [ ] Mode sombre
- [ ] Tests E2E (Playwright)

## 🎨 Identité visuelle
- Couleurs principales: Bleu (#3B82F6), Gris (#6B7280)
- Design moderne, épuré, professionnel
- Responsive (desktop prioritaire)

## 📁 Structure des dossiers
```
skilltracker/
├── app/
│   ├── (auth)/              # Pages d'authentification
│   │   ├── login/
│   │   └── signup/
│   ├── dashboard/           # Pages protégées
│   │   ├── page.tsx        # Tableau de bord principal
│   │   ├── competences/    # CRUD Compétences
│   │   │   ├── page.tsx              # Liste
│   │   │   ├── new/page.tsx          # Créer
│   │   │   ├── [id]/edit/page.tsx    # Modifier
│   │   │   └── DeleteButton.tsx      # Composant suppression
│   │   └── projets/        # CRUD Projets (à créer)
│   └── api/                # API Routes si nécessaire
├── lib/
│   ├── supabase/
│   │   ├── client.ts       # Client Supabase (navigateur)
│   │   └── server.ts       # Client Supabase (serveur)
│   └── actions/
│       ├── competences.ts  # Server Actions compétences
│       └── projets.ts      # Server Actions projets (à créer)
├── components/             # Composants réutilisables (à créer)
├── types/                  # Types TypeScript (à créer)
└── .env.local             # Variables d'environnement
```

## 🔐 Variables d'environnement
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
```

## 🚀 Commandes utiles
```bash
npm run dev              # Lancer le serveur de dev
npm run build            # Build de production
npm run start            # Lancer en production
npm run lint             # Vérifier le code
npm test                 # Lancer les tests
npm run test:watch       # Tests en mode watch
npm run test:coverage    # Tests avec rapport de couverture
```

## 📝 Règles de développement

### Code Style
- TypeScript strict activé
- Utiliser les Server Actions pour les mutations
- Composants Server par défaut, Client Components uniquement si nécessaire
- Nommer les fichiers en camelCase pour les composants
- Utiliser Tailwind pour le styling (pas de CSS custom)

### Sécurité
- Row Level Security (RLS) activé sur toutes les tables
- Toujours vérifier l'authentification dans les Server Actions
- Valider les entrées utilisateur côté serveur
- Ne jamais exposer les clés secrètes côté client

### Base de données
- Utiliser des UUIDs pour les IDs
- Timestamps automatiques (created_at, updated_at)
- Relations avec CASCADE DELETE
- Index sur les foreign keys

## 🎯 Compétences CDA couvertes par ce projet

1. ✅ Installer et configurer son environnement de travail
2. ✅ Développer des interfaces utilisateur (React/Next.js)
3. ✅ Développer des composants métier (Server Actions)
4. ✅ Contribuer à la gestion d'un projet informatique
5. ✅ Analyser les besoins et maquetter une application
6. ✅ Définir l'architecture logicielle (Next.js App Router)
7. ✅ Concevoir et mettre en place une BDD relationnelle (PostgreSQL)
8. ✅ Développer des composants d'accès aux données (Supabase)
9. ✅ Préparer et exécuter les plans de tests (Jest + Testing Library)
10. ✅ Préparer et documenter le déploiement (DEPLOYMENT.md)
11. ✅ Contribuer à la mise en production DevOps (GitHub Actions + Vercel)

**📋 Voir le détail dans [VALIDATION_CDA.md](./VALIDATION_CDA.md)**

## 📖 Documentation de référence
- Next.js: https://nextjs.org/docs
- Supabase: https://supabase.com/docs
- Tailwind CSS: https://tailwindcss.com/docs
- React: https://react.dev

## 🐛 Problèmes connus
- Confirmation d'email désactivée dans Supabase (pour faciliter les tests)

## 📊 Statistiques du projet
- **Lignes de code** : ~2000 (TypeScript + TSX)
- **Tests** : 11 tests passants
- **Fichiers** : ~30 fichiers source
- **Documentation** : 6 fichiers (README, DEPLOYMENT, PLAN_DE_TEST, VALIDATION_CDA, CONTEXT, .github/README)

## 💡 Améliorations futures
- Système de tags pour les compétences
- Recherche et filtres avancés
- Partage de profil public
- Notifications
- Mode sombre