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
import json


# Define the Filters

# Define the filter on the ad list
class AdFilter(filters.FilterSet):
    min_price = filters.NumberFilter(field_name="price", lookup_expr='gte')
    max_price = filters.NumberFilter(field_name="price", lookup_expr='lte')
    location = filters.CharFilter(
        field_name='location__city', lookup_expr='exact')
    userId = filters.CharFilter(field_name='author__id', lookup_expr='exact')
    text = filters.CharFilter(
        method='filter_contains_text', label='Ad text contains')

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
        user = User.objects.get(pk=self.request.user.id)

        if len(profile) == 0:
            status = 200
            data = {'email': user.email}
        else:
            profile = list(profile)[0]
            profile['email'] = user.email
            status = 200
            data = profile

        return Response({'profile': data}, status)


class ChatFromContactByAd(RetrieveUpdateDestroyAPIView):
    # chat received by the user for a particular ad

    def get(self, request, contact_id=None, ad_id=None):
        print("contact", contact_id, "ad id", ad_id)
        user = request.user
        related_ad = Ad.objects.get(id=ad_id)
        chats = []
        chats_from = Chat.objects.all().filter(
            Q(sender=contact_id), Q(
                receiver=user), related_ad=related_ad)
        chats_to = Chat.objects.all().filter(
            Q(receiver=contact_id), Q(sender=user), related_ad=related_ad)
        chats_from.union(chats_to)
        chats.append(chats_from.values())
        chats.append(chats_to.values())
        print(chats_to.values())
        print(chats_from.values())
        return Response({'chats': chats_from.values()}, status=200)


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

    # This method returns the contacts of the connected users,
    # , last message and  related ad.
    @ action(
        methods=['get'],
        detail=False,
        url_path='contacts',
        url_name='contacts',
    )
    def contacts(self, request):
        user = self.request.user
        contacts = list()
        chats = Chat.objects.filter(Q(sender=user) | Q(
            receiver=user)).order_by('created_at')
        if len(chats) > 0:
            for chat in chats:
                if(chat.receiver.id != user.id):
                    profile = UserProfile.objects.filter(
                        user_id=chat.receiver.id).values()[0]
                    contacts.append(
                        {'id': chat.receiver.id, 'ad_id': chat.related_ad.id, 'surname': profile['surname'], 'first_name': profile['first_name'],
                            'avatar': profile['avatar'], "last_message": chat.content, "related_ad": chat.related_ad.headline})

        return Response({'contacts': contacts}, status=200)


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.order_by('name').all()
    http_method_names = ['get']
    permission_classes = [AllowAny]


class AdViewSet(viewsets.ModelViewSet):
    serializer_class = AdMiniSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
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
