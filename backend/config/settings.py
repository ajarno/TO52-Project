# Django settings for config project.

# Generated by 'django-admin startproject' using Django 3.1.1.

# For more information on this file, see
# https://docs.djangoproject.com/en/3.1/topics/settings/

# For the full list of settings and their values, see
# https://docs.djangoproject.com/en/3.1/ref/settings/


from pathlib import Path
from datetime import timedelta
import os
from decouple import config
from dj_database_url import parse as dburl

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

SECRET_KEY = config('SECRET_KEY')
DEBUG = config('DEBUG')

ALLOWED_HOSTS = ['ut-annonces.herokuapp.com']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',
    'djoser',
    'phonenumber_field',
    'django_email_verification',
    'corsheaders',
    'classified_ads_app',
    'django_filters',
    'django_countries',  # documentation : https://pypi.org/project/django-countries/
]

AUTH_USER_MODEL = 'classified_ads_app.User'
AUTH_PROFILE_MODULE = 'classified_ads_app.UserProfile'


MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:3000'
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        # 'DIRS': [],
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


WSGI_APPLICATION = 'config.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

default_dburl = 'sqlite:///' + os.path.join(BASE_DIR, 'db.slite3')
DATABASES = {
    'default': config('DATABASE_URL', default=default_dburl, cast=dburl)
}

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        # 'rest_framework.permissions.IsAdminUser',
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),

}

SIMPLE_JWT = {
    'AUTH_HEADER_TYPES': ('JWT'),
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60)
}

# restrict users list acces to only admin
DJOSER = {
    'PERMISSIONS': {
        'user_list': ['rest_framework.permissions.IsAdminUser'],

    },
    'LOGOUT_ON_PASSWORD_CHANGE': True,
    'PASSWORD_CHANGED_EMAIL_CONFIRMATION': True,
    'PASSWORD_RESET_CONFIRM_URL': 'api/password/reset/confirm/{uid}/{token}',
    'USERNAME_RESET_CONFIRM_URL': '/username/reset/confirm/{uid}/{token}',
    'ACTIVATION_URL': 'api/activate/{uid}/{token}',
    'SEND_ACTIVATION_EMAIL': True,
    'EMAIL': {
        'activation': 'classified_ads_app.email.ActivationEmail',
        'password_reset': 'classified_ads_app.email.PasswordResetEmail',
        'password_changed_confirmation': 'classified_ads_app.email.PasswordChangedConfirmationEmail',
    }
}

# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATIC_URL = '/static/'
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# email verification settings
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
# EMAIL_HOST_USER = 'utanonces@noreply.fr'
EMAIL_HOST_USER = 'anaisgedeonto52@gmail.com'
EMAIL_HOST_PASSWORD = 'tzrupgsttjlapdbr'
# mYC00lP4ssw0rd# os.environ['password_key'] suggested
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_PAGE_DOMAIN = 'http://localhost:5000/'
