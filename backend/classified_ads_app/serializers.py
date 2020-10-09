from rest_framework import serializers
from classified_ads_app.models import Category, Picture, Ad, UserAccount


class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('name', 'slug')


class CategorySerializer(serializers.ModelSerializer):
    mainCategory = serializers.PrimaryKeyRelatedField()
    subcategories = serializers.SubCategorySerializer()

    class Meta:
        model = Category
        fields = ('mainCategory', 'name', 'slug', 'subcategories')


class PictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Picture
        fields = ['id', 'pic']


class AdSerializer(serializers.ModelSerializer):
    pictures = PictureSerializer(many=True)

    class Meta:
        model = Ad
        fields = ['id', 'author', 'headline', 'description',
                  'category', 'price', 'published', 'pictures',
                  'adress_postal_code', 'adress_city']


class AdMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ad
        fields = ['id', 'headline', 'category', 'price',
                  'published', 'pictures', 'adress_city']
