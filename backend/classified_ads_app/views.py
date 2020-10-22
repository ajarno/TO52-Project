from rest_framework import viewsets
from rest_framework.response import Response

from classified_ads_app.models import Category, Ad
from .serializers import CategorySerializer, AdMiniSerializer, AdSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    http_method_names = ['get']


class AdViewSet(viewsets.ModelViewSet):
    serializer_class = AdMiniSerializer
    queryset = Ad.objects.all()

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = AdSerializer(instance)
        return Response(serializer.data)
