 README – HR: Human-Reach

 ## 1. Choix du Framework

Le projet utilise **React.js** pour la partie frontend et **Node.js + Express.js** pour la partie backend.

 Pourquoi ce choix ?

**React.js**
- Rapide et performant grâce au Virtual DOM  
- Composants réutilisables → facilite la maintenance  
- Gestion intuitive des états (Hooks, Context)  
- Idéal pour développer des interfaces modernes, fluides et dynamiques  

**Node.js + Express.js**
-  Performances élevées pour les API REST  
-  Architecture simple et extensible  
-  Gestion facile de l’authentification JWT  
-  Large écosystème npm pour ajouter rapidement des fonctionnalités  

Ce stack **MERN (MongoDB + Express + React + Node)** permet une plateforme RH complète, scalable et moderne.



## 2. Fonctionnalités Développées

### Authentification & Sécurité
- Connexion/Login sécurisé via email + mot de passe  
- Auth JWT (JSON Web Token) pour sécuriser toutes les routes protégées  
- Réinitialisation du mot de passe :  
  - L’utilisateur saisit son email  
  - Un code unique est envoyé par email  
  - Il peut créer un nouveau mot de passe  
- Déconnexion  
- Protection des pages privées via middleware  

## Gestion des employés
- ➕ Ajouter un employé  
- 🗑️ Supprimer un employé  
- ✏️ Modifier les informations d’un employé  
- 📄 Afficher la liste complète des employés  
- 👤 Accéder au profil détaillé d’un employé  

**Champs gérés :** Nom, Email, Poste, Département, Autres champs personnalisés  

### Performances & Évaluations
- Affichage des performances d’un employé  
- Objectifs, Score d’évaluation, Commentaires, Historique des évaluations  
- Mise à jour des performances (score, commentaire, objectifs)  
- Suppression d’une évaluation  
- Ajout d’une nouvelle évaluation  

### Envoi d’email (Nodemailer)
- Envoi du code de réinitialisation du mot de passe  
- Messagerie sécurisée (SMTP)  
- Gestion des erreurs : mauvais email, serveur SMTP indisponible…  

---

##  3. Architecture du Projet

```
gestion_rh/
│
├── client/                     # Front-end (React + Vite)
│   |
│   ├── src/
│   │   |
│   │   ├── components/         # Composants réutilisables (UI)
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Card.jsx
│   │   │
│   │   ├── pages/              # Pages principales
│   │   │   ├── Login.jsx
│   │   │   ├── Employees.jsx
│   │   │   ├── AddEmployee.jsx
│   │   │   └── Performances    #dossier qui contient les fichiers .jsx relatifs  au performances
│   │   │
│   │   ├── api/                # Appels API centralisés
│   │   │   ├── userApi.js
│   │   │   ├── employeesApi.js
│   │   │   ├── performanceApi.js
│   │   │
│   │   ├── context/            # Gestion d'états globaux
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── router/             # Configuration des routes (React Router)
│   │   │   └── AppRouter.jsx
│   │   │
│   │   ├── index.css
│   │   ├── App.css            # Styles globaux / configuration Tailwind
│   │   ├──App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
│
├── server/                      # Back-end (Node + Express)
│   ├── config/
│   │   ├── db.js               # Connexion MongoDB
│   │   ├── nodemailer.js       # Service d’envoi d’e-mails
│   │   └── env.js              # Variables d’environnement
│   │
│   ├── controllers/            # Logique métier
│   │   ├── userController.js
│   │   ├── employeeController.js
│   │   ├── performanceController.js
│   │
│   ├── middlewares/
│   │   ├── errorMiddleware.js
│   │   └── (authMiddleware.js) # utilisé uniquement si l’auth est réactivée
│   │
│   ├── models/                 # Schémas de la base MongoDB
│   │   ├── userModel.js
│   │   ├── employeeModel.js
│   │   ├── performanceModel.js
│   │
│   ├── routes/                 # Endpoints de l’API
│   │   ├── userRoutes.js
│   │   ├── employeeRoutes.js
│   │   ├── performanceRoutes.js
│   │
│   ├── utils/                  # Fonctions utilitaires
│   │   ├── emailTemplates.js
│   │   └── helpers.js
│   │
│   ├── populate.js
│   ├── populateData.js             # Script de remplissage initial de la BD
│   ├── server.js               # Point d’entrée du serveur Node
│   └── package.json
│
├── .env                         # Variables d’environnement globales
└── package.json                 # Gestion du projet global

---

##  4. Étapes de Lancement du Projet

###  1. Cloner le projet
```bash
git clone <URL_DU_PROJET>
cd projet-RH
```

###  2. Installer les dépendances
**Backend :**
```bash
cd server
npm install
```

**Frontend :**
```bash
cd ../client
npm install
```

###  3. Configurer les variables d’environnement
Créer un fichier `.env` dans `/server` :

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
CLIENT_URL=http://localhost:3001
```

###  4. Lancer le backend
```bash
cd server
npm run dev
```

###  5. Lancer le frontend
```bash
cd client
npm run dev
```

👉 L’application sera disponible sur : **http://localhost:5173**

---

## 📌 5. Technologies Utilisées

| Domaine        | Technologie                  |
|----------------|------------------------------|
| Frontend       | React.js, Axios, React Router |
| Backend        | Node.js, Express.js          |
| Base de données| MongoDB + Mongoose           |
| Sécurité       | JWT, bcrypt                  |
| Mail           | Nodemailer                   |
| UI             | Tailwind CSS / CSS perso     |
| State Mgmt     | useContext / useState        |

---

##  6. Conclusion

Ce projet fournit une **plateforme RH complète** permettant de gérer :  
- l’authentification  
- les employés  
- les performances  
- les évaluations  
- les réinitialisations de mots de passe  
- l’envoi d’emails  

---
```  

Veux-tu que je t’ajoute aussi une **section “Roadmap”** avec les prochaines fonctionnalités possibles (par exemple gestion des congés, reporting RH, notifications en temps réel) ?
