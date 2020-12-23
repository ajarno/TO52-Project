from django.http import JsonResponse, HttpResponse
from django.shortcuts import redirect
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, GenericAPIView
from rest_framework.decorators import action
from rest_framework.views import APIView
import requests
from .models import Chat, User, UserProfile, Category, Ad, Picture, Location
from .serializers import CategorySerializer, AdMiniSerializer, AdSerializer, ChatSerializer, UserSerializer, \
    UserProfileSerializer, PictureSerializer, LocationSerializer
from .permissions import IsOwnerProfileOrReadOnly, IsOwnerChatOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters
from django.db.models import Q


# Define the Filters

# Define the filter on the ad list
class AdFilter(filters.FilterSet):
    min_price = filters.NumberFilter(field_name="price", lookup_expr='gte')
    max_price = filters.NumberFilter(field_name="price", lookup_expr='lte')
    location = filters.CharFilter(field_name='location__city', lookup_expr='exact')
    userId = filters.CharFilter(field_name='author__id', lookup_expr='exact')
    text = filters.CharFilter(method='filter_contains_text', label='Ad text contains')

    class Meta:
        model = Ad
        fields = ['category', 'location', 'text', 'min_price', 'max_price']

    @staticmethod
    def filter_contains_text(queryset, name, value):
        return queryset.filter(
            Q(headline__icontains=value) | Q(description__icontains=value)
        )


# Define the ViewSets

class UserViewSet(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


# Get user profile details
class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ('user',)
    http_method_names = ['get', 'post', 'put']
    permission_classes = [IsAuthenticated, IsOwnerProfileOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CurrentUserProfilView(RetrieveUpdateDestroyAPIView):
    def get(self, request):

        profile = UserProfile.objects.filter(
            user_id=self.request.user.id).values()
        if len(profile) == 0:
            status = 204
            data = ""
        else:
            status = 200
            data = list(profile)[0]
        return Response({'profile': data}, status)


class UserActivationView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, uid, token):
        protocol = 'https://' if request.is_secure() else 'http://'
        web_url = protocol + request.get_host()
        post_url = web_url + "/api/auth/users/activation/"
        post_data = {'uid': uid, 'token': token}
        requests.post(post_url, data=post_data)
        return redirect('http://localhost:3000/auth/confirm-activation')


class ResetPasswordConfirmationView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, uid, token):
        protocol = 'https://' if request.is_secure() else 'http://'
        web_url = protocol + request.get_host()
        post_url = web_url + "/api/auth/users/activation/"
        post_data = {'uid': uid, 'token': token}
        requests.post(post_url, data=post_data)
        return redirect('http://localhost:3000/auth/new-password/',  {'uid': uid, 'token': token})

      
# Get user profile details
class UserProfileDetailView(RetrieveUpdateDestroyAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsOwnerProfileOrReadOnly, IsAuthenticated]


# Chat ViewSets for the users
class UserChatViewSet(viewsets.ModelViewSet):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated, IsOwnerChatOrReadOnly]

    # chat sent by the user for a particular ad
    def ad_chats_sent_byuser(self, request, pk=None):
        user = request.user
        related_ad = Ad.objects.get(id=pk)
        chats = Chat.objects.all().filter(sender=user, related_ad=related_ad)
        return chats

    # chat received by the user for a particular ad
    def ad_chats_received_byuser(self, request, pk=None):
        user = request.user
        related_ad = Ad.objects.get(id=pk)
        chats = Chat.objects.all().filter(receiver=user, related_ad=related_ad)
        return chats

    # chat received and sent by the user for a particular ad
    @ action(detail=True, methods=['POST'])
    def ad_chats_byuser(self, request, pk=None):
        ad_chats_byuser = self.ad_chats_sent_byuser(request, pk).concat(
            self.ad_chats_received_byuser(request, pk))
        try:
            response = {
                'messages': 'Les messages reçus et envoyés par l''utilisateur pour une annonce donnée', 'result': ad_chats_byuser}
            return Response(response, status=status.HTTP_200_OK)
        except:
            response = "Une erreur est survenue lors du traitement de l'opération"
            return Response(response, status=status.HTTP_200_OK)


# Chat ViewSets for the admin
class AdminChatViewSet(viewsets.ModelViewSet):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.order_by('name').all()
    http_method_names = ['get']
    permission_classes = [AllowAny]


class AdViewSet(viewsets.ModelViewSet):
    serializer_class = AdMiniSerializer
    # permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Ad.objects.order_by('-published').all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = AdFilter

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = AdSerializer(instance, context={"request": request})
        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)


class PicturesViewSet(viewsets.ModelViewSet):
    queryset = Picture.objects.all()
    serializer_class = PictureSerializer
    # permission_classes = [IsAuthenticated]
    http_method_names = ['post', 'delete']


class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    # permission_classes = [IsAuthenticated]
    http_method_names = ['get', 'post']
