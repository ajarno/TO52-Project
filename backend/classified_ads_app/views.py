from rest_framework import viewsets
from rest_framework.response import Response

from classified_ads_app.models import Category, Picture, Ad, UserAccount
from .serializers import CategorySerializer, AdMiniSerializer, AdSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class AdViewSet(viewsets.ModelViewSet):
    serializer_class = AdMiniSerializer
    queryset = Ad.objects.all()

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = AdSerializer(instance)
        return Response(serializer.data)

# class BookViewSet(viewsets.ModelViewSet):
#     serializer_class = BookMiniSerializer
#     queryset = Book.objects.all()
#     authentication_classes = (TokenAuthentication,)
#     permission_classes = (IsAuthenticated,)
#
#     def retrieve(self, request, *args, **kwargs):
#         instance = self.get_object()
#         serializer = BookSerializer(instance)
#         return Response(serializer.data)

#     # Book.objects.filter(is_published=true) => brings many
#     # Book.objects.get(id=2) => brings one
#     # Book.objects.all()
