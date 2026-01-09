# ⚡ Résumé Rapide - Configuration Dynasty 8

## 🎯 Ce que vous devez faire (5 étapes)

### 1️⃣ Configurer les Secrets Discord

Dans Figma Make ou Supabase Dashboard :

**DISCORD_CLIENT_SECRET**
- Allez sur : https://discord.com/developers/applications/1459197358347911262/oauth2
- Copiez le "Client Secret"
- Ajoutez-le dans les secrets

**DISCORD_BOT_TOKEN**
- Allez sur : https://discord.com/developers/applications/1459197358347911262/bot
- Copiez le "Token"
- Ajoutez-le dans les secrets

---

### 2️⃣ Déployer sur Netlify

**Option Simple :**
1. Exportez le projet depuis Figma Make
2. Allez sur https://app.netlify.com/drop
3. Glissez-déposez le dossier
4. C'est en ligne ! 🎉

Vous aurez une URL : `https://XXXX.netlify.app`

---

### 3️⃣ Ajouter l'URL dans Discord

**Étape CRUCIALE pour que la connexion fonctionne :**

1. Allez sur : https://discord.com/developers/applications/1459197358347911262/oauth2
2. Dans "Redirects", ajoutez : `https://VOTRE-SITE.netlify.app`
3. Sauvegardez

---

### 4️⃣ Vérifier le Bot Discord

**Le bot doit :**
- ✅ Être sur votre serveur (Guild ID: 1459195760150319290)
- ✅ Avoir les permissions "Gérer les salons"
- ✅ Avoir son rôle **au-dessus** des autres rôles

**Pour vérifier :**
- Discord → Paramètres du serveur → Rôles
- Glissez le rôle du bot tout en haut

---

### 5️⃣ Tester le site

1. **Ouvrez** votre URL Netlify
2. **Connectez-vous** avec Discord
3. **Testez** :
   - ✅ Parcourir le catalogue
   - ✅ Ajouter au panier
   - ✅ Passer une commande
   - ✅ Vérifier qu'un salon Discord est créé

---

## 📊 Tableau de Bord

### ✅ Configuration Discord

| Élément | ID/URL | Statut |
|---------|--------|--------|
| **Client ID** | `1459197358347911262` | ✅ Configuré |
| **Guild ID** | `1459195760150319290` | ✅ Configuré |
| **Webhook** | `https://discord.com/api/webhooks/...` | ✅ Configuré |
| **Role Admin** | `1459196167991595008` | ✅ Configuré |
| **Role Ticket Staff** | `1459196844432294066` | ✅ Configuré |
| **Client Secret** | Secret | ⚠️ À configurer |
| **Bot Token** | Secret | ⚠️ À configurer |
| **Redirect URI** | `https://VOTRE-SITE.netlify.app` | ⚠️ À ajouter après déploiement |

### ✅ Fonctionnalités

| Fonctionnalité | Description | Statut |
|----------------|-------------|--------|
| **Connexion Discord** | OAuth 2.0 | ✅ Prêt |
| **Catalogue** | Avec filtres | ✅ Prêt |
| **Panier** | Multi-propriétés | ✅ Prêt |
| **Admin Panel** | Gestion propriétés | ✅ Prêt |
| **Webhooks** | Notifications | ✅ Prêt |
| **Tickets Discord** | Auto création salons | ✅ Prêt |

---

## 🔑 Qui peut faire quoi ?

### Visiteurs (tout le monde)
- ✅ Voir le catalogue
- ✅ Filtrer les propriétés
- ✅ Voir les détails
- ❌ Ne peut PAS ajouter au panier (doit se connecter)

### Utilisateurs connectés
- ✅ Tout ce que font les visiteurs
- ✅ Ajouter au panier
- ✅ Passer des commandes
- ✅ Recevoir un salon Discord privé

### Admins (Role ID: 1459196167991595008)
- ✅ Tout ce que font les utilisateurs
- ✅ Ajouter des propriétés
- ✅ Supprimer des propriétés
- ✅ Créer des catégories
- ✅ Voir toutes les commandes
- ✅ Changer les statuts

### Staff Tickets (Role ID: 1459196844432294066)
- ✅ Voir tous les salons de tickets créés
- ✅ Recevoir les notifications de commandes
- ✅ Communiquer avec les clients

---

## 🎨 Personnalisation du Site

### Changer le nom du site Netlify

1. Dashboard Netlify → "Site settings"
2. "Change site name"
3. Exemple : `dynasty8-newwave`

### Ajouter un domaine personnalisé

1. Achetez un domaine (ex: dynasty8.gg)
2. Netlify → "Domain settings" → "Add custom domain"
3. Suivez les instructions

---

## 📞 Support & Documentation

- **Guide complet** : Voir `GUIDE_INSTALLATION.md`
- **Setup Discord** : Voir `DISCORD_SETUP.md`
- **Export Netlify** : Voir `EXPORT_NETLIFY.md`

### Logs & Débogage

- **Logs serveur** : Supabase Dashboard → Edge Functions → Logs
- **Erreurs Discord** : Console du navigateur (F12)
- **Webhook test** : Envoyez un message test dans le salon

---

## 🚀 Prêt à lancer ?

**Checklist finale :**

- [ ] DISCORD_CLIENT_SECRET configuré
- [ ] DISCORD_BOT_TOKEN configuré
- [ ] Site déployé sur Netlify
- [ ] URL ajoutée dans Discord OAuth Redirects
- [ ] Bot sur le serveur avec bonnes permissions
- [ ] Rôle du bot en haut de la hiérarchie
- [ ] Connexion testée
- [ ] Commande test passée
- [ ] Salon Discord créé automatiquement

**Une fois tout coché, vous êtes prêt ! 🎉**

---

## 💡 Conseils Pro

1. **Testez d'abord** avec un compte non-admin pour vérifier l'expérience utilisateur
2. **Créez quelques propriétés** avant de promouvoir le site
3. **Ajoutez de vraies images** (Unsplash, Imgur) pour un meilleur rendu
4. **Surveillez les logs** les premiers jours pour détecter les erreurs
5. **Formez votre équipe** sur comment gérer les tickets Discord

---

## 🎯 Prochaines Étapes

Une fois le site en ligne :

1. **Ajoutez des propriétés** via le panel admin
2. **Partagez le lien** sur votre serveur Discord
3. **Créez un salon** #dynasty8 pour promouvoir le site
4. **Formez votre staff** sur le système de tickets
5. **Récoltez les feedback** et améliorez !

---

**Bon business sur NewWave ! 💼🏠**
