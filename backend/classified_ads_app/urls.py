from django.urls import path, include
from rest_framework import routers

from .views import CategoryViewSet, AdViewSet, SubCategoryViewSet

router = routers.DefaultRouter()

# Link the routes to the different ViewSets
router.register('categories', CategoryViewSet)
router.register('subcategories', SubCategoryViewSet)
router.register('ads', AdViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
