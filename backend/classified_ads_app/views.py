from rest_framework import viewsets
from rest_framework.response import Response

from classified_ads_app.models import Category, Ad, SubCategory
from .serializers import CategorySerializer, AdMiniSerializer, AdSerializer, CategoryMiniSerializer, \
    SubCategorySerializer, SubCategoryMiniSerializer


class SubCategoryViewSet(viewsets.ModelViewSet):
    serializer_class = SubCategoryMiniSerializer
    queryset = SubCategory.objects.all()

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = SubCategorySerializer(instance)
        return Response(serializer.data)


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategoryMiniSerializer
    queryset = Category.objects.all()

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = CategorySerializer(instance)
        return Response(serializer.data)


class AdViewSet(viewsets.ModelViewSet):
    serializer_class = AdMiniSerializer
    queryset = Ad.objects.all()

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = AdSerializer(instance)
        return Response(serializer.data)
