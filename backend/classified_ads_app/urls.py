
from django.contrib import admin
from django.urls import path
from rest_framework import routers
from django.conf.urls import include
from .views import DiscussionViewSet, UserViewSet
from .views import UserProfileListCreateView, userProfileDetailView,RegisterView

router = routers.DefaultRouter()
router.register('discussions',DiscussionViewSet)
router.register('users',UserViewSet)
urlpatterns = [
    path('', include(router.urls)),
    #gets all user profiles and create a new profile
    path("all-profiles",UserProfileListCreateView.as_view(),name="all-profiles"),
    # retrieves profile details of the currently logged in user
    path("profile/<int:pk>",userProfileDetailView.as_view(),name="profile"),
    #register new user
    path('api/register/', RegisterView.as_view(), name='register'),

]
