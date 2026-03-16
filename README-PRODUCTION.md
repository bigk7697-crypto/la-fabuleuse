# 📋 **README - LA FABULEUSE**

## 🍽️ **LA FABULEUSE - Bar Restaurant Café**

Site web professionnel moderne pour bar-restaurant-café à Lomé, Togo avec système d'administration complet.

---

## ✨ **Fonctionnalités**

### 🌐 **Site Public**
- **Menu dynamique** avec catégories (Bar/Restaurant/Café)
- **Design responsive** 100% mobile-first
- **Navigation moderne** avec animations fluides
- **Contact WhatsApp** intégré
- **SEO optimisé** avec méta-données

### ⚙️ **Panneau d'Administration**
- **Connexion sécurisée** avec Firebase Auth
- **Gestion du menu** (ajouter/modifier/supprimer des plats)
- **Configuration des paramètres** du restaurant
- **Interface moderne** et intuitive
- **Sauvegarde en temps réel** dans Firestore

### 📱 **Multi-Écrans**
- **Mobile**: Navigation optimisée, modal adaptatif
- **Tablette**: Layout intermédiaire responsive
- **Desktop**: Expérience complète avec sidebar

---

## 🚀 **Déploiement Rapide**

### Netlify (Recommandé)
1. Connecter votre repository GitHub
2. Configurer les variables d'environnement
3. Déployer automatiquement

### Variables d'Environnement
```env
VITE_FIREBASE_API_KEY=AIzaSyDRkDvEANAlnR6mIy5873IW9JjWoC4G7Kk
VITE_FIREBASE_PROJECT_ID=la-fabuleuse-tg-669c0
VITE_ADMIN_EMAIL=admin@lafabuleuse.tg
VITE_ADMIN_PASSWORD=admin123456
```

---

## 🔧 **Configuration Firebase**

### 1. **Créer le projet**
- Aller sur [Firebase Console](https://console.firebase.google.com/)
- Créer un nouveau projet "la-fabuleuse-tg-669c0"

### 2. **Activer les services**
- **Authentication** → Email/Mot de passe
- **Firestore Database** → Créer une base de données
- **Hosting** (optionnel)

### 3. **Déployer les règles**
Copier le contenu de `firestore.rules` dans la console Firebase

### 4. **Créer l'utilisateur admin**
- Email: `admin@lafabuleuse.tg`
- Mot de passe: `admin123456`

---

## 📁 **Structure du Projet**

```
📁 la-fabuleuse-tg/
├── 📄 index.html          # Page d'accueil
├── 📄 login.html          # Connexion admin
├── 📄 admin.html          # Panneau d'administration
├── 📄 firestore.rules     # Règles de sécurité Firebase
├── 📄 netlify.toml        # Configuration Netlify
├── 📄 .env                # Variables d'environnement
├── 📄 package.json        # Métadonnées du projet
└── 📁 public/             # Assets statiques
    ├── 🖼️ favicon.svg
    ├── 🖼️ apple-touch-icon-new.svg
    └── 📁 images/
```

---

## 🎯 **Accès Rapid**

### Site Public
- **Accueil**: `https://votre-site.com`
- **Menu**: Navigation depuis l'accueil
- **Contact**: WhatsApp intégré

### Administration
- **Connexion**: `https://votre-site.com/login`
- **Email**: `admin@lafabuleuse.tg`
- **Mot de passe**: `admin123456`
- **Admin**: `https://votre-site.com/admin`

---

## 🛠️ **Développement Local**

### Prérequis
- Python 3.x (pour serveur local)
- Navigateur moderne

### Lancer le projet
```bash
# Cloner le repository
git clone https://github.com/bigk7697-crypto/la-fabuleuse.git
cd la-fabuleuse

# Lancer le serveur local
python -m http.server 3000

# Ouvrir http://localhost:3000
```

---

## 📊 **Technologies**

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Auth + Firestore)
- **Hosting**: Netlify/Vercel
- **Design**: Mobile-first responsive

---

## 🔐 **Sécurité**

- **Authentication Firebase** sécurisée
- **Règles Firestore** restrictives
- **Validation des entrées** utilisateur
- **Protection contre les injections** XSS

---

## 📞 **Contact**

- **Restaurant**: LA FABULEUSE
- **Adresse**: Lomé, Togo
- **WhatsApp**: +259 19 271 994 5977
- **Email**: admin@lafabuleuse.tg

---

## 📄 **Licence**

MIT License - Libre pour usage commercial et personnel

---

**🎉 LA FABULEUSE - Prêt pour le déploiement !**
