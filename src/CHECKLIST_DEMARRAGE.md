# ✅ Checklist de Démarrage - Dynasty 8

Suivez cette checklist étape par étape pour mettre votre site en ligne !

---

## 📋 Phase 1 : Configuration Discord (15 min)

### ☐ Étape 1.1 : Client Secret
```
🔗 https://discord.com/developers/applications/1459197358347911262/oauth2
```
- [ ] Cliquez sur "Reset Secret" (si nécessaire)
- [ ] Copiez le Client Secret
- [ ] Gardez-le de côté (vous en aurez besoin pour Supabase)

### ☐ Étape 1.2 : Bot Token
```
🔗 https://discord.com/developers/applications/1459197358347911262/bot
```
- [ ] Cliquez sur "Reset Token" (si nécessaire)
- [ ] Copiez le Bot Token
- [ ] Gardez-le de côté

### ☐ Étape 1.3 : Vérifier le Bot
```
🔗 Votre serveur Discord → Paramètres
```
- [ ] Le bot est sur le serveur
- [ ] Le bot a la permission "Gérer les salons"
- [ ] Le rôle du bot est au-dessus des autres (important !)

---

## 📋 Phase 2 : Configuration Supabase (5 min)

### ☐ Étape 2.1 : DISCORD_CLIENT_SECRET
- [ ] Dans Figma Make ou Supabase Dashboard
- [ ] Ajoutez le secret `DISCORD_CLIENT_SECRET`
- [ ] Collez le Client Secret copié à l'étape 1.1

### ☐ Étape 2.2 : DISCORD_BOT_TOKEN
- [ ] Dans Figma Make ou Supabase Dashboard
- [ ] Ajoutez le secret `DISCORD_BOT_TOKEN`
- [ ] Collez le Bot Token copié à l'étape 1.2

### ☐ Étape 2.3 : Vérifier les autres secrets
- [ ] `SUPABASE_URL` est configuré (déjà fait)
- [ ] `SUPABASE_ANON_KEY` est configuré (déjà fait)
- [ ] `SUPABASE_SERVICE_ROLE_KEY` est configuré (déjà fait)

---

## 📋 Phase 3 : Déploiement Netlify (10 min)

### ☐ Étape 3.1 : Préparer les fichiers
- [ ] Exportez le projet depuis Figma Make
- [ ] Décompressez le fichier ZIP
- [ ] Vérifiez que tous les fichiers sont présents

### ☐ Étape 3.2 : Déployer
**Option A : Drag & Drop (Recommandé)**
```
🔗 https://app.netlify.com/drop
```
- [ ] Créez un compte Netlify (gratuit)
- [ ] Glissez-déposez le dossier du projet
- [ ] Attendez la fin du déploiement (30 sec - 2 min)

**Option B : GitHub**
- [ ] Créez un repo GitHub
- [ ] Uploadez les fichiers
- [ ] Connectez le repo à Netlify
- [ ] Déployez

### ☐ Étape 3.3 : Personnaliser l'URL (Optionnel)
- [ ] Dashboard Netlify → Site settings → Change site name
- [ ] Exemple : `dynasty8-newwave`
- [ ] Votre URL : `https://dynasty8-newwave.netlify.app`

### ☐ Étape 3.4 : Notez votre URL
```
Mon URL Netlify : ________________________________
```

---

## 📋 Phase 4 : Finalisation Discord (5 min)

### ☐ Étape 4.1 : Ajouter l'URL de Redirect
```
🔗 https://discord.com/developers/applications/1459197358347911262/oauth2
```
- [ ] Descendez à la section "Redirects"
- [ ] Cliquez sur "Add Redirect"
- [ ] Collez votre URL Netlify
- [ ] Sauvegardez les changements

### ☐ Étape 4.2 : Vérifier le Webhook
```
🔗 Votre serveur Discord → Salon de notifications
```
- [ ] Le webhook existe dans le bon salon
- [ ] L'URL du webhook est correcte
- [ ] Testez avec un message manuel si besoin

---

## 📋 Phase 5 : Tests (15 min)

### ☐ Test 5.1 : Chargement du site
- [ ] Ouvrez votre URL Netlify
- [ ] Le site s'affiche correctement
- [ ] Le logo Dynasty 8 apparaît
- [ ] La page Hero s'affiche

### ☐ Test 5.2 : Connexion Discord
- [ ] Cliquez sur "Connexion Discord"
- [ ] Vous êtes redirigé vers Discord
- [ ] Autorisez l'application
- [ ] Vous revenez sur le site connecté
- [ ] Votre nom Discord apparaît en haut à droite

### ☐ Test 5.3 : Permissions Admin (si applicable)
- [ ] Le bouton "Admin" apparaît (si vous avez le rôle)
- [ ] Vous pouvez ouvrir le panel admin
- [ ] Les onglets "Propriétés" et "Commandes" sont visibles

### ☐ Test 5.4 : Ajout de propriété (Admin)
- [ ] Panel Admin → "Ajouter une propriété"
- [ ] Remplissez le formulaire
- [ ] La propriété apparaît dans le catalogue
- [ ] Une notification apparaît sur Discord (webhook)

### ☐ Test 5.5 : Catalogue & Filtres
- [ ] Le catalogue affiche les propriétés
- [ ] Les filtres fonctionnent :
  - [ ] Recherche par nom
  - [ ] Filtre par catégorie
  - [ ] Filtre par type (vente/location)
  - [ ] Filtre par prix
- [ ] Cliquer sur une propriété ouvre les détails

### ☐ Test 5.6 : Panier
- [ ] Ajoutez une propriété au panier
- [ ] Le compteur du panier s'incrémente
- [ ] Ouvrez le panier
- [ ] La propriété est affichée
- [ ] Le total est correct

### ☐ Test 5.7 : Commande
- [ ] Remplissez le formulaire :
  - [ ] Nom & Prénom RP
  - [ ] Numéro de téléphone
  - [ ] Message (optionnel)
- [ ] Cliquez sur "Passer la commande"
- [ ] Une confirmation apparaît
- [ ] Le panier est vidé

### ☐ Test 5.8 : Discord Ticket
```
🔗 Votre serveur Discord
```
- [ ] Une notification apparaît dans le webhook
- [ ] Un nouveau salon est créé (format: commande-XXXXXXXX)
- [ ] Le client peut voir le salon
- [ ] Les membres avec le rôle Ticket Staff peuvent voir le salon
- [ ] Le récapitulatif de commande est dans le salon

### ☐ Test 5.9 : Gestion Admin
- [ ] Panel Admin → Onglet "Commandes"
- [ ] La nouvelle commande apparaît
- [ ] Vous pouvez changer le statut
- [ ] Le statut se met à jour

---

## 📋 Phase 6 : Promotion (Optionnel)

### ☐ Étape 6.1 : Annonce sur Discord
- [ ] Créez un salon #dynasty8 ou #immobilier
- [ ] Postez le lien du site
- [ ] Expliquez comment l'utiliser
- [ ] Mentionnez les avantages

### ☐ Étape 6.2 : Formation du Staff
- [ ] Formez l'équipe sur les tickets
- [ ] Expliquez comment changer les statuts
- [ ] Montrez le panel admin

### ☐ Étape 6.3 : Ajout de contenu
- [ ] Ajoutez 5-10 propriétés de démarrage
- [ ] Utilisez de vraies images de qualité
- [ ] Écrivez des descriptions attrayantes

---

## ✅ Récapitulatif Final

### Tout est prêt si :
- ✅ Le site est accessible via l'URL Netlify
- ✅ La connexion Discord fonctionne
- ✅ Les propriétés s'affichent dans le catalogue
- ✅ Les commandes créent des salons Discord
- ✅ Les admins ont accès au panel
- ✅ Les webhooks envoient les notifications

---

## 🎉 Félicitations !

Votre site Dynasty 8 est maintenant **100% opérationnel** !

### 📊 Statistiques de votre installation

| Élément | Statut |
|---------|--------|
| Configuration Discord | ✅ |
| Secrets Supabase | ✅ |
| Déploiement Netlify | ✅ |
| Tests fonctionnels | ✅ |
| Prêt pour production | ✅ |

---

## 🚀 Prochaines Actions

1. **Ajoutez du contenu** : Propriétés, descriptions, images
2. **Promouvez le site** : Annonces Discord, social media
3. **Surveillez** : Logs, commandes, feedback
4. **Optimisez** : Améliorez selon les retours utilisateurs
5. **Support** : Répondez rapidement aux tickets

---

## 📞 Besoin d'aide ?

Si une étape ne fonctionne pas :

1. **Consultez la FAQ** : `FAQ.md`
2. **Guide détaillé** : `GUIDE_INSTALLATION.md`
3. **Setup Discord** : `DISCORD_SETUP.md`
4. **Vérifiez les logs** : Supabase + Console navigateur (F12)

---

## 💡 Conseils de dernière minute

- **Sauvegardez** tous vos tokens et IDs quelque part de sûr
- **Faites des backups** réguliers de votre contenu
- **Surveillez les logs** les premiers jours
- **Testez régulièrement** les nouvelles fonctionnalités
- **Écoutez les retours** de vos utilisateurs

---

**Bon business sur NewWave ! 💼🏠🚀**

---

## 📝 Notes personnelles

Utilisez cet espace pour noter des infos importantes :

```
URL du site : ________________________________________

Date de mise en ligne : ______________________________

Nombre de propriétés : _______________________________

Admins :
- ____________________________________________________
- ____________________________________________________
- ____________________________________________________

Staff Tickets :
- ____________________________________________________
- ____________________________________________________

Remarques :
___________________________________________________________
___________________________________________________________
___________________________________________________________
```
