from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import UserChatViewSet, CategoryViewSet, \
    AdViewSet, LocationViewSet, PicturesViewSet, UserProfileViewSet, \
    UserActivationView, ChatFromContactByAd, CurrentUserProfilView, ResetPasswordConfirmationView


router = routers.DefaultRouter()

# Link the routes to the different ViewSets
router.register('chats', UserChatViewSet)
router.register('categories', CategoryViewSet)
router.register('profiles', UserProfileViewSet)
router.register('classifiedads', AdViewSet)
router.register('locations', LocationViewSet)
router.register('pictures', PicturesViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('activate/<str:uid>/<str:token>/', UserActivationView.as_view()),
    path('profile/me/', CurrentUserProfilView.as_view()),
    path('chats/fromContactByAd/<int:contact_id>/<int:ad_id>',
         ChatFromContactByAd.as_view()),
    path('password/reset/confirm/<str:uid>/<str:token>/',
         ResetPasswordConfirmationView.as_view()),
]
