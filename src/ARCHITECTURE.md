# 🏗️ Architecture Dynasty 8

Ce document explique comment tous les composants fonctionnent ensemble.

---

## 🎯 Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────┐
│                        UTILISATEURS                          │
│                    (Visiteurs & Admins)                     │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ HTTPS
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                      NETLIFY CDN                             │
│                   (Site Web Frontend)                        │
│  • React + TypeScript                                       │
│  • Tailwind CSS                                             │
│  • Components UI                                            │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ API Calls
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              SUPABASE EDGE FUNCTIONS                         │
│                  (Backend Server)                            │
│  • Hono Web Framework                                       │
│  • Routes API                                               │
│  • Business Logic                                           │
└─────┬──────────┬──────────┬──────────┬────────────────────┘
      │          │          │          │
      ▼          ▼          ▼          ▼
   ┌─────┐  ┌─────┐  ┌─────────┐  ┌─────────┐
   │ KV  │  │Auth │  │ Discord │  │ Discord │
   │Store│  │ API │  │   Bot   │  │ Webhook │
   └─────┘  └─────┘  └─────────┘  └─────────┘
```

---

## 📦 Composants Principaux

### 1. Frontend (Netlify)

**Technologies :**
- React 18
- TypeScript
- Tailwind CSS v4
- shadcn/ui components

**Fichiers clés :**
```
/App.tsx                    → Component principal
/components/Navbar.tsx      → Navigation
/components/Hero.tsx        → Page d'accueil
/components/Catalog.tsx     → Catalogue avec filtres
/components/PropertyCard.tsx → Cards propriétés
/components/Cart.tsx        → Panier et checkout
/components/AdminPanel.tsx  → Gestion admin
```

**Responsabilités :**
- ✅ Interface utilisateur
- ✅ Gestion d'état (useState, useEffect)
- ✅ Appels API vers le backend
- ✅ Routing et navigation
- ✅ Affichage des données

---

### 2. Backend (Supabase Edge Functions)

**Technologies :**
- Deno Runtime
- Hono (Web Framework)
- TypeScript

**Fichier principal :**
```
/supabase/functions/server/index.tsx
```

**Routes API :**
```
POST   /auth/discord/callback      → OAuth Discord
GET    /auth/session/:sessionId    → Récupérer session
POST   /auth/logout               → Déconnexion

GET    /properties                → Liste propriétés
GET    /properties/:id            → Détails propriété
POST   /properties                → Créer propriété (admin)
PUT    /properties/:id            → Modifier propriété (admin)
DELETE /properties/:id            → Supprimer propriété (admin)

GET    /categories                → Liste catégories
POST   /categories                → Créer catégorie (admin)

POST   /orders                    → Créer commande
GET    /orders                    → Liste commandes
PUT    /orders/:id                → Modifier statut (admin)
```

**Responsabilités :**
- ✅ Authentification Discord OAuth
- ✅ Gestion des permissions
- ✅ CRUD propriétés
- ✅ Gestion des commandes
- ✅ Intégration Discord (Bot + Webhooks)
- ✅ Validation des données

---

### 3. Base de données (Supabase KV Store)

**Type :** Key-Value Store

**Collections :**
```
session:{sessionId}    → Sessions utilisateurs
property:{propertyId}  → Propriétés immobilières
order:{orderId}        → Commandes
categories             → Liste des catégories
```

**Fonctions disponibles :**
- `get(key)` → Récupère une valeur
- `set(key, value)` → Enregistre une valeur
- `del(key)` → Supprime une valeur
- `mget([keys])` → Récupère plusieurs valeurs
- `mset([{key, value}])` → Enregistre plusieurs valeurs
- `getByPrefix(prefix)` → Récupère toutes les clés avec préfixe

---

### 4. Discord OAuth

**Application ID :** `1459197358347911262`

**Flux OAuth :**
```
1. User clique "Connexion Discord"
   ↓
2. Redirect vers Discord OAuth
   ↓
3. User autorise l'application
   ↓
4. Discord redirect avec code
   ↓
5. Backend échange code contre token
   ↓
6. Backend récupère infos user + roles
   ↓
7. Backend crée session
   ↓
8. User est connecté
```

**Permissions demandées :**
- `identify` : Info utilisateur de base
- `guilds` : Liste des serveurs
- `guilds.members.read` : Rôles du membre

---

### 5. Discord Bot

**Bot ID :** `1459197358347911262`

**Permissions requises :**
- Gérer les salons
- Voir les salons
- Envoyer des messages
- Gérer les permissions

**Fonctionnalités :**
```javascript
// Création de salon pour commande
POST /guilds/{guildId}/channels
{
  "name": "commande-a1b2c3d4",
  "type": 0,
  "permission_overwrites": [
    { id: guildId, type: 0, deny: "1024" },      // @everyone
    { id: ticketRoleId, type: 0, allow: "1024" }, // Staff
    { id: userId, type: 1, allow: "1024" }        // Client
  ]
}
```

---

### 6. Discord Webhook

**URL :** `https://discord.com/api/webhooks/1459196564206518437/...`

**Types de notifications :**

**Nouvelle propriété :**
```json
{
  "embeds": [{
    "title": "🏠 Nouvelle Propriété Ajoutée",
    "description": "Villa moderne\nType: Maisons modernes\nPrix: $250,000",
    "color": 65280,
    "timestamp": "2026-01-09T..."
  }]
}
```

**Nouvelle commande :**
```json
{
  "content": "<@&1459196844432294066>",
  "embeds": [{
    "title": "🛒 Nouvelle Commande",
    "description": "Client: Jean Dupont\nTotal: $400,000",
    "color": 39423
  }]
}
```

---

## 🔄 Flux de Données

### Flux 1 : Connexion Utilisateur

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│  Client  │────▶│ Frontend │────▶│ Discord  │────▶│ Backend  │
│ (Browser)│     │ (Netlify)│     │  OAuth   │     │(Supabase)│
└──────────┘     └──────────┘     └──────────┘     └──────────┘
     ▲                                                    │
     └────────────────────────────────────────────────────┘
                    Session créée
```

### Flux 2 : Affichage Catalogue

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│  Client  │────▶│ Frontend │────▶│ Backend  │────▶│    KV    │
│          │     │          │     │          │     │  Store   │
└──────────┘     └──────────┘     └──────────┘     └──────────┘
     ▲                                                    │
     └────────────────────────────────────────────────────┘
                 Liste propriétés
```

### Flux 3 : Ajout Propriété (Admin)

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│  Admin   │────▶│ Frontend │────▶│ Backend  │────▶│    KV    │
│          │     │          │     │ (check   │     │  Store   │
│          │     │          │     │  role)   │     │          │
└──────────┘     └──────────┘     └────┬─────┘     └──────────┘
                                       │
                                       ▼
                                 ┌──────────┐
                                 │ Discord  │
                                 │ Webhook  │
                                 └──────────┘
```

### Flux 4 : Passage de Commande

```
┌──────────┐     ┌──────────┐     ┌──────────┐
│  Client  │────▶│ Frontend │────▶│ Backend  │
│          │     │  (Cart)  │     │          │
└──────────┘     └──────────┘     └────┬─────┘
                                       │
                    ┌──────────────────┼──────────────────┐
                    ▼                  ▼                  ▼
              ┌──────────┐       ┌──────────┐      ┌──────────┐
              │    KV    │       │ Discord  │      │ Discord  │
              │  Store   │       │ Webhook  │      │   Bot    │
              │ (commande│       │(notif)   │      │ (créer   │
              │  saved)  │       │          │      │  salon)  │
              └──────────┘       └──────────┘      └──────────┘
```

---

## 🔐 Sécurité

### Niveaux d'accès

**Public (Non connecté) :**
- ✅ Voir le catalogue
- ✅ Voir les détails des propriétés
- ❌ Panier / Commandes
- ❌ Admin

**Utilisateur connecté :**
- ✅ Tout du public
- ✅ Panier / Commandes
- ✅ Voir ses propres commandes
- ❌ Admin (sauf si rôle)

**Admin (Role ID: 1459196167991595008) :**
- ✅ Tout de l'utilisateur
- ✅ Ajouter/Supprimer propriétés
- ✅ Créer catégories
- ✅ Voir toutes les commandes
- ✅ Changer statuts commandes

### Stockage des secrets

```
┌─────────────────────────────────────────┐
│        SECRETS (Supabase Env)           │
├─────────────────────────────────────────┤
│ DISCORD_CLIENT_SECRET      (Privé)     │
│ DISCORD_BOT_TOKEN          (Privé)     │
│ SUPABASE_SERVICE_ROLE_KEY  (Privé)     │
│                                         │
│ SUPABASE_ANON_KEY          (Public)    │
│ SUPABASE_URL               (Public)    │
└─────────────────────────────────────────┘
```

⚠️ **Important :** Les secrets privés ne doivent JAMAIS être dans le frontend !

---

## 🎛️ Variables d'environnement

### Backend (Supabase)
```bash
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
DISCORD_CLIENT_SECRET=xxx
DISCORD_BOT_TOKEN=xxx
```

### Frontend (Netlify)
```bash
# Pas de variables d'environnement côté frontend
# Tout passe par le backend Supabase
```

---

## 📊 Performance

### Optimisations

**Frontend :**
- React.lazy() pour le code splitting
- Images lazy loaded
- Filtres optimisés avec useMemo
- Cache navigateur

**Backend :**
- KV Store ultra rapide
- Edge Functions géoréparties
- Réponses compressées

**Netlify :**
- CDN mondial
- Cache automatique
- HTTPS automatique
- Compression Brotli

### Limites du plan gratuit

**Netlify :**
- 100 GB bandwidth/mois
- 300 minutes de build/mois
- Illimité en requêtes

**Supabase :**
- 500 MB stockage
- 2 GB bandwidth/mois
- Edge Functions illimitées

---

## 🔧 Maintenance

### Monitoring

**À surveiller :**
- Logs Supabase Edge Functions
- Erreurs dans la console navigateur
- Notifications Discord
- Création des salons

**Outils :**
- Netlify Analytics (visiteurs, pages vues)
- Supabase Dashboard (API calls, erreurs)
- Discord Audit Log (actions du bot)

### Backup

**À sauvegarder régulièrement :**
- Liste des propriétés (export JSON)
- Liste des commandes
- Configuration Discord (IDs, roles)
- Secrets et tokens

---

## 🚀 Scalabilité

### Augmenter la capacité

**Si trop de trafic :**
1. Passer au plan Netlify Pro ($19/mois)
2. Passer au plan Supabase Pro ($25/mois)

**Si trop de propriétés :**
1. Optimiser les images
2. Ajouter la pagination
3. Migrer vers Supabase PostgreSQL

**Si trop de commandes :**
1. Archiver les anciennes commandes
2. Ajouter un système de stats
3. Dashboard analytics

---

## 🎯 Schéma Récapitulatif

```
┌────────────────────────────────────────────────────────────┐
│                     DYNASTY 8 SYSTEM                       │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Frontend (Netlify)                                        │
│    • React + TypeScript                                    │
│    • Catalogue, Panier, Admin                              │
│                         │                                  │
│                         ▼                                  │
│  Backend (Supabase Edge Functions)                         │
│    • API Routes                                            │
│    • Auth, CRUD, Business Logic                            │
│                         │                                  │
│         ┌───────────────┼───────────────┐                  │
│         ▼               ▼               ▼                  │
│    KV Store      Discord OAuth    Discord Bot              │
│   (Database)      (Login)       (Tickets)                  │
│                                      │                     │
│                                      ▼                     │
│                              Discord Webhook               │
│                              (Notifications)               │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## 📚 Ressources

- **React Docs** : https://react.dev
- **Supabase Docs** : https://supabase.com/docs
- **Discord API** : https://discord.com/developers/docs
- **Netlify Docs** : https://docs.netlify.com
- **Tailwind CSS** : https://tailwindcss.com

---

**Architecture conçue pour être :**
- ✅ Scalable
- ✅ Sécurisée
- ✅ Performante
- ✅ Maintenable
- ✅ Gratuite (pour commencer)

🚀 **Dynasty 8 - Architecture professionnelle pour votre agence immobilière FiveM !**
