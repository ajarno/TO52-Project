from django.contrib.auth.models import User
from django.db import models


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

    def __str__(self):
        return self.user.username + " <" + self.user.first_name + " " + self.user.last_name + ">"


# Define the Categories available
class Category(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(primary_key=True)

    class Meta:
        verbose_name_plural = "categories"

    def __str__(self):
        return self.name


# Define the SubCategories defining the ads
class SubCategory(models.Model):
    # Foreign keys
    category = models.ForeignKey('Category', on_delete=models.CASCADE, related_name='subcategories')

    # Attributes
    name = models.CharField(max_length=200)
    slug = models.SlugField(primary_key=True)

    class Meta:
        verbose_name_plural = "subcategories"

    def __str__(self):
        return self.name


# Define the model describing an Ad
class Ad(models.Model):
    # Foreign keys
    author = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='ads')
    saved_by = models.ManyToManyField(UserAccount, db_column='SavedBy', blank=True, related_name='saved_ads')
    category = models.ForeignKey(SubCategory, on_delete=models.CASCADE, related_name='ads')

    # Attributes
    published = models.DateField(auto_now_add=True)
    headline = models.CharField(max_length=75)
    description = models.TextField(max_length=1500)
    price = models.IntegerField(default=0)
    adress_postal_code = models.CharField(max_length=10, db_column='AdAdressPostalCode', blank=True)
    adress_city = models.CharField(max_length=30, db_column='AdAdressCity', blank=True)

    def __str__(self):
        return self.headline + " - " + self.adress_city + " - " + self.price.__str__() + "€"


# Definition of a method to rename the pictures uploaded
def path_and_rename(instance, filename):
    # Set the path
    upload_to = 'static/images/ads/{adid}/'.format(adid=instance.relatedAd.id)

    # Build the filename
    # Get the extension
    ext = filename.split('.')[-1]
    # Set the filename as random string
    from uuid import uuid4
    filename = '{}.{}'.format(uuid4().hex, ext)

    # Return the whole path to the file
    import os
    return os.path.join(upload_to, filename)


# TODO: Save online the pictures instead of inside the folder
# Define the Picture model linked to an Ad
class Picture(models.Model):
    relatedAd = models.ForeignKey(Ad, on_delete=models.CASCADE, related_name='pictures')
    pic = models.ImageField(upload_to=path_and_rename, blank=True)

    def __str__(self):
        return self.pic.url
