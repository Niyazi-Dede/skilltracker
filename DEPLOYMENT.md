# Guide de Déploiement - SkillTracker

Ce document décrit les étapes nécessaires pour déployer l'application SkillTracker en production.

## Pré-requis

### Logiciels nécessaires
- **Node.js** : version 18.x ou supérieure
- **npm** : version 8.x ou supérieure
- **Git** : pour le versionnement et le déploiement

### Comptes requis
- **Compte GitHub** : pour héberger le code source
- **Compte Vercel** : pour le déploiement de l'application (gratuit)
- **Compte Supabase** : pour la base de données PostgreSQL et l'authentification (gratuit)

## Configuration de Supabase (Base de données)

### 1. Créer un projet Supabase
1. Aller sur https://supabase.com
2. Se connecter / Créer un compte
3. Créer un nouveau projet
4. Choisir un nom et une région (Paris recommandé pour l'Europe)
5. Noter le mot de passe de la base de données

### 2. Configurer la base de données
1. Aller dans l'éditeur SQL de Supabase
2. Exécuter le fichier `database.sql` fourni dans le projet
3. Vérifier que les tables sont créées : `profiles`, `competences`, `projets`, `projet_competences`

### 3. Configurer l'authentification
1. Aller dans **Authentication** > **Providers**
2. Activer le provider **Email**
3. Dans **Settings** > **Email Templates**, personnaliser si besoin
4. Dans **Settings** > **Auth**, désactiver "Enable email confirmations" pour les tests (optionnel)

### 4. Récupérer les clés API
1. Aller dans **Settings** > **API**
2. Noter les valeurs suivantes :
   - `Project URL` (NEXT_PUBLIC_SUPABASE_URL)
   - `anon public` key (NEXT_PUBLIC_SUPABASE_ANON_KEY)
   - `service_role` key (SUPABASE_SERVICE_ROLE_KEY) - **à garder secrète**

## Déploiement sur Vercel

### 1. Préparer le projet
```bash
# Cloner le dépôt (si ce n'est pas déjà fait)
git clone https://github.com/votre-username/skilltracker.git
cd skilltracker

# Installer les dépendances
npm install

# Tester le build local
npm run build
```

### 2. Pousser le code sur GitHub
```bash
# Ajouter les fichiers
git add .

# Créer un commit
git commit -m "Prêt pour déploiement"

# Pousser sur GitHub
git push origin main
```

### 3. Déployer sur Vercel
1. Aller sur https://vercel.com
2. Se connecter avec GitHub
3. Cliquer sur **"Add New Project"**
4. Importer le repository `skilltracker`
5. Configurer les variables d'environnement (voir section suivante)
6. Cliquer sur **"Deploy"**

### 4. Configurer les variables d'environnement sur Vercel
Dans les paramètres du projet Vercel > **Settings** > **Environment Variables**, ajouter :

| Variable | Valeur | Environnement |
|----------|--------|---------------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL de votre projet Supabase | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé anon de Supabase | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé service_role de Supabase | Production uniquement |

⚠️ **Important** : Ne jamais commiter ces variables dans le code !

## Vérification post-déploiement

### Checklist de vérification
- [ ] L'application est accessible via l'URL Vercel
- [ ] La page d'accueil se charge correctement
- [ ] L'inscription d'un nouvel utilisateur fonctionne
- [ ] La connexion fonctionne
- [ ] Le dashboard s'affiche après connexion
- [ ] Création d'une compétence fonctionne
- [ ] Création d'un projet fonctionne
- [ ] La déconnexion fonctionne

### Tests manuels recommandés
```bash
# Test 1 : Inscription
1. Aller sur /signup
2. Créer un compte avec un email valide
3. Vérifier la redirection vers le dashboard

# Test 2 : CRUD Compétences
1. Créer une nouvelle compétence
2. Modifier cette compétence
3. Supprimer la compétence

# Test 3 : CRUD Projets
1. Créer un nouveau projet
2. Lier des compétences au projet
3. Vérifier l'affichage sur le dashboard
```

## Configuration du domaine personnalisé (optionnel)

### Sur Vercel
1. Aller dans **Settings** > **Domains**
2. Ajouter votre domaine personnalisé
3. Suivre les instructions pour configurer les DNS

## Rollback en cas de problème

### Revenir à une version précédente sur Vercel
1. Aller dans **Deployments**
2. Trouver le déploiement précédent fonctionnel
3. Cliquer sur les 3 points > **"Promote to Production"**

### Rollback de la base de données
⚠️ **Important** : Toujours faire des backups avant modifications majeures

```bash
# Exporter les données depuis Supabase
# Aller dans Database > Backups
# Télécharger le backup le plus récent
```

## Commandes utiles

```bash
# Développement local
npm run dev              # Lance le serveur de développement

# Build et tests
npm run build            # Build de production
npm test                 # Lance les tests unitaires
npm run test:coverage    # Lance les tests avec couverture

# Linter
npm run lint             # Vérifie le code avec ESLint
```

## Variables d'environnement requises

### `.env.local` (développement local)
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Monitoring et maintenance

### Logs et erreurs
- **Vercel** : Logs accessibles dans le dashboard Vercel > Runtime Logs
- **Supabase** : Logs SQL et Auth dans le dashboard Supabase > Logs

### Quotas gratuits
- **Vercel** :
  - 100 GB bande passante / mois
  - Builds illimités
  - Domaines personnalisés illimités

- **Supabase** :
  - 500 MB de base de données
  - 50 000 utilisateurs authentifiés
  - 2 GB de fichiers

### Mise à jour de l'application
```bash
# 1. Faire les modifications localement
git add .
git commit -m "Description des modifications"

# 2. Pousser sur GitHub
git push origin main

# 3. Vercel déploie automatiquement !
```

## Support et résolution de problèmes

### Problèmes courants

#### L'application ne se lance pas
- Vérifier que toutes les variables d'environnement sont configurées
- Vérifier les logs Vercel pour les erreurs
- Tester le build localement : `npm run build`

#### Erreurs de connexion à Supabase
- Vérifier que les clés API sont correctes
- Vérifier que le RLS (Row Level Security) est activé
- Vérifier les policies dans Supabase

#### Erreurs 404 sur les routes
- Vérifier la configuration Next.js dans `next.config.ts`
- Nettoyer le cache Vercel et redéployer

## Ressources utiles

- **Documentation Next.js** : https://nextjs.org/docs
- **Documentation Supabase** : https://supabase.com/docs
- **Documentation Vercel** : https://vercel.com/docs
- **Guide d'authentification Supabase + Next.js** : https://supabase.com/docs/guides/auth/auth-helpers/nextjs

---

**Date de dernière mise à jour** : 2025-12-09
**Version** : 1.0.0
**Auteur** : Équipe SkillTracker
