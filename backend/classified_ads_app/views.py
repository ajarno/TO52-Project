from django.http import JsonResponse, HttpResponse
from django.shortcuts import redirect
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, GenericAPIView
from rest_framework.decorators import action
from rest_framework.views import APIView
import requests
from .models import Chat, User, UserProfile, Category, Ad
from .serializers import CategorySerializer, AdMiniSerializer, AdSerializer, ChatSerializer, UserSerializer, \
    UserProfileSerializer
from .permissions import IsOwnerProfileOrReadOnly, IsOwnerChatOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics


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
    # http_method_names = ['get', 'post', 'put']
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
    serializer_class = AdSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Ad.objects.order_by('-published').all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ('category',)

    # def retrieve(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     serializer = AdMiniSerializer(instance)
    #     return Response(serializer.data)
