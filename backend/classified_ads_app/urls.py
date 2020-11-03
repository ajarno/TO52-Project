from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import UserChatViewSet, AdminChatViewSet, UserProfileListCreateView, UserProfileDetailView, CategoryViewSet, \
    AdViewSet

router = routers.DefaultRouter()

# Link the routes to the different ViewSets
router.register('chats', UserChatViewSet)
router.register('controlchats', AdminChatViewSet)
router.register('categories', CategoryViewSet)
router.register('ads', AdViewSet)

urlpatterns = [
    path('', include(router.urls)),
    # gets all user profiles and create a new profile
    path("all-profiles", UserProfileListCreateView.as_view(), name="all-profiles"),
    # retrieves profile details of the currently logged in user
    path("profile/<int:pk>", UserProfileDetailView.as_view(), name="profile"),
]
