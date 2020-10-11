from rest_framework import serializers
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
