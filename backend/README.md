# TO52 Project : UT'annonces Backend
_Back-end de l'application UT'annonces_

1. [**Développement**](#développement)
    - [Outils et environnement de développement](#outils-et-environnement-de-développement)
    - [Récupérer l'application](#récupérer-lapplication)
    - [Lancement en local](#lancement-en-local)
1. [**Déploiement**](#déploiement)
1. [**Ressources et tutos**](#ressources-et-tutos)

## Développement

### Outils et environnement de développement

Cette application requiert l'installation de plusieurs outils pour fonctionner en local :
* **Git** (version >= 2.24.0) :rotating_light: *choisir **Git & Unix tools from command prompt** sur la page d'ajustement des variables d'environnement lors de l'installation*
* **Python** (version >= 3)

Par convention, nous développons sous **PyCharm**, libre à vous de choisir votre IDE, mais pensez bien à ajouter les fichiers relatifs à celui-ci au fichier *.gitignore*.

### Récupérer l'application

Après le clone, suivez les étapes suivantes :
| Etape | Commande |
| --- | --- |
| 1. Placez vous dans le dossier backend | `cd TO52-Project/backend` |
| 2. Créez un environnement python | `python -m venv NOM_ENV` |
| 3. Activez-le | `venv\Scripts\activate` ou `source ./venv/Scripts/activate` |
| 4. Installer les dépendances du projet | `pip install -r requirements.txt` |

Les outils et dépendances étant installés, le lancement de l'application est maintenant possible.

### Lancement en local

Pour lancer une version de développement du site en local, exécuter `python manage.py runserver`. 
L'application se lancera à l'adresse [http://localhost:8000](http://localhost:8000) dans le navigateur. Ne pas hésiter à relancer l'application selon les modifications.

Lire le fichier [**python-guidelines.md](./python-guidelines.md) pour plus d'indications.

## Déploiement

[En apprendre plus sur le déploiement](#)

## Ressources et tutos

- Django, _pour en apprendre plus sur le fonctionnement et la façon de coder en django_
    - [Django documentation](https://www.djangoproject.com/)
- Tutorial, _pour apprendre à coder un backend Djangp et le déployer_
    - [Udemy React-Django Full Stack](https://www.udemy.com/course/react-django-full-stack/)
