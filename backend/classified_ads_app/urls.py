from django.urls import path, include
from rest_framework import routers

from .views import CategoryViewSet, AdViewSet

router = routers.DefaultRouter()
router.register('categories', CategoryViewSet)
router.register('ads', AdViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
