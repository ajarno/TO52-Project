from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import UserChatViewSet, AdminChatViewSet, CategoryViewSet, \
    AdViewSet, UserProfileViewSet, UserActivationView,\
    CurrentUserProfilView

router = routers.DefaultRouter()

# Link the routes to the different ViewSets
router.register('chats', UserChatViewSet)
router.register('controlchats', AdminChatViewSet)
router.register('categories', CategoryViewSet)
router.register('profiles', UserProfileViewSet)
router.register('classifiedads', AdViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('activate/<str:uid>/<str:token>/', UserActivationView.as_view()),
    path('profile/me/', CurrentUserProfilView.as_view()),
]
