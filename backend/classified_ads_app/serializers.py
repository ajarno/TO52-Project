from rest_framework import serializers
from classified_ads_app.models import Category, Picture, Ad, UserAccount

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ('slug', 'name')


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
