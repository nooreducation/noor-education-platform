# 🤝 Guide de Contribution - Noor Education Platform

Merci de votre intérêt pour contribuer à Noor Education ! Ce guide vous aidera à démarrer.

## 📋 Table des Matières

1. [Code de Conduite](#code-de-conduite)
2. [Comment Contribuer](#comment-contribuer)
3. [Standards de Code](#standards-de-code)
4. [Structure Git](#structure-git)
5. [Process de Review](#process-de-review)

---

## 📜 Code de Conduite

En participant à ce projet, vous acceptez de :

- ✅ Être respectueux envers tous les contributeurs
- ✅ Accepter les critiques constructives
- ✅ Se concentrer sur ce qui est le mieux pour la communauté
- ✅ Faire preuve d'empathie envers les autres

---

## 🚀 Comment Contribuer

### 1. Fork et Clone

```bash
# Fork sur GitHub (bouton Fork)
# Puis clonez votre fork
git clone https://github.com/VOTRE_USERNAME/noor-education-platform.git
cd noor-education-platform

# Ajoutez le remote upstream
git remote add upstream https://github.com/ORIGINAL_OWNER/noor-education-platform.git
```

### 2. Créer une Branche

```bash
# Créez une branche pour votre feature
git checkout -b feature/nom-de-votre-feature

# Ou pour un bugfix
git checkout -b fix/description-du-bug
```

### 3. Développer

```bash
# Installez les dépendances
npm install

# Lancez le serveur de développement
npm run dev

# Faites vos modifications
# Testez votre code
```

### 4. Commit

Utilisez des messages de commit clairs :

```bash
# Format : <type>: <description>
# Exemples :

git commit -m "feat: Ajouter système de messagerie"
git commit -m "fix: Corriger bug de connexion"
git commit -m "docs: Mettre à jour README"
git commit -m "style: Améliorer le design du dashboard"
git commit -m "refactor: Optimiser le composant Navbar"
git commit -m "test: Ajouter tests pour authStore"
```

**Types de commit** :
- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Documentation
- `style`: Changements de style/design
- `refactor`: Refactorisation
- `test`: Ajout/modification de tests
- `chore`: Tâches de maintenance

### 5. Push et Pull Request

```bash
# Push vers votre fork
git push origin feature/nom-de-votre-feature

# Allez sur GitHub et créez une Pull Request
```

**Template de Pull Request** :

```markdown
## Description
[Décrivez vos changements]

## Type de changement
- [ ] Bug fix
- [ ] Nouvelle fonctionnalité
- [ ] Breaking change
- [ ] Documentation

## Checklist
- [ ] Mon code suit les standards du projet
- [ ] J'ai testé mes changements
- [ ] J'ai mis à jour la documentation si nécessaire
- [ ] Mes commits sont clairs et bien formatés

## Screenshots (si applicable)
[Ajoutez des captures d'écran]
```

---

## 💻 Standards de Code

### Structure des Fichiers

```
src/
├── components/       # Composants réutilisables
├── pages/            # Pages/Vues principales
├── stores/           # State management (Zustand)
├── lib/              # Utilitaires et configurations
├── hooks/            # Custom React hooks (si nécessaire)
└── utils/            # Fonctions utilitaires
```

### Conventions de Nommage

**Fichiers** :
- Composants React : `PascalCase.jsx`
- Utilitaires : `camelCase.js`
- Stores : `camelCaseStore.js`

**Variables** :
```javascript
// camelCase pour variables et fonctions
const userName = 'Ahmed';
function getUserData() {}

// PascalCase pour composants
const UserProfile = () => {};

// UPPER_CASE pour constantes
const API_URL = 'https://api.example.com';
```

### Style de Code

**React Composants** :

```jsx
// Bon ✅
import { useState } from 'react';
import { User } from 'lucide-react';

const UserCard = ({ name, email, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    onEdit();
  };

  return (
    <div className="user-card">
      <User size={24} />
      <h3>{name}</h3>
      <p>{email}</p>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
};

export default UserCard;
```

**CSS** :

```css
/* Utilisez les variables CSS du design system */
.custom-button {
  background: var(--gradient-primary);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
}

/* Classes descriptives */
.user-profile-card { }        /* ✅ Bon */
.card { }                     /* ❌ Trop générique */
```

### Organisation du Code

**Imports** :

```javascript
// 1. Bibliothèques externes
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. Composants locaux
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';

// 3. Stores et utilitaires
import { useAuthStore } from '../stores/authStore';
import { formatDate } from '../utils/helpers';

// 4. Styles (si applicable)
import './styles.css';
```

---

## 🌿 Structure Git

### Branches

- `main` : Code production, toujours stable
- `develop` : Branche de développement
- `feature/*` : Nouvelles fonctionnalités
- `fix/*` : Corrections de bugs
- `hotfix/*` : Corrections urgentes pour production

### Workflow

```bash
# Toujours partir de develop à jour
git checkout develop
git pull upstream develop

# Créer votre branche
git checkout -b feature/ma-feature

# Faire vos changements et commits
git add .
git commit -m "feat: description"

# Rebase avec develop si nécessaire
git fetch upstream
git rebase upstream/develop

# Push et PR
git push origin feature/ma-feature
```

---

## 👀 Process de Review

### Avant de Soumettre

- [ ] Le code compile sans erreurs
- [ ] Les tests passent (quand disponibles)
- [ ] Le code suit les standards
- [ ] La documentation est à jour
- [ ] Pas de console.log oubliés (sauf si pertinent)
- [ ] Les variables d'environnement sont documentées

### Review Checklist

Les reviewers vérifieront :

1. **Fonctionnalité** : Le code fait-il ce qu'il est censé faire ?
2. **Qualité** : Le code est-il propre et maintenable ?
3. **Performance** : Y a-t-il des optimisations possibles ?
4. **Sécurité** : Y a-t-il des failles de sécurité ?
5. **Tests** : Le code est-il testé ?
6. **Documentation** : Est-ce bien documenté ?

---

## 🎯 Domaines de Contribution

### Fonctionnalités Prioritaires

1. **Interface Admin** :
   - Formulaires de création de cours
   - Upload de médias
   - Gestion utilisateurs

2. **Interface Élève** :
   - Player vidéo interactif
   - Système de quiz
   - Gamification

3. **Interface Parent** :
   - Messagerie
   - Rapports PDF
   - Calendrier

### Améliorations

- Performance optimization
- Accessibilité (a11y)
- Tests unitaires
- Documentation
- Traductions

---

## 📝 Documentation

Toute nouvelle fonctionnalité doit être documentée :

1. **Code** : Commentaires JSDoc si nécessaire
2. **README** : Mise à jour si changements majeurs
3. **CHANGELOG** : Ajout de l'entrée appropriée

Exemple JSDoc :

```javascript
/**
 * Récupère les données utilisateur depuis Supabase
 * @param {string} userId - L'ID de l'utilisateur
 * @returns {Promise<Object>} Les données utilisateur
 * @throws {Error} Si l'utilisateur n'existe pas
 */
async function getUserData(userId) {
  // ...
}
```

---

## 🐛 Reporter un Bug

Utilisez le template GitHub Issue :

```markdown
## Description du Bug
[Description claire et concise]

## Étapes pour Reproduire
1. Aller sur '...'
2. Cliquer sur '...'
3. Voir l'erreur

## Comportement Attendu
[Ce qui devrait se passer]

## Comportement Actuel
[Ce qui se passe réellement]

## Screenshots
[Si applicable]

## Environnement
- OS: [e.g. Windows 11]
- Navigateur: [e.g. Chrome 120]
- Version: [e.g. 1.0.0]

## Informations Additionnelles
[Tout autre contexte]
```

---

## ❓ Questions

- 💬 Discussions GitHub
- 📧 Email: dev@noor-education.com
- 📖 Wiki du projet

---

## 🎉 Remerciements

Chaque contribution compte ! Merci de faire de Noor Education une meilleure plateforme. 🙏

**Contributeurs** :
- Votre nom apparaîtra ici après votre première contribution !

---

**Bon coding ! 💻**
