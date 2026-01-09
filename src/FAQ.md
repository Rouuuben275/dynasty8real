# ❓ FAQ - Questions Fréquentes

## 🔐 Authentification & Connexion

### Q : Pourquoi la connexion Discord ne fonctionne pas ?

**R :** Plusieurs raisons possibles :

1. **L'URL de redirect n'est pas configurée**
   - Allez sur Discord Developer Portal
   - Ajoutez votre URL Netlify dans les Redirects
   
2. **Le Client Secret est incorrect**
   - Vérifiez dans les secrets Supabase
   - Régénérez-le si nécessaire

3. **Cache du navigateur**
   - Essayez en navigation privée
   - Videz le cache (Ctrl+Shift+Delete)

### Q : Je suis connecté mais je ne vois pas le bouton Admin ?

**R :** Le bouton Admin n'apparaît que si vous avez le rôle Discord avec l'ID `1459196167991595008`.

**Vérifiez :**
1. Vous avez bien ce rôle sur le serveur Discord
2. Déconnectez-vous et reconnectez-vous au site
3. Le rôle doit être attribué AVANT de vous connecter au site

### Q : Comment me déconnecter ?

**R :** Cliquez sur le bouton "Déconnexion" en haut à droite dans la navbar.

---

## 🏠 Propriétés & Catalogue

### Q : Comment ajouter une propriété ?

**R :** Vous devez avoir le rôle Admin :

1. Connectez-vous au site
2. Cliquez sur "Admin" dans la navbar
3. Cliquez sur "Ajouter une propriété"
4. Remplissez le formulaire
5. Les champs supplémentaires apparaissent selon la catégorie

### Q : Les images ne s'affichent pas

**R :** Assurez-vous que :
- L'URL de l'image est valide
- L'image est accessible publiquement
- Utilisez des services comme Imgur, Unsplash, ou des CDN d'images

**Format accepté :**
```
https://images.unsplash.com/photo-xxx.jpg
https://i.imgur.com/xxx.png
```

### Q : Comment supprimer une propriété ?

**R :** 
1. Panel Admin → Onglet "Propriétés"
2. Cliquez sur l'icône poubelle rouge
3. La propriété est supprimée immédiatement

### Q : Peut-on modifier une propriété existante ?

**R :** Actuellement, il faut supprimer et recréer. La fonction d'édition peut être ajoutée si besoin.

### Q : Comment créer une nouvelle catégorie ?

**R :**
1. Panel Admin → "Ajouter une propriété"
2. Cliquez sur le bouton "+" à côté du menu Catégorie
3. Entrez le nom de la nouvelle catégorie
4. Elle sera disponible pour toutes les futures propriétés

---

## 🛒 Panier & Commandes

### Q : Je ne peux pas ajouter au panier

**R :** Vous devez être connecté avec Discord pour utiliser le panier.

### Q : Combien de propriétés peut-on mettre dans le panier ?

**R :** Illimité ! Vous pouvez ajouter autant de propriétés que vous voulez.

### Q : Comment passer une commande ?

**R :**
1. Ajoutez des propriétés au panier
2. Cliquez sur l'icône panier en haut à droite
3. Remplissez le formulaire :
   - Nom & Prénom RP (roleplay)
   - Numéro de téléphone en jeu
   - Message optionnel
4. Cliquez sur "Passer la commande"

### Q : Que se passe-t-il après une commande ?

**R :** Trois choses :

1. **Notification webhook** : Le staff reçoit une notification Discord
2. **Salon créé** : Un salon privé est automatiquement créé
3. **Confirmation** : Vous recevez une confirmation sur le site

### Q : Je ne vois pas mon salon de ticket Discord

**R :** Vérifiez que :
- Vous êtes bien sur le serveur Discord Dynasty 8 / NewWave
- Le bot a bien créé le salon (vérifiez les logs)
- Vous avez les permissions de voir les salons

---

## 🎫 Système de Tickets Discord

### Q : Les salons de tickets ne se créent pas

**R :** Vérifications à faire :

1. **Bot Token configuré** dans Supabase
2. **Bot sur le serveur** avec les bonnes permissions
3. **Rôle du bot** au-dessus des autres rôles
4. **Permissions du bot** : "Gérer les salons"

### Q : Le client ne peut pas voir son ticket

**R :** 
- Le client doit être sur le serveur Discord
- Le bot doit avoir les permissions de gérer les rôles
- Vérifiez les logs Supabase pour voir les erreurs

### Q : Qui peut voir les salons de tickets ?

**R :** Seulement :
- Le client qui a passé la commande (via son User ID)
- Les membres avec le rôle Ticket Staff (ID: 1459196844432294066)
- Les admins du serveur Discord

### Q : Comment fermer un ticket ?

**R :** Manuellement dans Discord :
- Archivez le salon
- Ou supprimez-le
- Ou changez les permissions

### Q : Les notifications ne s'envoient pas

**R :** Vérifiez :
- L'URL du webhook est correcte
- Le webhook n'a pas été supprimé
- Le salon du webhook existe toujours

---

## 🔧 Problèmes Techniques

### Q : Le site ne se charge pas

**R :**
- Vérifiez que le déploiement Netlify est terminé
- Attendez 1-2 minutes après le déploiement
- Videz le cache du navigateur (Ctrl+F5)
- Essayez en navigation privée

### Q : J'ai une erreur 500

**R :** Erreur serveur :
- Vérifiez les logs dans Supabase Edge Functions
- Vérifiez que tous les secrets sont configurés
- Contactez le support si le problème persiste

### Q : Le catalogue est vide

**R :**
- C'est normal si aucune propriété n'a été ajoutée
- Un admin doit ajouter des propriétés via le panel
- Vérifiez la connexion à Supabase

### Q : Les filtres ne fonctionnent pas

**R :**
- Rafraîchissez la page
- Vérifiez la console du navigateur (F12)
- Essayez de réinitialiser les filtres

---

## 💼 Administration

### Q : Comment voir toutes les commandes ?

**R :** 
1. Panel Admin → Onglet "Commandes"
2. Vous verrez toutes les commandes avec détails
3. Vous pouvez changer les statuts

### Q : Les statuts de commande disponibles

**R :** 
- **En attente** (pending) : Nouvelle commande
- **En cours** (processing) : Commande en traitement
- **Terminée** (completed) : Transaction finalisée
- **Annulée** (cancelled) : Commande annulée

### Q : Comment donner les permissions admin à quelqu'un ?

**R :**
1. Dans Discord → Paramètres du serveur → Rôles
2. Trouvez le rôle avec l'ID `1459196167991595008`
3. Clic droit sur le membre → Attribuer le rôle

### Q : Combien d'admins peut-on avoir ?

**R :** Illimité ! Tous les membres avec le rôle Admin auront accès au panel.

---

## 🌐 Hébergement & Domaine

### Q : Le site est-il vraiment gratuit ?

**R :** Oui ! 
- Netlify offre un hébergement gratuit
- Supabase offre un plan gratuit généreux
- Pas de limite de temps

### Q : Peut-on utiliser un domaine personnalisé ?

**R :** Oui !
1. Achetez un domaine (ex: dynasty8.gg)
2. Dans Netlify : "Domain settings" → "Add custom domain"
3. Configurez les DNS selon les instructions

### Q : Le site peut-il tomber en panne ?

**R :** Très rare, mais possible :
- Netlify a 99.9% d'uptime
- Supabase est très fiable
- Si panne, elle est généralement résolue rapidement

### Q : Combien de visiteurs le site peut-il gérer ?

**R :** Beaucoup !
- Le plan gratuit Netlify supporte des milliers de visiteurs/mois
- Supabase peut gérer des centaines de requêtes simultanées

---

## 📱 Mobile & Compatibilité

### Q : Le site fonctionne-t-il sur mobile ?

**R :** Oui ! Le design est 100% responsive :
- Smartphones
- Tablettes
- Desktop

### Q : Quels navigateurs sont supportés ?

**R :**
- ✅ Chrome / Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ Internet Explorer NON supporté

---

## 🔒 Sécurité & Confidentialité

### Q : Les données sont-elles sécurisées ?

**R :** Oui :
- Connexion HTTPS automatique (Netlify)
- Secrets stockés de manière sécurisée (Supabase)
- OAuth Discord sécurisé

### Q : Qui peut voir mes informations ?

**R :**
- Les admins peuvent voir toutes les commandes
- Le staff avec rôle Ticket peut voir les tickets
- Vos infos Discord restent privées (sauf username)

### Q : Peut-on supprimer ses données ?

**R :** Oui, contactez un admin pour :
- Supprimer votre commande
- Retirer vos informations

---

## 🎨 Personnalisation

### Q : Peut-on changer les couleurs du site ?

**R :** Oui, mais nécessite de modifier le code :
- Fichier `/styles/globals.css`
- Changez les couleurs dans `:root`

### Q : Peut-on ajouter un logo ?

**R :** Oui, modifiez le composant `Navbar.tsx` :
- Remplacez l'icône Building2 par votre logo
- Ou ajoutez une image

### Q : Peut-on modifier les catégories par défaut ?

**R :** Oui, dans le serveur backend :
- Fichier `/supabase/functions/server/index.tsx`
- Trouvez `defaultCategories`

---

## 🚀 Performance

### Q : Le site est lent

**R :** Optimisations possibles :
- Utilisez des images optimisées (pas trop lourdes)
- Évitez de mettre 50 propriétés en même temps
- Videz le cache navigateur

### Q : Les images mettent du temps à charger

**R :**
- Utilisez des URLs d'images optimisées
- Unsplash et Imgur sont généralement rapides
- Évitez les images > 2MB

---

## 📞 Support

### Q : Où trouver plus d'aide ?

**R :** Documentation disponible :
- `GUIDE_INSTALLATION.md` : Setup complet
- `DISCORD_SETUP.md` : Configuration Discord
- `EXPORT_NETLIFY.md` : Déploiement
- `README.md` : Vue d'ensemble

### Q : Comment signaler un bug ?

**R :**
1. Notez l'erreur exacte
2. Vérifiez les logs (F12 → Console)
3. Vérifiez les logs Supabase
4. Contactez l'équipe technique

---

## 🎯 Astuces Pro

### Q : Comment rendre le site plus pro ?

**R :**
1. **Ajoutez de vraies photos** de qualité
2. **Écrivez des descriptions** détaillées
3. **Utilisez un domaine** personnalisé
4. **Formez votre staff** sur les tickets
5. **Répondez vite** aux commandes

### Q : Comment augmenter les ventes ?

**R :**
1. **Promouvez** le site sur Discord
2. **Offrez des réductions** pour premières commandes
3. **Ajoutez régulièrement** de nouvelles propriétés
4. **Service client** réactif via les tickets
5. **Visuels attractifs** pour les propriétés

---

**Vous ne trouvez pas votre réponse ?**

Consultez les autres fichiers de documentation ou vérifiez les logs ! 🚀
