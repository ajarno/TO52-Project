from django.contrib.auth.models import User
from django.db import models


# Create your models here.
#     BOOKS = (
#         ('HB', 'Hobbit'),
#         ('LOTR', 'Lord of the Ring'),
#     )
# null=True, blank=False, unique=True, default='', choices=BOOKS

# Extension
# class BookNumber(models.Model):
#     isbn_10 = models.CharField(max_length=10, blank=True)
#     isbn_13 = models.CharField(max_length=13, blank=True)
#
#
# class Book(models.Model):
#     STATUSES = (
#         (0, 'Unknown'),
#         (1, 'Processed'),
#         (2, 'Paid'),
#     )
#
#     title = models.CharField(max_length=100, blank=False, unique=True)
#     description = models.TextField(max_length=1500, blank=True)
#     price = models.IntegerField(default=0)
#     published = models.DateField(editable=False, blank=True, null=True, default=None) # , auto_now_add=True)
#     cover = models.ImageField(upload_to='covers/', blank=True)
#
#     number = models.OneToOneField(BookNumber, null=True, blank=True, on_delete=models.CASCADE)
#
#     def __str__(self):
#         return self.title
#
#
# class Character(models.Model):
#     name = models.CharField(max_length=30)
#     book = models.ForeignKey(Book, on_delete=models.CASCADE,
#                              related_name='characters')
#
#
# class Author(models.Model):
#     name = models.CharField(max_length=30)
#     surname = models.CharField(max_length=30)
#     books = models.ManyToManyField(Book, related_name='authors')


# Define the Users for our site
class UserAccount(models.Model):
    # Inheritance
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    # Attributes
    validated = models.BooleanField(default=False)
    tel = models.CharField(max_length=15)
    adress_street = models.CharField(max_length=200, db_column='UserAdressStreet', blank=True)
    adress_postal_code = models.CharField(max_length=10, db_column='UserAdressPostalCode', blank=True)
    adress_city = models.CharField(max_length=30, db_column='UserAdressCity', blank=True)
    adress_country = models.CharField(max_length=30, db_column='UserAdressCountry', blank=True)


# Define the Categories available for the ads
class Category(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField()

    # Allow to define subcategories
    main_category = models.ForeignKey('self', blank=True, null=True,
                                      db_column='MainCategory', related_name='subcategories')


# Define the model describing an Ad
class Ad(models.Model):
    # Foreign keys
    author = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='ads')
    saved_by = models.ManyToManyField(UserAccount, db_column='SavedBy', related_name='saved_ads')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='ads')

    # Attributes
    published = models.DateField(auto_now_add=True)
    headline = models.CharField(max_length=100)
    description = models.TextField(max_length=1500)
    price = models.IntegerField(default=0)
    adress_postal_code = models.CharField(max_length=10, db_column='AdAdressPostalCode', blank=True)
    adress_city = models.CharField(max_length=30, db_column='AdAdressCity', blank=True)


# For now, pictures are saved in a folder
# The best way would be to save online the picture and stock only the path to the pics
class Picture(models.Model):
    ad_id = models.ForeignKey(Ad, db_column='AdId', on_delete=models.CASCADE, related_name='pictures')
    pic = models.ImageField(upload_to='pictures/', blank=True)
    # url = models.CharField(max_length=150)

