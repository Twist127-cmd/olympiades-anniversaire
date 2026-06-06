# Olympiades Anniversaire

Application web mobile de suivi des scores des 11 épreuves.

## Utilisation

1. Ouvrir l’application dans Safari sur iPhone.
2. Toucher **Partager**, puis **Sur l’écran d’accueil**.
3. Saisir les résultats depuis l’onglet **Épreuves**.
4. Consulter ou capturer le classement depuis l’onglet **Classement**.

L’onglet **Équipes** permet d’ajouter ou supprimer des équipes, de modifier
leurs noms et de choisir leurs couleurs. Deux à dix équipes peuvent participer.

## Gestion des épreuves

Dans l’onglet **Épreuves**, chaque jeu peut être activé ou désactivé avec son
interrupteur. Une épreuve désactivée conserve ses saisies, mais ne compte plus
dans le classement ni dans la courbe de progression.

Le bouton **Créer une nouvelle épreuve** ouvre un assistant proposant quatre
modèles :

- classement avec barème par position ;
- estimation au plus proche avec bonus exact ;
- quiz avec points par bonne réponse ;
- points libres saisis directement par équipe.

Les épreuves personnalisées peuvent ensuite être réorganisées, désactivées ou
supprimées comme les autres.

Chaque fiche d’épreuve affiche désormais deux encadrés avant la saisie :
**Comment jouer ?** pour le déroulement et **Comptabilisation des points** pour
le barème. Ces deux informations sont également demandées lors de la création
d’une nouvelle épreuve.

Les données sont sauvegardées automatiquement sur l’appareil. L’onglet
**Réglages** permet aussi d’exporter une sauvegarde JSON dans Fichiers ou iCloud.

## Mise en ligne gratuite

Le dossier peut être publié tel quel sur GitHub Pages. Aucun serveur, compte
utilisateur ou base de données n’est nécessaire.

Pour tester sur un ordinateur, servir le dossier avec un serveur HTTP local,
par exemple :

```powershell
python -m http.server 4173
```

Puis ouvrir `http://127.0.0.1:4173`.
