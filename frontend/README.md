# TO52 Project : UT'annonces Frontend
_Front-end de l'application UT'annonces_

1. [**Développement**](#développement)
    - [Outils et environnement de développement](#outils-et-environnement-de-développement)
    - [Récupérer l'application](#récupérer-lapplication)
    - [Lancement en local](#lancement-en-local)
    - [Ajouter une page](#ajouter-une-page)
    - [Ajouter un composant](#ajouter-une-composantfonction)
1. [**Test**](#test)
1. [**Déploiement**](#déploiement)
1. [**Ressources et tutos**](#ressources-et-tutos)

## Développement

### Outils et environnement de développement

Cette application requiert l'installation de plusieurs outils pour fonctionner en local :
* **Git** (version >= 2.24.0) :rotating_light: *choisir **Git & Unix tools from command prompt** sur la page d'ajustement des variables d'environnement lors de l'installation*
* **Node.js** (version >= 12)
* **NPM** (version >= 6.14)

Par convention, nous développons sous **VSCode**, avec plusieurs ***extensions*** :
- ***Prettier*** pour formater le code suivant une méthodologie propre et précise
- ***ESLint*** pour linter notre code javascript
- ***GitLens*** qui peut s'avérer utile pour savoir quand le code a été créé/modifié, pour quelles raisons...

### Récupérer l'application

Après le clone, installer les *modules* :
```bash
cd TO52-Project/frontend
npm install
```
En cas de problème lors du `npm install`, supprimez le dossier node_modules et le fichier package-lock.json, puis relancez `npm install`

Les outils et dépendances étant installés, le lancement de l'application est maintenant possible.


### Lancement en local

Pour lancer une version de développement du site en local, exécuter `npm run start`. 
L'application se lancera à l'adresse [http://localhost:3000](http://localhost:3000) dans le navigateur. La page se rechargera s'il y a des modifications.
> Cette commande lance `react-scripts start` défini d'après le **package.json**, qui nous permet de servir notre application à des fins de développement.


Pour génerer une version de mise en production, executer `npm run build`
> Cette commande va génerer les sources minifiées et _uglyfiées_ de l'application dans le dossier **dist**, ce qui permet d'obtenir les meilleures performances et les plus petites tailles de bundle. L'application est alors prête à être déployée.

### Ajouter une page


### Ajouter un·e composant/fonction

Pour tout·e composant/fonction réutilisable, le créer dans _src/shared/components/_ ou _src/shared/functions_, réaliser l'export, puis l'importer dans le fichier où l'on veut l'utiliser. Une fois importé, il peut être librement utilisé dans le fichier.

## Test

Pour tester l'application, lancez `npm test`.
> Launches the test runner in the interactive watch mode.<br /> See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Déploiement

[En apprendre plus sur le déploiement](https://facebook.github.io/create-react-app/docs/deployment)

## Ressources et tutos

- React, _pour en apprendre plus sur le fonctionnement et la façon de coder en react_
    - [React documentation](https://fr.reactjs.org/)
    - [React App](https://create-react-app.dev/)
    - [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
    - [Code Splitting](https://facebook.github.io/create-react-app/docs/code-splitting)
    - [Making a Progressive Web App](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)
    - [Analysing the Bundle Size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)
    - [Advanced configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)
- Material, _pour les composants et la mise en page_
    - [Material UI](https://material-ui.com/)
- Tutorial, _pour apprendre à coder un frontend React et le déployer_
    - [Udemy React-Django Full Stack](https://www.udemy.com/course/react-django-full-stack/)
- Troubleshooting
    - [`npm run build` fails to minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
