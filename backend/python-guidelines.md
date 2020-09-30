# Mise en place de l'environnement de développement du backend (Python et Django)

## Etape 1 : Installer Python 3

## Etape 2 : L'environnement

### Commandes de bases

|  Descriptif | Commande  |
| ------------ | ------------ |
|  Créer un environnement virtuel | `python -m venv NOM_ENV` |
|  Lancer un environnement spécifique | `venv\Scripts\activate` ou `source ./venv/Scripts/activate` |
| Désactiver l'environnement courant | `deactivate` |
| Supprimer un environnement  | `rm -rf NOM_ENV` |

### Gestion des dépendances

|  Descriptif | Commande  |
| ------------ | ------------ |
| Sauvegarder les dépendances | `pip freeze > requirements.txt` |
| Réinstaller les dépendances du projet | `pip install -r requirements.txt` |

## Etape 3 : Débuter Django

_Dans l'environnement créé..._

|  Descriptif | Commande  |
| ------------ | ------------ |
| Installer Django | `pip install Django` |
| Créer un projet | `django-admin startproject PROJECT_NAME  .` |
| Lancer le projet | `python manage.py runserver` |
| Créer une application | `django-admin startapp APP_NAME` | 