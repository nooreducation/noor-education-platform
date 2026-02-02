# 🚀 Guide de Déploiement - Noor Education Platform

Ce guide vous accompagne étape par étape pour déployer votre plateforme sur GitHub et Vercel.

## 📋 Table des Matières

1. [Configuration Supabase](#1-configuration-supabase)
2. [Préparation du Code](#2-préparation-du-code)
3. [GitHub - Création du Dépôt](#3-github---création-du-dépôt)
4. [Déploiement sur Vercel](#4-déploiement-sur-vercel)
5. [Configuration Finale](#5-configuration-finale)
6. [Vérification](#6-vérification)
7. [Dépannage](#7-dépannage)

---

## 1. Configuration Supabase

### 1.1. Créer un Projet Supabase

1. Allez sur [https://supabase.com](https://supabase.com)
2. Cliquez sur **"Start your project"** ou **"New Project"**
3. Remplissez les informations :
   - **Name**: `noor-education-platform`
   - **Database Password**: Choisissez un mot de passe fort (sauvegardez-le !)
   - **Region**: Choisissez la région la plus proche de vos utilisateurs
4. Cliquez sur **"Create new project"**
5. Attendez que le projet soit créé (2-3 minutes)

### 1.2. Récupérer les Clés API

1. Dans votre projet Supabase, allez dans **Settings** (⚙️) > **API**
2. Trouvez et copiez :
   - **Project URL** (commence par `https://...supabase.co`)
   - **anon public** key (sous "Project API keys")

### 1.3. Créer les Tables de la Base de Données

1. Allez dans **SQL Editor** (icône de base de données)
2. Cliquez sur **"New query"**
3. Ouvrez le fichier `supabase/schema.sql` de votre projet
4. Copiez TOUT le contenu
5. Collez-le dans l'éditeur SQL de Supabase
6. Cliquez sur **"Run"** (▶️)
7. Vérifiez qu'il n'y a pas d'erreurs
8. Allez dans **Table Editor** pour confirmer que toutes les tables sont créées

### 1.4. Configuration de l'Authentification

1. Allez dans **Authentication** > **Providers**
2. Activez **Email** provider
3. Dans **Email Templates**, personnalisez si nécessaire
4. Dans **URL Configuration**, ajoutez :
   - **Site URL**: `http://localhost:5173` (pour le développement)
   - **Redirect URLs**: 
     - `http://localhost:5173/**`
     - `https://votre-domaine.vercel.app/**` (vous l'ajouterez après déploiement)

---

## 2. Préparation du Code

### 2.1. Vérifier le fichier .env

1. Ouvrez le fichier `.env` à la racine du projet
2. Remplacez les valeurs par vos vraies clés Supabase :
```env
VITE_SUPABASE_URL=https://votre-projet-id.supabase.co
VITE_SUPABASE_ANON_KEY=votre_vraie_cle_anon_key_ici
```

### 2.2. Tester en Local

```bash
# Installer les dépendances (si pas encore fait)
npm install

# Lancer en mode développement
npm run dev
```

Ouvrez `http://localhost:5173` et vérifiez que tout fonctionne.

### 2.3. Build de Production (test)

```bash
# Créer un build de production
npm run build

# Tester le build
npm run preview
```

Si tout fonctionne, vous êtes prêt pour le déploiement !

---

## 3. GitHub - Création du Dépôt

### 3.1. Créer un Dépôt GitHub

1. Allez sur [https://github.com](https://github.com)
2. Cliquez sur **"New repository"** (bouton vert)
3. Remplissez :
   - **Repository name**: `noor-education-platform`
   - **Description**: "Plateforme d'apprentissage interactive"
   - **Visibility**: Private ou Public (votre choix)
   - ⚠️ **N'initialisez PAS** avec README, .gitignore ou license
4. Cliquez sur **"Create repository"**

### 3.2. Initialiser Git Localement

Ouvrez un terminal dans le dossier du projet et exécutez :

```bash
# Initialiser git
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit: Noor Education Platform"

# Renommer la branche en main
git branch -M main

# Ajouter le remote (remplacez YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/noor-education-platform.git

# Pousser vers GitHub
git push -u origin main
```

### 3.3. Vérifier sur GitHub

Retournez sur GitHub et actualisez la page. Vous devriez voir tous vos fichiers !

⚠️ **Important**: Vérifiez que le fichier `.env` n'est PAS poussé (il devrait être dans `.gitignore`).

---

## 4. Déploiement sur Vercel

### 4.1. Créer un Compte Vercel

1. Allez sur [https://vercel.com](https://vercel.com)
2. Cliquez sur **"Sign Up"**
3. Choisissez **"Continue with GitHub"**
4. Autorisez Vercel à accéder à GitHub

### 4.2. Importer le Projet

1. Sur le dashboard Vercel, cliquez sur **"Add New..."** > **"Project"**
2. Trouvez votre dépôt `noor-education-platform`
3. Cliquez sur **"Import"**

### 4.3. Configurer le Projet

1. **Project Name**: `noor-education-platform` (ou personnalisez)
2. **Framework Preset**: Devrait détecter automatiquement "Vite"
3. **Root Directory**: `.` (par défaut)
4. **Build Settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### 4.4. Ajouter les Variables d'Environnement

⚠️ **TRÈS IMPORTANT** - Sans ceci, l'app ne fonctionnera pas !

1. Cliquez sur **"Environment Variables"**
2. Ajoutez les variables suivantes :

```
Name: VITE_SUPABASE_URL
Value: https://votre-projet-id.supabase.co

Name: VITE_SUPABASE_ANON_KEY
Value: votre_vraie_cle_anon_key_ici
```

3. Sélectionnez **Production**, **Preview**, et **Development**

### 4.5. Déployer

1. Cliquez sur **"Deploy"**
2. Attendez 1-2 minutes que le déploiement se termine
3. ✅ Vous verrez des confettis quand c'est terminé !

---

## 5. Configuration Finale

### 5.1. Récupérer l'URL Vercel

Après le déploiement, vous aurez une URL comme :
```
https://noor-education-platform.vercel.app
```

### 5.2. Mettre à Jour Supabase

1. Retournez sur Supabase
2. Allez dans **Authentication** > **URL Configuration**
3. Ajoutez votre URL Vercel aux **Redirect URLs** :
```
https://votre-app.vercel.app/**
```
4. Sauvegardez

### 5.3. Créer un Compte Admin

1. Allez sur votre URL Vercel
2. Sur la page de login, vous devrez créer le premier compte manuellement via Supabase :

**Option A - Via SQL Editor** :
```sql
-- Créer un utilisateur admin (remplacez les valeurs)
INSERT INTO auth.users (
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data
) VALUES (
  'admin@noor-education.com',
  crypt('VotreMotDePasse123!', gen_salt('bf')),
  NOW(),
  '{"role": "admin"}'::jsonb
);
```

**Option B - Via Authentication UI** :
1. Dans Supabase > Authentication > Users
2. Cliquez sur **"Add user"**
3. Email: `admin@noor-education.com`
4. Password: Choisissez un mot de passe
5. Confirm
6. Ensuite, dans SQL Editor :
```sql
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'admin@noor-education.com';
```

---

## 6. Vérification

### Checklist de Vérification

- [ ] Le site s'ouvre correctement sur l'URL Vercel
- [ ] La page de login s'affiche
- [ ] Vous pouvez vous connecter avec le compte admin
- [ ] Le dashboard admin s'affiche correctement
- [ ] Les animations fonctionnent
- [ ] Le design est correct (couleurs, fonts, etc.)
- [ ] Aucune erreur dans la console du navigateur (F12)

### Test Complet

1. **Connexion Admin** :
   - Allez sur votre URL
   - Choisissez "Administrateur"
   - Connectez-vous
   - Vérifiez le dashboard

2. **Créer un Compte Élève** (via admin dashboard) :
   - Ajoutez un élève
   - Déconnectez-vous
   - Connectez-vous en tant qu'élève

3. **Test Responsive** :
   - Ouvrez sur mobile (F12 > mode responsive)
   - Vérifiez que tout s'affiche bien

---

## 7. Dépannage

### Problème : Page blanche après déploiement

**Solution** :
1. Vérifiez les variables d'environnement dans Vercel
2. Vérifiez les logs : Vercel Dashboard > Deployments > View Function Logs
3. Redéployez : Vercel Dashboard > Deployments > ... > Redeploy

### Problème : Erreur de connexion Supabase

**Solution** :
1. Vérifiez que les clés dans Vercel sont correctes
2. Vérifiez que l'URL Vercel est dans les Redirect URLs de Supabase
3. Vérifiez que les tables sont créées dans Supabase

### Problème : Build échoue

**Solution** :
```bash
# En local, testez le build
npm run build

# Si erreurs, corrigez-les
# Puis commit et push
git add .
git commit -m "Fix build errors"
git push

# Vercel redéployera automatiquement
```

### Problème : Styles cassés

**Solution** :
1. Vérifiez que `index.css` est bien importé dans `main.jsx`
2. Clear cache du navigateur (Ctrl+Shift+R)
3. Redéployez sur Vercel

---

## 🎉 Félicitations !

Votre plateforme Noor Education est maintenant en ligne ! 

### Prochaines Étapes

1. **Domaine Personnalisé** (optionnel) :
   - Dans Vercel > Settings > Domains
   - Ajoutez votre domaine personnalisé

2. **Ajouter du Contenu** :
   - Connectez-vous en admin
   - Ajoutez des cours
   - Créez des comptes élèves

3. **Monitoring** :
   - Utilisez Vercel Analytics
   - Surveillez les logs Supabase

4. **Améliorations** :
   - Ajoutez des fonctionnalités
   - Personnalisez le design
   - Optimisez les performances

---

## 📞 Besoin d'Aide ?

Si vous rencontrez des problèmes :

1. Consultez les logs Vercel
2. Consultez les logs Supabase
3. Vérifiez la console du navigateur (F12)
4. Créez une issue GitHub

**Bon déploiement ! 🚀**
