from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.decorators import action
from .models import Chat, User, UserProfile, Category, Ad
from .serializers import CategorySerializer, AdMiniSerializer, AdSerializer, ChatSerializer, UserSerializer, \
    UserProfileSerializer
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

# UserViewSet
class UserViewSet(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['post'])
    def saved_ads(self, request):
        try:
            user = request.user
            saved_ads = user.saved_ads
            response = {'message': 'Les annonces sauvegardées', 'result': saved_ads}
            return Response(response, status=status.HTTP_200_OK)
        except:
            response = "Une erreur est survenue lors du traitement de l'opération"
            return Response(response, status=status.HTTP_200_OK)


# Create user profile
class UserProfileListCreateView(ListCreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)


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
    @action(detail=True, methods=['POST'])
    def ad_chats_byuser(self, request, pk=None):
        ad_chats_byuser = self.ad_chats_sent_byuser(request, pk).concat(self.ad_chats_received_byuser(request, pk))
        try:
            response = {'message': 'les chats reçu et envoyé par l''utilisateur pour une annonce donnée',
                        'result': ad_chats_byuser}
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
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Ad.objects.order_by('-published').all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = AdFilter

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = AdSerializer(instance, context={"request": request})
        return Response(serializer.data)
