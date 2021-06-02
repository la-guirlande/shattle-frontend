# Shattle - Frontend

Shattle est un jeu-vidéo développé en PWA (React).


## Installer les dépendances
```
npm install
```

### Compiler et hot-reload pour développer
```
npm run serve
```

### Compiler et compresser pour la production
```
npm run build
```

## Gestion du cache

Dans un premier temps, l'access token sera stocké dans le local storage, puis, les données du jeu (maps, parties en cours) seront stockées via IndexedDB.
