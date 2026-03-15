# ⚡ Setup Ultra-Rapide - 5 Minutes

## 🚀 Instructions Complètes

### 1. Firebase (2 minutes)
1. https://console.firebase.google.com/ → Nouveau projet
2. Nom : `la-fabuleuse-tg-669c0`
3. Activez **Firestore Database**
4. Copiez vos clés dans `src/lib/firebase.ts`

### 2. Règles Firestore (30 secondes)
Dans Firebase → Firestore → Règles :
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### 3. Ajouter les données (1 minute)
Sur votre site déployé → F12 → Console → Collez :
```javascript
(async function() {
  const menu = [
    {name:"Thieboudienne",desc:"Plat national sénégalais",price:3500,category:"restaurant"},
    {name:"Yassa Poulet",desc:"Poulet mariné au citron",price:3200,category:"restaurant"},
    {name:"Bière Brasseur",desc:"Bière locale fraîche 33cl",price:800,category:"bar"},
    {name:"Café Expresso",desc:"Café italien corsé",price:400,category:"cafe"}
  ];
  
  for(const item of menu) {
    await addDoc(collection(db,'menu'),{name:item.name,description:item.desc,price:item.price,category:item.category,image:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400"});
    console.log(`✅ ${item.name}`);
  }
})();
```

### 4. Déploiement Netlify (2 minutes)
1. https://app.netlify.com/ → New site from Git
2. Build command : `npm run build`
3. Publish directory : `dist`
4. Déployez !

---

🎉 **Votre site LA FABULEUSE est live !**
