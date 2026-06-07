# Mise en place complète de la publication des scores

Cette version contient deux pages :

- `index.html` : application privée du maître du jeu ;
- `scores.html` : page publique en lecture seule.

Le maître du jeu reste la seule personne autorisée à publier. Les invités
ouvrent toujours la même adresse et voient les changements en direct.

## 1. Créer le projet Firebase

1. Ouvrir <https://console.firebase.google.com/>.
2. Cliquer sur **Créer un projet**.
3. Choisir un nom, par exemple `olympiades-anniversaire`.
4. Google Analytics n’est pas nécessaire pour cette application.
5. Terminer la création du projet.

L’offre gratuite **Spark** suffit. Aucune carte bancaire n’est nécessaire pour
le fonctionnement prévu ici.

## 2. Enregistrer l’application web

1. Dans la page d’accueil du projet Firebase, cliquer sur l’icône **Web `</>`**.
2. Donner un nom à l’application, par exemple `Scores Olympiades`.
3. Ne pas cocher Firebase Hosting : GitHub Pages assure déjà l’hébergement.
4. Cliquer sur **Enregistrer l’application**.
5. Firebase affiche un bloc `firebaseConfig`.
6. Ouvrir localement `firebase-config.js`.
7. Remplacer chaque valeur `REMPLACEZ_MOI` par la valeur Firebase correspondante.

Exemple :

```js
export const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "olympiades-anniversaire.firebaseapp.com",
  projectId: "olympiades-anniversaire",
  storageBucket: "olympiades-anniversaire.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

export const scoreboardId = "anniversaire-30-ans";
```

La configuration Firebase d’une application web n’est pas un mot de passe.
La protection des écritures est assurée par Firebase Authentication et les
règles Firestore.

## 3. Activer la base Firestore

1. Dans le menu Firebase, ouvrir **Build → Firestore Database**.
2. Cliquer sur **Créer une base de données**.
3. Choisir le mode **Production**.
4. Choisir une région européenne, par exemple `eur3`, si elle est proposée.
5. Valider.

Il n’est pas nécessaire de créer manuellement une collection. La première
publication créera automatiquement :

```text
scoreboards / anniversaire-30-ans
```

## 4. Créer le compte du maître du jeu

1. Ouvrir **Build → Authentication**.
2. Cliquer sur **Commencer**.
3. Dans **Sign-in method**, activer **E-mail/Mot de passe**.
4. Ouvrir ensuite l’onglet **Users**.
5. Cliquer sur **Add user**.
6. Saisir votre adresse e-mail et un mot de passe solide.
7. Après création, copier la valeur **User UID** affichée dans la liste.

Conservez l’e-mail et le mot de passe : ils seront saisis uniquement dans
l’application du maître du jeu.

## 5. Installer les règles de sécurité

1. Ouvrir **Firestore Database → Rules**.
2. Ouvrir le fichier local `firestore.rules`.
3. Remplacer `VOTRE_UID_FIREBASE` par le User UID copié précédemment.
4. Copier tout le contenu du fichier dans l’éditeur Firebase.
5. Cliquer sur **Publish**.

Exemple :

```text
request.auth.uid == "abc123VotreUidFirebase"
```

Ces règles permettent :

- à tout le monde de lire le classement public ;
- uniquement au compte du maître du jeu de créer ou modifier les scores ;
- à personne de supprimer le classement depuis le navigateur ;
- aucun accès aux autres collections.

## 6. Autoriser le domaine GitHub Pages

1. Ouvrir **Authentication → Settings**.
2. Trouver **Authorized domains**.
3. Ajouter le domaine GitHub Pages sans `https://` ni chemin :

```text
votre-identifiant.github.io
```

`localhost` peut rester présent pour les essais locaux.

## 7. Publier APP V3 sur GitHub

Envoyer tous les fichiers et le dossier `icons` de `APP V3` à la racine du
dépôt GitHub Pages. Les fichiers indispensables sont :

```text
index.html
app.js
styles.css
sw.js
manifest.webmanifest
firebase-config.js
firebase-sync.js
scores.html
scores.js
public.css
icons/
```

Le fichier `GUIDE_FIREBASE.md` peut aussi être publié. Le fichier
`firestore.rules` sert seulement à configurer Firebase et n’est pas utilisé par
la page web.

Après le commit, attendre deux à cinq minutes.

## 8. Première publication

1. Ouvrir l’application maître sur l’iPhone.
2. Aller dans **Réglages**.
3. Vérifier que la version affichée est **v6.0**.
4. Dans **Publication des scores**, saisir l’e-mail et le mot de passe Firebase.
5. Toucher **Se connecter**.
6. Toucher **Publier les scores maintenant**.
7. Vérifier que le message indique l’heure de publication.

La connexion du maître est conservée par Firebase sur l’appareil. Il ne devrait
donc pas être nécessaire de ressaisir le mot de passe à chaque publication.

## 9. Partager la page publique

Le lien public est l’adresse GitHub Pages suivie de `/scores.html`.

```text
https://votre-identifiant.github.io/nom-du-depot/scores.html
```

Ce lien peut être envoyé par WhatsApp ou transformé en QR code. Les invités
n’ont rien à installer et ne peuvent pas modifier les résultats.

La page publique reste ouverte et se met à jour automatiquement après chaque
publication.

## 10. Utilisation pendant l’événement

À la fin de chaque jeu :

1. Saisir les résultats dans l’application maître.
2. Vérifier le classement.
3. Aller dans **Réglages**.
4. Toucher **Publier les scores maintenant**.

La page publique est mise à jour presque immédiatement.

En cas de coupure Internet, les scores restent enregistrés localement dans
l’application maître. Il suffit de publier lorsque la connexion revient.

## 11. Vérifications en cas de problème

### « Firebase n’est pas encore configuré »

Vérifier que `firebase-config.js` ne contient plus `REMPLACEZ_MOI`, puis
republier ce fichier sur GitHub.

### « E-mail ou mot de passe incorrect »

Vérifier le compte dans **Firebase Authentication → Users**.

### « Publication refusée par les règles Firebase »

Vérifier que le UID présent dans `firestore.rules` correspond exactement au UID
du compte connecté, puis republier les règles.

### La page publique indique « En attente des scores »

Effectuer au moins une publication depuis l’application maître et vérifier que
le `scoreboardId` est identique dans les deux pages, via `firebase-config.js`.

### La mise à jour GitHub n’apparaît pas sur l’iPhone

Ouvrir directement le lien GitHub Pages dans Safari avec `?v=6`, puis utiliser
**Réglages → Vérifier les mises à jour**.
