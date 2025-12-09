# Configuration GitHub Actions

Ce dossier contient les workflows GitHub Actions pour l'intégration continue (CI) et le déploiement continu (CD).

## Workflows disponibles

### `ci.yml` - Pipeline CI/CD
Ce workflow s'exécute automatiquement lors de :
- Push sur les branches `main` et `develop`
- Création de Pull Requests vers `main`

**Jobs inclus :**
1. **Tests et qualité du code** : Lint + Tests unitaires
2. **Build de production** : Compilation de l'application
3. **Audit de sécurité** : Vérification des vulnérabilités
4. **Notification** : Résumé du pipeline

## Configuration des secrets

Pour que le workflow fonctionne, vous devez configurer les secrets GitHub suivants :

### Étapes pour ajouter les secrets :
1. Aller sur votre repository GitHub
2. Cliquer sur **Settings** > **Secrets and variables** > **Actions**
3. Cliquer sur **New repository secret**
4. Ajouter les secrets suivants :

| Nom du secret | Description | Où le trouver |
|---------------|-------------|---------------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL de votre projet Supabase | Supabase Dashboard > Settings > API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé publique anonyme de Supabase | Supabase Dashboard > Settings > API |

**Note :** Ces secrets sont nécessaires uniquement pour le build. Les tests fonctionnent avec des valeurs mockées.

## Badges de statut

Vous pouvez ajouter un badge de statut dans votre README.md :

```markdown
![CI/CD Pipeline](https://github.com/VOTRE_USERNAME/skilltracker/workflows/CI%2FCD%20Pipeline/badge.svg)
```

Remplacez `VOTRE_USERNAME` par votre nom d'utilisateur GitHub.

## Visualisation des résultats

- **Actions** : Aller sur l'onglet **Actions** de votre repository
- **Logs** : Cliquer sur un workflow pour voir les logs détaillés
- **Artefacts** : Les rapports de couverture et builds sont disponibles dans chaque exécution

## Personnalisation

### Modifier les versions Node.js testées
Dans `ci.yml`, ligne 15 :
```yaml
strategy:
  matrix:
    node-version: [18.x, 20.x]  # Ajoutez ou supprimez des versions
```

### Désactiver l'audit de sécurité
Supprimez ou commentez le job `security` dans `ci.yml`.

### Ajouter des notifications Slack/Discord
Ajoutez un step dans le job `notify` avec l'action appropriée.

## Dépannage

### Le build échoue avec "Missing environment variables"
→ Vérifiez que les secrets sont correctement configurés dans GitHub.

### Les tests échouent en CI mais passent localement
→ Vérifiez que `node_modules` est bien ignoré dans `.gitignore`
→ Assurez-vous que toutes les dépendances sont dans `package.json`

### Le workflow ne se déclenche pas
→ Vérifiez que le fichier est dans `.github/workflows/`
→ Vérifiez la syntaxe YAML avec un validateur en ligne
→ Assurez-vous que le fichier est bien poussé sur GitHub

## Maintenance

Ce workflow est maintenu automatiquement. Les dépendances des actions GitHub sont mises à jour régulièrement.

Pour mettre à jour les actions :
1. Vérifiez les nouvelles versions sur https://github.com/actions
2. Modifiez les numéros de version (ex: `v3` → `v4`)
3. Testez localement avec `act` si possible

---

**Dernière mise à jour** : 2025-12-09
