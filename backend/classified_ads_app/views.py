from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Book
from .serializers import BookSerializer, BookMiniSerializer


class BookViewSet(viewsets.ModelViewSet):
    serializer_class = BookMiniSerializer
    queryset = Book.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = BookSerializer(instance)
        return Response(serializer.data)

# class Another(View):
#     # Book.objects.filter(is_published=true) => brings many
#     # Book.objects.get(id=2) => brings one
#     books = Book.objects.all()
#     output = ''
#     for book in books:
#         output += f"We have {book.title} with ID {book.id} in DB<br>"
#
#     def get(self, request):
#         return HttpResponse(self.output)
#
#
# def first(request):
#     return HttpResponse('First message from views')
