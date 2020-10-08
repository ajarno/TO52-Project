from rest_framework import serializers
from classified_ads_app.models import Book, BookNumber, Character, Author


class BookNumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookNumber
        fields = ['id', 'isbn_10', 'isbn_13']


class CharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        fields = ['id', 'name']


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['id', 'name', 'surname']


class BookSerializer(serializers.ModelSerializer):
    number = BookNumberSerializer(many=False)
    characters = CharacterSerializer(many=True)
    authors = AuthorSerializer(many=True)

    class Meta:
        model = Book
        fields = ['id', 'title', 'description', 'price',
                  'published', 'number', 'characters', 'authors']


class BookMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title']
