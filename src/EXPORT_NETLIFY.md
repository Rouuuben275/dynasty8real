# 📤 Comment exporter et héberger sur Netlify

## 🎯 Méthode Rapide (Recommandée)

### Depuis Figma Make

1. **Cliquez** sur le bouton "Export" en haut à droite
2. **Téléchargez** le fichier ZIP contenant tout le projet
3. **Décompressez** le fichier ZIP sur votre ordinateur

### Hébergement sur Netlify

#### Option 1 : Drag & Drop (Plus Simple)

1. **Allez sur** : https://app.netlify.com/drop
2. **Créez un compte** Netlify (gratuit) si vous n'en avez pas
3. **Glissez-déposez** le dossier décompressé dans la zone
4. **Attendez** 30 secondes
5. **Votre site est en ligne !** 🎉

Vous recevrez une URL comme : `https://dynasty8-abc123.netlify.app`

#### Option 2 : Via GitHub (Pour mises à jour faciles)

1. **Créez un repository GitHub**
2. **Uploadez** tous les fichiers du projet
3. **Allez sur** : https://app.netlify.com/
4. **Cliquez** sur "Add new site" → "Import an existing project"
5. **Sélectionnez** GitHub et votre repository
6. **Configurez** :
   ```
   Build command: (laissez vide)
   Publish directory: (laissez vide ou mettez ".")
   ```
7. **Déployez** !

---

## 🔧 Configuration Post-Déploiement

### 1. Récupérer votre URL Netlify

Après le déploiement, vous aurez une URL comme :
```
https://dynasty8-abc123.netlify.app
```

**💡 Astuce** : Vous pouvez personnaliser cette URL dans Netlify :
- Allez dans "Site settings" → "Change site name"
- Exemple : `dynasty8-newwave.netlify.app`

### 2. Configurer Discord OAuth Redirect

⚠️ **IMPORTANT** : Sans cette étape, la connexion Discord ne fonctionnera pas !

1. **Allez sur** : https://discord.com/developers/applications/1459197358347911262/oauth2
2. **Descendez** à "Redirects"
3. **Ajoutez** votre URL Netlify :
   ```
   https://VOTRE-SITE.netlify.app
   ```
4. **Cliquez** sur "Add Redirect"
5. **Sauvegardez** les changements

### 3. Configurer les Secrets Supabase

Si ce n'est pas déjà fait, vous devez configurer 2 secrets :

#### DISCORD_CLIENT_SECRET

1. **Dans Discord Developer** : https://discord.com/developers/applications/1459197358347911262/oauth2
2. **Copiez** le "Client Secret"
3. **Dans Figma Make** : Ajoutez-le quand demandé
4. **Ou dans Supabase** : Dashboard → Project Settings → Edge Functions → Secrets

#### DISCORD_BOT_TOKEN

1. **Dans Discord Developer** : https://discord.com/developers/applications/1459197358347911262/bot
2. **Copiez** le "Token"
3. **Dans Figma Make** : Ajoutez-le quand demandé
4. **Ou dans Supabase** : Dashboard → Project Settings → Edge Functions → Secrets

---

## ✅ Vérification que tout fonctionne

### Test 1 : Le site s'affiche

- ✅ Ouvrez votre URL Netlify
- ✅ La page d'accueil Dynasty 8 apparaît
- ✅ Le catalogue se charge

### Test 2 : Connexion Discord

- ✅ Cliquez sur "Connexion Discord"
- ✅ Vous êtes redirigé vers Discord
- ✅ Après autorisation, vous revenez sur le site connecté
- ✅ Votre nom Discord apparaît en haut à droite

### Test 3 : Admin (si vous avez le rôle)

- ✅ Le bouton "Admin" apparaît
- ✅ Vous pouvez ajouter des propriétés
- ✅ Les propriétés apparaissent dans le catalogue

### Test 4 : Système de commande

- ✅ Ajoutez une propriété au panier
- ✅ Remplissez le formulaire de commande
- ✅ Passez la commande
- ✅ Une notification apparaît sur Discord
- ✅ Un salon privé est créé

---

## 🔄 Mettre à jour le site

### Si vous utilisez Drag & Drop

1. **Exportez** à nouveau depuis Figma Make
2. **Allez** dans votre dashboard Netlify
3. **Cliquez** sur "Deploys" → "Drag and drop"
4. **Déposez** le nouveau dossier

### Si vous utilisez GitHub

1. **Push** vos modifications sur GitHub
2. **Netlify redéploie** automatiquement ! 🚀

---

## 🎨 Personnaliser le nom de domaine (Optionnel)

### Domaine Netlify gratuit

Dans Netlify :
1. **Site settings** → "Change site name"
2. **Choisissez** un nom : `dynasty8-newwave`
3. **Votre URL** : `https://dynasty8-newwave.netlify.app`

### Domaine personnalisé (payant)

1. **Achetez** un domaine (exemple: dynasty8.gg)
2. **Dans Netlify** : "Domain settings" → "Add custom domain"
3. **Suivez** les instructions DNS

---

## 📊 Monitoring et Logs

### Voir les visiteurs

Dans Netlify :
- **Analytics** : Nombre de visiteurs, pages vues
- **Deploys** : Historique des déploiements

### Voir les logs du serveur

Dans Supabase :
- **Edge Functions** → "Logs"
- Vous verrez tous les appels API, erreurs, etc.

### Voir les notifications Discord

- Votre webhook Discord recevra toutes les notifications
- Commandes, nouvelles propriétés, etc.

---

## ❓ FAQ

### "Le site ne s'affiche pas"

- Vérifiez que le déploiement est terminé dans Netlify
- Attendez 1-2 minutes après le déploiement
- Videz le cache de votre navigateur (Ctrl+F5)

### "La connexion Discord ne fonctionne pas"

- Vérifiez que l'URL Netlify est dans Discord OAuth Redirects
- Vérifiez que le Client Secret est configuré dans Supabase
- Essayez en navigation privée

### "Les salons Discord ne se créent pas"

- Vérifiez que le Bot Token est configuré dans Supabase
- Vérifiez que le bot a les permissions "Gérer les salons"
- Vérifiez que le bot est bien sur le serveur Discord

### "Je ne peux pas ajouter de propriétés"

- Vérifiez que vous avez le rôle Admin (ID: 1459196167991595008) sur Discord
- Déconnectez-vous et reconnectez-vous au site

---

## 🎉 C'est tout !

Votre site Dynasty 8 est maintenant :
- ✅ Hébergé gratuitement sur Netlify
- ✅ Connecté à Discord
- ✅ Avec création automatique de tickets
- ✅ Accessible 24/7
- ✅ Prêt à recevoir des commandes

**Profitez de votre nouveau site ! 🚀**

---

## 💡 Conseils Pro

1. **Domaine personnalisé** : Donne un aspect plus professionnel
2. **Analytics** : Activez Google Analytics dans Netlify pour suivre les stats
3. **SEO** : Ajoutez une meta description pour le référencement
4. **Performance** : Netlify optimise automatiquement les images
5. **HTTPS** : Activé automatiquement et gratuitement par Netlify

---

## 📞 Besoin d'aide ?

Si vous rencontrez un problème :
1. Consultez le GUIDE_INSTALLATION.md
2. Vérifiez les logs Supabase
3. Vérifiez la console du navigateur (F12)
4. Vérifiez les permissions Discord du bot

**Bon business sur NewWave ! 🏠💼**
