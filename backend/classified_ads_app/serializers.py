from rest_framework import serializers
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model, authenticate
from .models import Chat, User, UserProfile, Category, Picture, Ad


# Picture Serializer
class PictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Picture
        fields = ('pic',)


# TODO: remplacer author par un UserSerializer
class AdSerializer(serializers.ModelSerializer):
    pictures = PictureSerializer(many=True)

    class Meta:
        model = Ad
        fields = ['id', 'author', 'headline', 'description',
                  'pictures', 'category', 'price', 'published',
                  'adress_postal_code', 'adress_city']


class AdMiniSerializer(serializers.ModelSerializer):
    first_picture = serializers.SerializerMethodField(read_only=True)
    total_pictures = serializers.IntegerField(source="pictures.count", read_only=True)

    def get_first_picture(self, obj):
        return PictureSerializer(obj.pictures.all()[0], context={'request': self.context.get('request', None)}).data if obj.pictures.count() > 0 else None

    class Meta:
        model = Ad
        fields = ['id', 'headline', 'category', 'price',
                  'published', 'adress_city', 'first_picture', 'total_pictures']


# Discussion serializer
class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ('id', 'sender', 'receiver', 'related_ad', 'created_at', 'content')


# User Serializer class for our custom user
class UserSerializer(serializers.ModelSerializer):
    # get saved ads of users
    #  saved_ads = AdSerializer(many=True, read_only=True)

    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'password', 'saved_ads')


# User profile Serializer
class UserProfileSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = UserProfile
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at',)


# Category Serializer
class CategorySerializer(serializers.ModelSerializer):
    total_ads = serializers.SerializerMethodField(read_only=True)

    @staticmethod
    def get_total_ads(obj):
        return obj.classifiedads.count()

    class Meta:
        model = Category
        fields = ('slug', 'name', 'picture', 'total_ads')
