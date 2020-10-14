from rest_framework import serializers
from .models import Discussion, User, UserProfile
from django.contrib.auth import (
    get_user_model, authenticate
)
from rest_framework.authtoken.models import Token

#Discussion serializer
class DiscussionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discussion
        fields = ('id','sender','receiver','created_at','content')

"""
    This is UserSerializer class for our
    custom user
"""
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'password')
        

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

# Login Serializer
class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")

# User profile Serializer
class UserProfileSerializer(serializers.ModelSerializer):
    user=serializers.StringRelatedField(read_only=True)
    class Meta:
        model=UserProfile
        fields='__all__'
        read_only_fields = ('created_at', 'updated_at',)
from classified_ads_app.models import Category, Picture, Ad, UserAccount, SubCategory


class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = ('slug', 'name', 'ads')


class SubCategoryMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = ('slug', 'name')


class CategorySerializer(serializers.ModelSerializer):
    subcategories = SubCategorySerializer(many=True)

    class Meta:
        model = Category
        fields = ('slug', 'name', 'subcategories')


class CategoryMiniSerializer(serializers.ModelSerializer):
    subcategories = SubCategoryMiniSerializer(many=True)

    class Meta:
        model = Category
        fields = ('slug', 'name', 'subcategories')


class PictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Picture
        fields = ['pic']


# TODO: remplacer author par un UserSerializer
class AdSerializer(serializers.ModelSerializer):
    pictures = PictureSerializer(many=True)

    class Meta:
        model = Ad
        fields = ['id', 'author', 'headline', 'description',
                  'category', 'price', 'published', 'pictures',
                  'adress_postal_code', 'adress_city']


class AdMiniSerializer(serializers.ModelSerializer):
    pictures = PictureSerializer(many=True)

    class Meta:
        model = Ad
        fields = ['id', 'headline', 'category', 'price', 'pictures',
                  'published', 'pictures', 'adress_city']
