# 🏢 Dynasty 8 - Guide d'Installation Complet

Bienvenue ! Ce guide vous explique comment configurer et déployer votre site Dynasty 8 pour votre serveur FiveM NewWave.

---

## 📋 Table des matières

1. [Configuration Discord](#1-configuration-discord)
2. [Configuration des secrets Supabase](#2-configuration-des-secrets-supabase)
3. [Déploiement sur Netlify](#3-déploiement-sur-netlify)
4. [Configuration du Bot Discord](#4-configuration-du-bot-discord)
5. [Test du système](#5-test-du-système)

---

## 1. Configuration Discord

### 1.1 Application Discord OAuth

Votre application Discord est déjà créée avec le Client ID: `1459197358347911262`

**Étapes à suivre :**

1. **Allez sur** : https://discord.com/developers/applications/1459197358347911262/oauth2
2. **Dans "Redirects"**, ajoutez l'URL de redirection :
   - Pour le test local : `http://localhost:3000`
   - **IMPORTANT** : Une fois déployé sur Netlify, revenez ici et ajoutez aussi : `https://VOTRE-SITE.netlify.app`
   
   ⚠️ Remplacez `VOTRE-SITE` par le nom de votre site Netlify

3. **Sauvegardez** les changements

### 1.2 Bot Discord

Votre bot est déjà invité avec ce lien :
```
https://discord.com/oauth2/authorize?client_id=1459197358347911262&permissions=8&integration_type=0&scope=bot
```

**Le bot a besoin des permissions suivantes pour créer des salons de tickets :**
- ✅ Gérer les salons
- ✅ Voir les salons
- ✅ Envoyer des messages
- ✅ Lire l'historique des messages

---

## 2. Configuration des Secrets Supabase

Vous avez déjà configuré certains secrets. Il reste à configurer **2 secrets importants** :

### 2.1 DISCORD_CLIENT_SECRET

1. **Allez sur** : https://discord.com/developers/applications/1459197358347911262/oauth2
2. **Copiez** le "Client Secret" (cliquez sur "Reset Secret" si nécessaire)
3. **Dans Figma Make**, le système vous a demandé de saisir `DISCORD_CLIENT_SECRET`
4. **Collez** le secret que vous avez copié

### 2.2 DISCORD_BOT_TOKEN

1. **Allez sur** : https://discord.com/developers/applications/1459197358347911262/bot
2. **Copiez** le "Token" (cliquez sur "Reset Token" si nécessaire)
3. **Dans Figma Make**, le système vous a demandé de saisir `DISCORD_BOT_TOKEN`
4. **Collez** le token que vous avez copié

⚠️ **IMPORTANT** : Ne partagez JAMAIS ces secrets avec personne !

---

## 3. Déploiement sur Netlify

### Option A : Déploiement via GitHub (Recommandé)

1. **Créez un repository GitHub** avec tous les fichiers du projet
2. **Allez sur** : https://app.netlify.com/
3. **Cliquez** sur "Add new site" → "Import an existing project"
4. **Sélectionnez** votre repository GitHub
5. **Configuration du build** :
   ```
   Build command: npm run build
   Publish directory: dist
   ```
6. **Cliquez** sur "Deploy site"

### Option B : Déploiement manuel

1. **Téléchargez** tous les fichiers du projet
2. **Allez sur** : https://app.netlify.com/
3. **Faites glisser** le dossier du projet dans la zone "Drop your site folder here"
4. **Attendez** la fin du déploiement

### 3.1 Après le déploiement

Une fois déployé, vous aurez une URL comme : `https://dynasty8-newwave.netlify.app`

**⚠️ ACTION IMPORTANTE** : Retournez dans Discord Developer Portal et ajoutez cette URL dans les redirects OAuth !

1. **Allez sur** : https://discord.com/developers/applications/1459197358347911262/oauth2
2. **Ajoutez** l'URL dans "Redirects" : `https://VOTRE-SITE.netlify.app`
3. **Sauvegardez**

---

## 4. Configuration du Bot Discord

### 4.1 Hébergement du Bot Gratuit

Votre backend Supabase gère déjà la création automatique des salons Discord ! Pas besoin d'héberger un bot séparé.

**Comment ça fonctionne :**
- Le serveur Supabase Edge Functions tourne 24/7 gratuitement
- Quand une commande est passée, le serveur utilise le Bot Token pour créer un salon Discord
- Le salon est créé avec les permissions pour :
  - Le client qui a passé la commande
  - Les membres avec le rôle `1459196844432294066` (Ticket Staff)

### 4.2 Vérification du Bot

1. **Assurez-vous** que le bot est bien sur votre serveur Discord
2. **Le bot doit avoir** :
   - ✅ Permission "Gérer les salons"
   - ✅ Permission "Voir tous les salons"
   - ✅ Son rôle doit être **au-dessus** des autres rôles dans la hiérarchie

---

## 5. Test du Système

### 5.1 Test de l'authentification

1. **Ouvrez** votre site web
2. **Cliquez** sur "Connexion Discord"
3. **Autorisez** l'application Discord
4. **Vérifiez** que vous êtes bien connecté

### 5.2 Test des permissions Admin

Si vous avez le rôle `1459196167991595008` sur Discord :
- ✅ Vous devriez voir le bouton "Admin" dans la navbar
- ✅ Vous pouvez ajouter des propriétés
- ✅ Vous pouvez gérer les commandes

### 5.3 Test du système de commande

1. **Parcourez** le catalogue
2. **Ajoutez** une propriété au panier
3. **Cliquez** sur le panier
4. **Remplissez** le formulaire :
   - Nom & Prénom RP
   - Numéro de téléphone en jeu
   - Message (optionnel)
5. **Passez** la commande
6. **Vérifiez** sur Discord :
   - ✅ Une notification dans le salon webhook
   - ✅ Un nouveau salon créé automatiquement

---

## 🎯 Résumé des IDs importants

| Élément | ID |
|---------|-----|
| **Guild ID** | `1459195760150319290` |
| **Client ID** | `1459197358347911262` |
| **Role Admin** | `1459196167991595008` |
| **Role Ticket Staff** | `1459196844432294066` |
| **Webhook URL** | `https://discord.com/api/webhooks/1459196564206518437/...` |

---

## 🔧 Comment fonctionne le système de tickets ?

### Flux de commande :

```
1. Client se connecte avec Discord OAuth
   ↓
2. Client parcourt le catalogue et ajoute au panier
   ↓
3. Client remplit le formulaire de commande
   ↓
4. Backend reçoit la commande
   ↓
5. Webhook Discord envoie une notification
   ↓
6. Bot Discord crée un salon privé
   ↓
7. Salon visible par :
   - Le client (via son User ID Discord)
   - Les membres avec le rôle Ticket Staff
```

### Permissions des salons créés :

- **@everyone** : ❌ Ne peut pas voir
- **Client** : ✅ Peut voir et écrire
- **Staff (Role Ticket)** : ✅ Peut voir et écrire

---

## ❓ Problèmes courants

### "Le bot ne crée pas de salon"

**Solutions :**
1. Vérifiez que le Bot Token est correct dans les secrets Supabase
2. Vérifiez que le bot a les permissions "Gérer les salons"
3. Vérifiez que le rôle du bot est au-dessus des autres dans Discord

### "Je ne peux pas ajouter de propriétés"

**Solutions :**
1. Vérifiez que vous avez le rôle `1459196167991595008` sur Discord
2. Reconnectez-vous au site
3. Vérifiez les logs du serveur dans Supabase

### "Erreur lors de la connexion Discord"

**Solutions :**
1. Vérifiez que l'URL de redirect est bien configurée dans Discord Developer Portal
2. Vérifiez que le Client Secret est correct dans Supabase
3. Essayez en navigation privée

---

## 📞 Support

Pour toute question ou problème :
1. Vérifiez les logs du serveur Supabase
2. Vérifiez les permissions du bot Discord
3. Consultez ce guide

---

## 🎉 C'est prêt !

Votre site Dynasty 8 est maintenant opérationnel ! Vous pouvez :
- ✅ Gérer les propriétés
- ✅ Recevoir des commandes
- ✅ Créer automatiquement des tickets Discord
- ✅ Suivre toutes les commandes dans le panel admin

**Bon business sur NewWave ! 🚀**
