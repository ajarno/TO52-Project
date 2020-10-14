from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from knox.models import AuthToken
from .models import Discussion, User, UserProfile
from .serializers import ( DiscussionSerializer, UserSerializer, UserProfileSerializer,RegisterSerializer)
from rest_framework.generics import (ListCreateAPIView,
RetrieveUpdateDestroyAPIView,)
from rest_framework import generics, permissions
from .permissions import IsOwnerProfileOrReadOnly
from classified_ads_app.models import Category, Ad, SubCategory
from .serializers import CategorySerializer, AdMiniSerializer, AdSerializer, CategoryMiniSerializer, \
    SubCategorySerializer, SubCategoryMiniSerializer




# User ViewSet
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    #permission_classes = (AllowAny,) revoir

# Register API
class RegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
        "user": UserSerializer(user, context=self.get_serializer_context()).data,
        "token": AuthToken.objects.create(user)[1]
        })


class UserProfileListCreateView(ListCreateAPIView):
    queryset=UserProfile.objects.all()
    serializer_class=UserProfileSerializer
    permission_classes=[IsAuthenticated]

    def perform_create(self, serializer):
        user=self.request.user
        serializer.save(user=user)


class userProfileDetailView(RetrieveUpdateDestroyAPIView):
    queryset=UserProfile.objects.all()
    serializer_class=UserProfileSerializer
    permission_classes=[IsOwnerProfileOrReadOnly,IsAuthenticated]

        
# Discussion ViewSets
class DiscussionViewSet(viewsets.ModelViewSet):
    queryset = Discussion.objects.all()
    serializer_class = DiscussionSerializer


class SubCategoryViewSet(viewsets.ModelViewSet):
    serializer_class = SubCategoryMiniSerializer
    queryset = SubCategory.objects.all()
    http_method_names = ['get']

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = SubCategorySerializer(instance)
        return Response(serializer.data)


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategoryMiniSerializer
    queryset = Category.objects.all()
    http_method_names = ['get']

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
