# 🎯 SkillTracker

[![CI/CD Pipeline](https://github.com/VOTRE_USERNAME/skilltracker/workflows/CI%2FCD%20Pipeline/badge.svg)](https://github.com/VOTRE_USERNAME/skilltracker/actions)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)](https://supabase.com/)

Application web permettant aux étudiants en formation CDA de suivre leurs compétences professionnelles et de générer un portfolio pour leur examen de titre professionnel.

## 📚 À propos

Projet créé dans le cadre de la formation **Concepteur Développeur d'Applications (CDA)** niveau 6.
Ce projet couvre les **11 compétences obligatoires** du référentiel CDA pour validation du titre.

## ✨ Fonctionnalités

- 🔐 **Authentification sécurisée** avec Supabase Auth
- 📊 **Gestion des compétences** : CRUD complet avec niveaux (1-5)
- 🚀 **Gestion des projets** : Création, modification, liaison avec compétences
- 📈 **Dashboard interactif** : Statistiques et visualisations
- 🎨 **Interface moderne** : Design responsive avec Tailwind CSS
- ✅ **Tests unitaires** : Jest + Testing Library
- 🔄 **CI/CD** : GitHub Actions + Vercel

## 🛠️ Stack technique

- **Frontend** : Next.js 16 (App Router) + React 19 + TypeScript
- **Styling** : Tailwind CSS 4
- **Backend** : Next.js Server Actions
- **Base de données** : Supabase (PostgreSQL)
- **Authentification** : Supabase Auth
- **Tests** : Jest + Testing Library
- **CI/CD** : GitHub Actions
- **Déploiement** : Vercel

## 🚀 Démarrage rapide

### Pré-requis
- Node.js 18.x ou supérieur
- npm ou yarn
- Un compte Supabase (gratuit)

### Installation

```bash
# Cloner le repository
git clone https://github.com/VOTRE_USERNAME/skilltracker.git
cd skilltracker

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos clés Supabase

# Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### Variables d'environnement

Créer un fichier `.env.local` à la racine du projet :

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon
SUPABASE_SERVICE_ROLE_KEY=votre_cle_service_role
```

## 📖 Documentation

- [Guide de déploiement](./DEPLOYMENT.md)
- [Plan de test](./PLAN_DE_TEST.md)
- [Contexte du projet](./CONTEXT.md)
- [Configuration GitHub Actions](./.github/README.md)

## 🧪 Tests

```bash
# Lancer tous les tests
npm test

# Mode watch (développement)
npm run test:watch

# Générer un rapport de couverture
npm run test:coverage
```

## 🏗️ Structure du projet

```
skilltracker/
├── app/                      # Pages et layouts Next.js
│   ├── (auth)/              # Pages d'authentification
│   │   ├── login/
│   │   └── signup/
│   ├── dashboard/           # Pages protégées
│   │   ├── competences/     # CRUD Compétences
│   │   └── projets/         # CRUD Projets
│   └── api/                 # API Routes
├── lib/
│   ├── supabase/            # Clients Supabase
│   └── actions/             # Server Actions
├── components/              # Composants réutilisables
├── types/                   # Types TypeScript
├── .github/workflows/       # CI/CD GitHub Actions
└── tests/                   # Tests unitaires
```

## 🎯 Compétences CDA couvertes

| # | Compétence | Statut |
|---|-----------|--------|
| 1 | Installer et configurer son environnement de travail | ✅ |
| 2 | Développer des interfaces utilisateur | ✅ |
| 3 | Développer des composants métier | ✅ |
| 4 | Contribuer à la gestion d'un projet informatique | ✅ |
| 5 | Analyser les besoins et maquetter une application | ✅ |
| 6 | Définir l'architecture logicielle | ✅ |
| 7 | Concevoir et mettre en place une BDD relationnelle | ✅ |
| 8 | Développer des composants d'accès aux données | ✅ |
| 9 | Préparer et exécuter les plans de tests | ✅ |
| 10 | Préparer et documenter le déploiement | ✅ |
| 11 | Contribuer à la mise en production DevOps | ✅ |

## 📦 Scripts disponibles

```bash
npm run dev          # Lancer le serveur de développement
npm run build        # Build de production
npm run start        # Lancer en production
npm run lint         # Vérifier le code
npm test             # Lancer les tests
npm run test:watch   # Tests en mode watch
npm run test:coverage # Tests avec couverture
```

## 🔒 Sécurité

- ✅ Row Level Security (RLS) activé sur toutes les tables
- ✅ Authentification sécurisée avec Supabase
- ✅ Validation des entrées côté serveur
- ✅ Variables d'environnement protégées
- ✅ HTTPS en production

## 🚀 Déploiement

L'application est déployée automatiquement sur Vercel à chaque push sur `main`.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/VOTRE_USERNAME/skilltracker)

Voir le [Guide de déploiement](./DEPLOYMENT.md) pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forker le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commiter les changes (`git commit -m 'Add AmazingFeature'`)
4. Pousser sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👤 Auteur

**Votre Nom**
- GitHub: [@VOTRE_USERNAME](https://github.com/VOTRE_USERNAME)
- Email: votre.email@example.com

## 🙏 Remerciements

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Vercel](https://vercel.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

⭐️ Si ce projet vous aide, n'hésitez pas à lui donner une étoile sur GitHub !
