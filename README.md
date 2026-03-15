# 🍽️ LA FABULEUSE - Bar Restaurant Café

Site web professionnel moderne pour bar-restaurant-café avec système de commande WhatsApp.

## 🚀 Setup Rapide

### 1. Installation
```bash
npm install
```

### 2. Configuration Firebase

#### Créer le projet Firebase
1. Allez sur https://console.firebase.google.com/
2. Créez un nouveau projet : `la-fabuleuse-tg-669c0`
3. Activez **Firestore Database**

#### Obtenir les clés
Dans Firebase Console → Paramètres du projet → Général :
- API Key
- Auth Domain  
- Project ID
- Storage Bucket
- Messaging Sender ID
- App ID

#### Mettre à jour la configuration
Dans `src/lib/firebase.ts`, remplacez les valeurs par vos clés Firebase.

### 3. Configuration Firestore

#### Règles de sécurité
Dans Firebase Console → Firestore Database → Règles :
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /menu/{menuId} {
      allow read: if true;
      allow write: if request.auth != null && 
        request.auth.token.email == 'admin@lafabuleuse.tg';
    }
    
    match /settings/{settingsId} {
      allow read: if true;
      allow write: if request.auth != null && 
        request.auth.token.email == 'admin@lafabuleuse.tg';
    }
  }
}
```

#### Ajouter les données
Ouvrez votre site déployé → F12 → Console → Collez ce code :
```javascript
(async function() {
  const menu = [
    {name:"Thieboudienne",desc:"Plat national sénégalais",price:3500,category:"restaurant",image:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400"},
    {name:"Yassa Poulet",desc:"Poulet mariné au citron",price:3200,category:"restaurant",image:"https://images.unsplash.com/photo-1604503468506-a8daa028b4bd?w=400"},
    {name:"Mafé Bœuf",desc:"Ragoût de bœuf à la sauce arachide",price:3800,category:"restaurant",image:"https://images.unsplash.com/photo-1546829008-41909313e6ca?w=400"},
    {name:"Brochettes Poulet",desc:"Brochettes de poulet grillé",price:2800,category:"restaurant",image:"https://images.unsplash.com/photo-1594212625832-e71a5e061ad4?w=400"},
    {name:"Bière Brasseur",desc:"Bière locale fraîche 33cl",price:800,category:"bar",image:"https://images.unsplash.com/photo-1608153396895-56c9f5a5f3a0?w=400"},
    {name:"Cocktail La Fabuleuse",desc:"Mélange exotique de fruits tropicaux",price:1500,category:"bar",image:"https://images.unsplash.com/photo-1551024506-0bcc7e40b5a7?w=400"},
    {name:"Jus de Fruit Frais",desc:"Orange, ananas, ou mangue",price:600,category:"bar",image:"https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400"},
    {name:"Vin Rouge",desc:"Vin français de qualité 25cl",price:1200,category:"bar",image:"https://images.unsplash.com/photo-1560978396-0a6486208f67?w=400"},
    {name:"Café Expresso",desc:"Café italien corsé",price:400,category:"cafe",image:"https://images.unsplash.com/photo-1494477712029-5545db797e65?w=400"},
    {name:"Crème Brûlée",desc:"Dessert français classique",price:900,category:"cafe",image:"https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400"},
    {name:"Tiramisu",desc:"Dessert italien au café",price:1000,category:"cafe",image:"https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400"},
    {name:"Chocolat Chaud",desc:"Chocolat belge onctueux",price:700,category:"cafe",image:"https://images.unsplash.com/photo-1547149600-a6cdf4be59f1?w=400"}
  ];
  
  const settings = {
    restaurant: {name:"LA FABULEUSE",description:"Bar Restaurant Café",address:"Lomé, Togo",phone:"+228 90 12 34 56"},
    horaires: {lundi:"7h00 - 23h00",mardi:"7h00 - 23h00",mercredi:"7h00 - 23h00",jeudi:"7h00 - 23h00",vendredi:"7h00 - 01h00",samedi:"7h00 - 01h00",dimanche:"7h00 - 23h00"},
    contact: {whatsappNumber:"259192719945977",facebookUrl:"https://facebook.com/lafabuleuse",instagramUrl:"https://instagram.com/lafabuleuse"}
  };
  
  try {
    for(const item of menu) {
      await addDoc(collection(db,'menu'),{name:item.name,description:item.desc,price:item.price,category:item.category,image:item.image});
      console.log(`✅ ${item.name}`);
    }
    await setDoc(doc(db,'settings','main'),settings);
    console.log('🎉 Données ajoutées ! Actualisez la page');
  } catch(error) {
    console.error('❌ Erreur:',error);
  }
})();
```

### 4. Déploiement

#### Netlify (Recommandé)
1. Allez sur https://app.netlify.com/
2. "New site from Git"
3. Connectez votre GitHub
4. Configuration :
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Déployez !

#### Variables d'environnement Netlify
Dans Netlify → Site settings → Environment variables :
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

## 📱 Fonctionnalités

- ✅ **Menu en ligne** avec catégories (Restaurant/Bar/Café)
- ✅ **Responsive design** (Mobile/Tablette/Desktop)
- ✅ **Panier intelligent** avec calcul automatique
- ✅ **Commandes WhatsApp** directes
- ✅ **Logo personnalisé** LA FABULEUSE
- ✅ **Admin panel** pour gérer le menu
- ✅ **SEO optimisé** avec sitemap et meta tags

## 🛠️ Technologies

- **React 19** avec TypeScript
- **Tailwind CSS** pour le style
- **Firebase Firestore** pour la base de données
- **Motion** pour les animations
- **Lucide React** pour les icônes
- **Vite** pour le build

## 📁 Structure du projet

```
src/
├── components/          # Composants React
│   ├── Header.tsx      # Navigation responsive
│   ├── MenuGrid.tsx    # Grille du menu
│   ├── CartSidebar.tsx # Panier latéral
│   └── Footer.tsx      # Pied de page
├── lib/
│   └── firebase.ts     # Configuration Firebase
├── pages/
│   ├── Home.tsx        # Page d'accueil
│   ├── Login.tsx       # Connexion admin
│   └── Admin.tsx       # Panel admin
└── styles/
    └── responsive.css  # Styles responsive
```

## 🚨 Dépannage

### Erreurs TypeScript
1. Redémarrez VS Code
2. Ctrl+Shift+P → "TypeScript: Restart TS Server"
3. Exécutez `npm install`

### Firebase ne se connecte pas
1. Vérifiez les clés dans `firebase.ts`
2. Confirmez que Firestore est activé
3. Vérifiez les règles de sécurité

### Le menu ne s'affiche pas
1. Exécutez le script d'ajout de données
2. Vérifiez la collection `menu` dans Firebase Console
3. Actualisez la page

## 🎯 URLs finales

- **Site** : `https://la-fabuleuse.netlify.app`
- **Admin** : `https://la-fabuleuse.netlify.app/login`
- **Firebase** : https://console.firebase.google.com

---

🎉 **Créé avec ❤️ pour LA FABULEUSE**
