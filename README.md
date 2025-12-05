# Nuit de l'info - Equipe En prod (demain(peut-être(pas)))

## 👥 Membres du groupe
- DELENGAIGNE Arthur
- PRISSET Baptiste
- TAKAHASHI Ethan
- DE BRUYN Séraphim
- LAMOITY Lilian

---

## 📦 Dépôt Git
👉 [Lien vers le dépôt Github](https://github.com/Tarcyssus/NDI-en-prod)

---

## Licence

Ce projet est distribué sous licence **AGPL-3.0**.  
Voir le fichier [LICENSE](./LICENSE) pour plus d’informations.

---

## 🚀 Lancement du projet

### 1️⃣ Prérequis
Assurez-vous d’avoir installé :
- [Docker](https://docs.docker.com/get-docker/)

### 2️⃣ Cloner le dépôt
```bash
git clone https://github.com/Tarcyssus/NDI-en-prod.git
cd NDI-en-prod
git checkout Front
```

### 3️⃣​ Lancer le projet
- Lancer Docker
- Démarrer le conteneur du projet :

#### prod

`docker compose up prod --build`

- http://localhost:3000/

#### dev (with hot relord)

`docker compose up dev -d --build`

- http://localhost:5173

### 4️⃣ Accès à l'application
- URL : [`https://ndi-en-prod-frontend.labs.iut-larochelle.fr/`](https://ndi-en-prod-frontend.labs.iut-larochelle.fr/)


