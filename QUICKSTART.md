# 📝 Guide Rapide - Noor Education Platform

## 🚀 Démarrage Rapide

### 1. Installation (5 minutes)

```bash
# 1. Cloner le projet
git clone https://github.com/votre-username/noor-education-platform.git
cd noor-education-platform

# 2. Installer les dépendances
npm install

# 3. Configurer .env
# Créez un fichier .env et ajoutez vos clés Supabase
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre_cle_anon_key

# 4. Lancer l'application
npm run dev
```

Ouvrez [http://localhost:5173](http://localhost:5173)

---

## 📊 Configuration Supabase

### Étape 1 : Créer le Projet

1. Allez sur [supabase.com](https://supabase.com)
2. "New Project" → Nommez-le "noor-education"
3. Choisissez une région et un mot de passe

### Étape 2 : Exécuter le SQL

1. SQL Editor → New Query
2. Copiez tout le contenu de `supabase/schema.sql`
3. Cliquez sur "Run"

### Étape 3 : Récupérer les Clés

Settings → API → Copiez :
- Project URL
- anon public key

---

## 👥 Créer des Utilisateurs de Test

### Via Supabase Dashboard

**1. Aller dans Authentication → Users → Add User**

**Admin** :
```
Email: admin@noor.com
Password: Admin123!
```

**Étudiant** :
```
Email: student@noor.com
Password: Student123!
```

**Parent** :
```
Email: parent@noor.com
Password: Parent123!
```

**2. Mettre à jour les rôles** (SQL Editor) :

```sql
-- Admin
UPDATE profiles SET role = 'admin' WHERE email = 'admin@noor.com';

-- Student
UPDATE profiles SET role = 'student' WHERE email = 'student@noor.com';

-- Parent
UPDATE profiles SET role = 'parent' WHERE email = 'parent@noor.com';
```

---

## 🎨 Structure du Projet

```
noor-education-platform/
├── src/
│   ├── components/         # Composants réutilisables
│   │   ├── Navbar.jsx
│   │   └── LoadingSpinner.jsx
│   ├── pages/              # Pages principales
│   │   ├── Login.jsx          # Page de connexion
│   │   ├── AdminDashboard.jsx # Dashboard admin
│   │   ├── StudentDashboard.jsx # Dashboard élève
│   │   └── ParentDashboard.jsx  # Dashboard parent
│   ├── stores/             # State management (Zustand)
│   │   └── authStore.js
│   ├── lib/                # Utilitaires
│   │   └── supabase.js        # Client Supabase
│   ├── App.jsx             # Routes principales
│   ├── main.jsx            # Point d'entrée
│   └── index.css           # Styles globaux
├── supabase/
│   └── schema.sql          # Schéma de la base de données
├── .env                    # Variables d'environnement (LOCAL)
├── .env.example            # Exemple de .env
├── vercel.json             # Configuration Vercel
├── README.md               # Documentation
└── DEPLOYMENT.md           # Guide de déploiement
```

---

## 🎯 Fonctionnalités par Rôle

### 👨‍💼 Admin
- ✅ Voir tous les élèves et leurs statistiques
- ✅ Voir tous les cours
- ✅ Graphiques de progression
- ✅ Tables interactives
- 🔜 Créer/modifier des cours
- 🔜 Créer des comptes utilisateurs
- 🔜 Gérer les inscriptions

### 👨‍🎓 Élève
- ✅ Voir mes cours actifs
- ✅ Suivre ma progression
- ✅ Voir mes réalisations
- ✅ Calendrier d'activité
- 🔜 Suivre les cours interactifs
- 🔜 Passer des quiz
- 🔜 Voir les vidéos de cours

### 👨‍👩‍👧 Parent
- ✅ Sélectionner l'enfant à suivre
- ✅ Voir la progression de chaque enfant
- ✅ Graphiques de performance
- ✅ Événements à venir
- ✅ Notifications
- 🔜 Contacter les professeurs
- 🔜 Télécharger des rapports

---

## 🛠️ Commandes Utiles

```bash
# Développement
npm run dev              # Lancer le serveur de développement

# Production
npm run build            # Créer le build de production
npm run preview          # Prévisualiser le build

# Linting
npm run lint             # Vérifier la qualité du code
```

---

## 🎨 Personnalisation des Couleurs

Dans `src/index.css`, modifiez les variables CSS :

```css
:root {
  --noor-purple: #6C63FF;     /* Couleur principale */
  --noor-blue: #4ECDC4;       /* Couleur secondaire */
  --noor-orange: #FF6B6B;     /* Accent */
  --noor-yellow: #FFE66D;     /* Highlight */
  --noor-green: #51CF66;      /* Success */
}
```

---

## 🚢 Déploiement Express

### GitHub (2 minutes)

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/noor-education-platform.git
git push -u origin main
```

### Vercel (3 minutes)

1. [vercel.com](https://vercel.com) → New Project
2. Import votre repo GitHub
3. Ajouter les variables d'environnement :
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy!

---

## ⚠️ Problèmes Courants

### Page blanche après connexion
- ✅ Vérifiez que le rôle est bien défini dans la table `profiles`
- ✅ Regardez la console du navigateur (F12)

### Erreur Supabase
- ✅ Vérifiez que les clés dans `.env` sont correctes
- ✅ Vérifiez que les tables sont créées
- ✅ Vérifiez Row Level Security

### Build échoue
```bash
# Testez le build en local
npm run build

# Si erreurs, corrigez et recommencez
```

---

## 📚 Prochaines Étapes

1. **Ajouter du Contenu** :
   - Créez des cours via l'interface admin
   - Ajoutez des élèves
   - Testez les inscriptions

2. **Personnaliser** :
   - Changez les couleurs
   - Ajoutez votre logo
   - Modifiez les textes

3. **Étendre** :
   - Ajoutez de nouvelles fonctionnalités
   - Créez des pages supplémentaires
   - Intégrez des services tiers

---

## 💡 Conseils

- **Sécurité** : Ne partagez JAMAIS vos clés API en public
- **Backup** : Exportez régulièrement votre base Supabase
- **Tests** : Testez toujours en local avant de déployer
- **Git** : Faites des commits fréquents avec des messages clairs

---

## 🆘 Support

- 📧 Email: support@noor-education.com
- 🐛 Issues: [GitHub Issues](https://github.com/votre-username/noor-education-platform/issues)
- 📖 Docs: Voir `README.md` et `DEPLOYMENT.md`

---

**Bon développement ! 🚀**
