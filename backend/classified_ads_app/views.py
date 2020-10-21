from rest_framework import viewsets,status
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.response import Response
from .models import Chat, User, UserProfile
from .serializers import ( ChatSerializer, UserSerializer, UserProfileSerializer)
from rest_framework.generics import (ListCreateAPIView,
RetrieveUpdateDestroyAPIView,)
from .permissions import IsOwnerProfileOrReadOnly,IsOwnerChatOrReadOnly
from classified_ads_app.models import Category, Ad, SubCategory
from .serializers import CategorySerializer, AdMiniSerializer, AdSerializer, CategoryMiniSerializer, \
    SubCategorySerializer, SubCategoryMiniSerializer
from rest_framework.decorators import action



# UserViewSet
class UserViewSet(ListCreateAPIView):
    queryset=User.objects.all()
    serializer_class=UserSerializer
    permission_classes=[IsAuthenticated]

    @action(detail=True, methods=['post'])
    def saved_ads(self, request):
        try:
            user = request.user
            saved_ads = user.saved_ads
            response = {'message': 'Les annonces sauvégardées', 'result': saved_ads}
            return Response(response, status=status.HTTP_200_OK)
        except:
            response = "Une erreur est survenue lors du traitement de l'opération"
            return Response(response, status=status.HTTP_200_OK)
       

#Create user profile
class UserProfileListCreateView(ListCreateAPIView):
    queryset=UserProfile.objects.all()
    serializer_class=UserProfileSerializer
    permission_classes=[IsAuthenticated]

    def perform_create(self, serializer):
        user=self.request.user
        serializer.save(user=user)

#Get user profile details
class userProfileDetailView(RetrieveUpdateDestroyAPIView):
    queryset=UserProfile.objects.all()
    serializer_class=UserProfileSerializer
    permission_classes=[IsOwnerProfileOrReadOnly,IsAuthenticated]

        
# Chat ViewSets
class UserChatViewSet(viewsets.ModelViewSet):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes=[IsAuthenticated,IsOwnerChatOrReadOnly]

    #les chats envoyés par l'utilisateur pour une annonce donnée
    def ad_chats_sent_byuser(self, request,pk=None):
        user = request.user
        related_ad =  Ad.objects.get(id=pk)
        chats = Chat.objects.all().filter(sender= user,related_ad=related_ad)
        return chats

    #les chats recus par l'utilisateur pour une annonce donnée
    def ad_chats_received_byuser(self, request,pk=None):
        user = request.user
        related_ad =  Ad.objects.get(id=pk)
        chats = Chat.objects.all().filter(receiver= user,related_ad=related_ad)
        return chats
    
    #les chats reçu et envoyé par l'utilisateur pour une annonce donnée`
    @action(detail=True, methods=['POST'])
    def ad_chats_byuser(self, request,pk=None):
        ad_chats_byuser = self.ad_chats_sent_byuser(request,pk).concat(self.ad_chats_received_byuser(request,pk))
        try:
            response = {'message': 'les chats reçu et envoyé par l''utilisateur pour une annonce donnée', 'result': ad_chats_byuser}
            return Response(response, status=status.HTTP_200_OK)
        except:
            response = "Une erreur est survenue lors du traitement de l'opération"
            return Response(response, status=status.HTTP_200_OK)

        
# Chat ViewSets
class AdminChatViewSet(viewsets.ModelViewSet):
    queryset=Chat.objects.all()
    serializer_class=ChatSerializer
    permission_classes=[IsAuthenticated,IsAdminUser]





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
