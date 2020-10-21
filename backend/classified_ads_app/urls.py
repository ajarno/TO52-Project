from django.contrib import admin
from django.urls import path
from rest_framework import routers
from django.conf.urls import include
from .views import UserChatViewSet,AdminChatViewSet
from .views import UserProfileListCreateView, userProfileDetailView
from .views import CategoryViewSet, AdViewSet, SubCategoryViewSet

router = routers.DefaultRouter()

# Link the routes to the different ViewSets
router.register('chats',UserChatViewSet)
router.register('controlchats',AdminChatViewSet)
router.register('categories', CategoryViewSet)
router.register('subcategories', SubCategoryViewSet)
router.register('ads', AdViewSet)

urlpatterns = [
    path('', include(router.urls)),
    #gets all user profiles and create a new profile
    path("all-profiles",UserProfileListCreateView.as_view(),name="all-profiles"),
    # retrieves profile details of the currently logged in user
    path("profile/<int:pk>",userProfileDetailView.as_view(),name="profile"),
   
]
