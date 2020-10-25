from django.conf.urls import include
from django.urls import path
from rest_framework import routers
from .views import (
 UserChatViewSet,AdminChatViewSet ,
 UserProfileListCreateView,
 UserProfileDetailView, CategoryViewSet,
 AdViewSet, SubCategoryViewSet
 )

router = routers.DefaultRouter()

# Link the routes to the different ViewSets
router.register('chats',UserChatViewSet)
router.register('controlchats',AdminChatViewSet)
router.register('categories', CategoryViewSet)
router.register('subcategories', SubCategoryViewSet)
router.register('ads', AdViewSet)

urlpatterns = [
    path('', include(router.urls)),
    #Gets all user profiles and create a new profile
    path('profiles',UserProfileListCreateView.as_view(),name="profiles"),
    #Retrieves profile details of the currently logged in user
    path('profile/<int:pk>',UserProfileDetailView.as_view(),name="profile"),
]
