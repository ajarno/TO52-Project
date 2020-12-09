from rest_framework import serializers
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model, authenticate
from .models import Chat, User, UserProfile, Category, Picture, Ad, Location


# Picture Serializer
class PictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Picture
        fields = ('pic',)


# Location Serializer
class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ('country', 'countryCode', 'region', 'county', 'postalCode', 'city', 'street', 'lat', 'lng')


# User Serializer class for our custom user
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'password')


# User profile Serializer
class UserProfileSerializer(serializers.ModelSerializer):
    email = serializers.StringRelatedField(source="user", read_only=True)

    class Meta:
        model = UserProfile
        fields = ('first_name', 'surname', 'email', 'tel', 'avatar', 'adress_city', 'adress_postal_code')
        read_only_fields = ('created_at', 'updated_at',)


# User details Serializer
class UserDetailsSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(many=False)

    class Meta:
        model = User
        fields = ('id', 'profile',)


# TODO: remplacer author par un UserSerializer
class AdSerializer(serializers.ModelSerializer):
    pictures = PictureSerializer(many=True)
    location = LocationSerializer(many=False)
    author = UserDetailsSerializer(many=False)

    class Meta:
        model = Ad
        fields = ['id', 'author', 'headline', 'description', 'pictures',
                  'category', 'price', 'published', 'location']


class AdMiniSerializer(serializers.ModelSerializer):
    first_picture = serializers.SerializerMethodField(read_only=True)
    total_pictures = serializers.IntegerField(source="pictures.count", read_only=True)
    location_city = serializers.CharField(source='location.city')

    def get_first_picture(self, obj):
        return PictureSerializer(obj.pictures.all()[0], context={'request': self.context.get('request', None)}).data if obj.pictures.count() > 0 else None

    class Meta:
        model = Ad
        fields = ['id', 'headline', 'category', 'price',
                  'published', 'location_city', 'first_picture', 'total_pictures']


# Discussion serializer
class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ('id', 'sender', 'receiver', 'related_ad', 'created_at', 'content')


# Category Serializer
class CategorySerializer(serializers.ModelSerializer):
    total_ads = serializers.SerializerMethodField(read_only=True)

    @staticmethod
    def get_total_ads(obj):
        return obj.classifiedads.count()

    class Meta:
        model = Category
        fields = ('slug', 'name', 'picture', 'total_ads')
