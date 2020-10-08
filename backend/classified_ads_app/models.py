from django.db import models


# Create your models here.
#     BOOKS = (
#         ('HB', 'Hobbit'),
#         ('LOTR', 'Lord of the Ring'),
#     )
# null=True, blank=False, unique=True, default='', choices=BOOKS

# Extension
class BookNumber(models.Model):
    isbn_10 = models.CharField(max_length=10, blank=True)
    isbn_13 = models.CharField(max_length=13, blank=True)


class Book(models.Model):
    STATUSES = (
        (0, 'Unknown'),
        (1, 'Processed'),
        (2, 'Paid'),
    )

    title = models.CharField(max_length=100, blank=False, unique=True)
    description = models.TextField(max_length=1500, blank=True)
    price = models.IntegerField(default=0)
    published = models.DateField(editable=False, blank=True, null=True, default=None) # , auto_now_add=True)
    cover = models.ImageField(upload_to='covers/', blank=True)

    number = models.OneToOneField(BookNumber, null=True, blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Character(models.Model):
    name = models.CharField(max_length=30)
    book = models.ForeignKey(Book, on_delete=models.CASCADE,
                             related_name='characters')


class Author(models.Model):
    name = models.CharField(max_length=30)
    surname = models.CharField(max_length=30)
    books = models.ManyToManyField(Book, related_name='authors')

# # ----------------------------------------------------------------------------------
# # Explain the role of the Users
# class Role(models.Model):
#     code = models.CharField(max_length=20, primary_key=True)
#     description = models.CharField(max_length=100)
#
#
# # Define the categories of the ads
# class Category(models.Model):
#     code = models.CharField(max_length=30, primary_key=True)
#     description = models.CharField(max_length=100)
#
#
# class User(models.Model):
#     validated = models.BooleanField(editable=False, default=False)
#     type = models.ForeignKey(Role, on_delete=models.CASCADE, default="User")
#     created = models.DateField(editable=False, auto_now_add=True)
#     username = models.CharField(max_length=50, unique=True)
#     password = models.CharField(max_length=20)
#     email = models.EmailField()
#     tel = models.CharField(max_length=15)
#     first_name = models.CharField(max_length=50)
#     last_name = models.CharField(max_length=50)
#     adress_street = models.CharField(max_length=200, db_column='AdressStreet', blank=True)
#     adress_postal_code = models.CharField(max_length=10, db_column='AdressPostalCode', blank=True)
#     adress_city = models.CharField(max_length=30, db_column='AdressCity', blank=True)
#     adress_country = models.CharField(max_length=30, db_column='AdressCountry', blank=True)
#
#
# class Ad(models.Model):
#     category = models.ForeignKey(Category, on_delete=models.CASCADE)
#     author = models.ForeignKey(User, on_delete=models.CASCADE)
#     publication_date = models.DateField(editable=False, db_column='PublicationDate', auto_now_add=True)
#     headline = models.CharField(max_length=100)
#     description = models.TextField(max_length=1500)
#     price = models.IntegerField(default=0)
#     adress_postal_code = models.CharField(max_length=10, db_column='AdressPostalCode', blank=True)
#     adress_city = models.CharField(max_length=30, db_column='AdressCity', blank=True)
#
#
# class Image(models.Model):
#     ad_id = models.ForeignKey(Ad, db_column='AdId', on_delete=models.CASCADE)
#     url = models.CharField(max_length=150)
#
#
# class Chat(models.Model):
#     ad_id = models.ForeignKey(Ad, db_column='AdId', on_delete=models.SET_NULL, null=True)
#     ad_author = models.ForeignKey(User, db_column='AdAuthor', related_name="ad_author", on_delete=models.SET_NULL, null=True)
#     client = models.ForeignKey(User, related_name="client", on_delete=models.SET_NULL, null=True)
#     message = models.TextField(max_length=750)
#     send_time = models.DateTimeField(editable=False, auto_now_add=True, db_column='sendTime')
