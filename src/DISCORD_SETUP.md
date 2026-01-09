# 🎮 Configuration Discord - Guide Détaillé

Ce guide explique en détail comment fonctionne l'intégration Discord et comment tout configurer.

---

## 📋 Vue d'ensemble

Votre système Dynasty 8 utilise **3 composants Discord** :

1. **OAuth Application** : Pour la connexion des utilisateurs
2. **Bot Discord** : Pour créer les salons de tickets automatiquement
3. **Webhook** : Pour envoyer les notifications

---

## 1. OAuth Application (Connexion Discord)

### Qu'est-ce que c'est ?

L'OAuth permet aux utilisateurs de se connecter au site avec leur compte Discord, sans créer de mot de passe.

### Configuration actuelle

- **Application ID** : `1459197358347911262`
- **Nom** : Dynasty 8 (ou le nom que vous avez choisi)

### ⚙️ Configuration requise

1. **Allez sur** : https://discord.com/developers/applications/1459197358347911262/oauth2

2. **OAuth2 URL Generator** :
   - ✅ Scopes : `identify`, `guilds`, `guilds.members.read`
   - ✅ Redirect URI : `https://VOTRE-SITE.netlify.app`

3. **Redirects** (section en haut) :
   ```
   https://VOTRE-SITE.netlify.app
   http://localhost:3000  (pour les tests locaux)
   ```

4. **Client Secret** :
   - Cliquez sur "Reset Secret"
   - **COPIEZ** le secret
   - **AJOUTEZ-LE** dans les secrets Supabase comme `DISCORD_CLIENT_SECRET`

### 🔐 Sécurité

- ⚠️ Ne partagez JAMAIS le Client Secret
- ⚠️ Le Client Secret ne doit JAMAIS être dans le code frontend
- ✅ Il est stocké de manière sécurisée dans Supabase

---

## 2. Bot Discord (Création de salons)

### Qu'est-ce que c'est ?

Le bot crée automatiquement un salon Discord privé pour chaque commande passée sur le site.

### Configuration actuelle

- **Bot ID** : `1459197358347911262` (même ID que l'application)
- **Serveur** : NewWave (`1459195760150319290`)

### ⚙️ Permissions requises

Le bot a besoin de ces permissions :

| Permission | Pourquoi |
|------------|----------|
| **Gérer les salons** | Pour créer les salons de tickets |
| **Voir les salons** | Pour accéder aux salons créés |
| **Envoyer des messages** | Pour envoyer le récapitulatif de commande |
| **Lire l'historique** | Pour voir les messages du client |
| **Gérer les permissions** | Pour définir qui voit le salon |

### 🔧 Invitation du bot

Votre bot est déjà invité avec :
```
https://discord.com/oauth2/authorize?client_id=1459197358347911262&permissions=8&integration_type=0&scope=bot
```

Si besoin de le réinviter :
1. **Allez sur** : https://discord.com/developers/applications/1459197358347911262/bot
2. **Copiez** l'URL OAuth2 avec les permissions ci-dessus
3. **Ouvrez** l'URL dans votre navigateur
4. **Sélectionnez** votre serveur NewWave

### 🎯 Bot Token

1. **Allez sur** : https://discord.com/developers/applications/1459197358347911262/bot
2. **Cliquez** sur "Reset Token"
3. **COPIEZ** le token
4. **AJOUTEZ-LE** dans les secrets Supabase comme `DISCORD_BOT_TOKEN`

### ⚠️ Important pour les salons

**Le rôle du bot doit être en haut de la hiérarchie !**

Dans Discord :
1. **Paramètres du serveur** → **Rôles**
2. **Trouvez** le rôle du bot (Dynasty 8)
3. **Glissez-le** tout en haut (juste en dessous de @everyone)

Sinon, le bot ne pourra pas gérer les permissions des salons créés !

---

## 3. Webhook (Notifications)

### Qu'est-ce que c'est ?

Le webhook envoie des notifications instantanées dans un salon Discord quand :
- Une nouvelle propriété est ajoutée
- Une commande est passée

### Configuration actuelle

- **URL** : `https://discord.com/api/webhooks/1459196564206518437/oX0lLde_yDUsZOVPt9UpZALsi2rdcKxJWI9MgB4IENLsbgOEg2conl3Y5eTnrDhfOpMY`
- **Salon** : Le salon où vous avez créé le webhook

### ⚙️ Configuration du webhook

1. **Dans Discord**, allez dans le salon où vous voulez recevoir les notifications
2. **Paramètres du salon** → **Intégrations** → **Webhooks**
3. **Créez un webhook** (ou utilisez celui existant)
4. **Copiez l'URL** du webhook
5. **Utilisez cette URL** dans le serveur Supabase

### 📨 Types de notifications

#### Nouvelle propriété
```json
{
  "embeds": [{
    "title": "🏠 Nouvelle Propriété Ajoutée",
    "description": "Villa moderne...",
    "color": 0x00ff00
  }]
}
```

#### Nouvelle commande
```json
{
  "content": "<@&1459196844432294066>",
  "embeds": [{
    "title": "🛒 Nouvelle Commande",
    "description": "Client: Jean Dupont...",
    "color": 0x0099ff
  }]
}
```

---

## 4. Système de Rôles

### Role Admin (Peut tout gérer)

- **Role ID** : `1459196167991595008`
- **Permissions** :
  - ✅ Ajouter des propriétés
  - ✅ Supprimer des propriétés
  - ✅ Ajouter des catégories
  - ✅ Voir toutes les commandes
  - ✅ Changer le statut des commandes

### Role Ticket Staff (Peut voir les tickets)

- **Role ID** : `1459196844432294066`
- **Permissions** :
  - ✅ Voir les salons de tickets créés
  - ✅ Communiquer avec les clients
  - ✅ Recevoir les notifications de commandes

### 🎯 Comment attribuer les rôles

Dans Discord :
1. **Paramètres du serveur** → **Rôles**
2. **Trouvez** vos rôles
3. **Clic droit** sur un membre → **Rôles** → Cochez le rôle

---

## 5. Fonctionnement du Système de Tickets

### Flux complet

```
1. Client se connecte avec Discord OAuth
   ↓
2. Le site vérifie son appartenance au serveur
   ↓
3. Client passe une commande
   ↓
4. Le serveur Supabase reçoit la commande
   ↓
5. Webhook envoie notification + tag @Role Ticket Staff
   ↓
6. Bot crée un salon privé : "commande-abc123"
   ↓
7. Permissions du salon :
   - @everyone : ❌ Ne peut pas voir
   - Client (via User ID) : ✅ Peut voir et écrire
   - Role Ticket Staff : ✅ Peut voir et écrire
   ↓
8. Bot envoie le récapitulatif de commande dans le salon
   ↓
9. Client et Staff peuvent discuter
```

### Exemple de salon créé

**Nom** : `commande-a1b2c3d4`
**Topic** : `Commande de Jean Dupont - username#1234`

**Permissions** :
- `@everyone` : Deny VIEW_CHANNEL
- `@Ticket Staff` (Role) : Allow VIEW_CHANNEL
- `username#1234` (User) : Allow VIEW_CHANNEL

**Premier message** :
```
🛒 Détails de la Commande

Client: Jean Dupont
Téléphone RP: 555-0123
Discord: username#1234

Propriétés:
• Villa moderne (Maisons modernes) - $250,000
• Appartement luxueux (Appartements luxueux) - $150,000

Total: $400,000

Message du client:
Je voudrais visiter les propriétés ce week-end.
```

---

## 6. Troubleshooting

### Le bot ne crée pas de salon

**Vérifiez :**
1. ✅ Le Bot Token est correct dans Supabase
2. ✅ Le bot a les permissions "Gérer les salons"
3. ✅ Le rôle du bot est au-dessus des autres rôles
4. ✅ Le bot est bien sur le serveur

**Test :**
```
Essayez manuellement : @Bot créer un salon
```

### Les notifications ne s'envoient pas

**Vérifiez :**
1. ✅ L'URL du webhook est correcte
2. ✅ Le webhook n'a pas été supprimé dans Discord
3. ✅ Le salon du webhook existe toujours

**Test :**
```bash
curl -X POST "WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{"content": "Test webhook"}'
```

### La connexion Discord échoue

**Vérifiez :**
1. ✅ L'URL de redirect est dans Discord OAuth
2. ✅ Le Client Secret est correct dans Supabase
3. ✅ L'utilisateur autorise bien l'application

**Test :**
```
Essayez en navigation privée
Vérifiez les logs dans Supabase Edge Functions
```

### L'utilisateur ne peut pas voir son ticket

**Vérifiez :**
1. ✅ L'utilisateur est bien sur le serveur Discord
2. ✅ Les permissions du salon sont correctes
3. ✅ Le bot a bien ajouté l'utilisateur

**Solution :**
```
Ajoutez manuellement l'utilisateur au salon si besoin
Vérifiez que son User ID Discord est correct
```

---

## 7. Sécurité et Bonnes Pratiques

### ✅ À FAIRE

- Gardez vos tokens secrets en sécurité
- Utilisez des rôles Discord pour gérer les permissions
- Vérifiez régulièrement les logs Supabase
- Testez le système avec un compte non-admin

### ❌ À NE PAS FAIRE

- Ne partagez JAMAIS le Bot Token
- Ne mettez JAMAIS le Client Secret dans le code frontend
- N'utilisez PAS le même webhook pour plusieurs bots
- Ne donnez PAS les permissions admin du bot à tout le monde

### 🔒 Recommandations

1. **Changez les tokens** si vous pensez qu'ils ont été compromis
2. **Limitez les rôles** : Seulement les personnes de confiance
3. **Surveillez les logs** : Vérifiez les activités suspectes
4. **Backup** : Notez tous les IDs importants quelque part de sûr

---

## 8. Récapitulatif des IDs

Pour votre référence, voici tous les IDs importants :

```yaml
Discord:
  Guild ID: "1459195760150319290"
  Client ID: "1459197358347911262"
  
Roles:
  Admin: "1459196167991595008"
  Ticket Staff: "1459196844432294066"

Webhook:
  URL: "https://discord.com/api/webhooks/1459196564206518437/..."

Secrets Supabase:
  - DISCORD_CLIENT_SECRET
  - DISCORD_BOT_TOKEN
  - SUPABASE_URL
  - SUPABASE_ANON_KEY
  - SUPABASE_SERVICE_ROLE_KEY
```

---

## 9. Support Discord

Si vous avez besoin de plus d'aide avec Discord :

1. **Discord Developer Portal** : https://discord.com/developers/docs
2. **Supabase Docs** : https://supabase.com/docs
3. **Vérifiez les logs** dans Supabase Edge Functions

---

## 🎉 Félicitations !

Vous avez maintenant une compréhension complète de l'intégration Discord de Dynasty 8 !

**Le système est prêt à :**
- ✅ Authentifier les utilisateurs via Discord
- ✅ Créer automatiquement des tickets
- ✅ Notifier le staff instantanément
- ✅ Gérer les permissions automatiquement

**Bon business sur NewWave ! 🚀**
