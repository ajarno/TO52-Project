import os
from uuid import uuid4
from django.db import models  # used for SQLite database
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import PermissionsMixin, AbstractBaseUser, BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, is_active=True, is_staff=False, is_admin=False):
        if not email:
            raise ValueError("Vous devez renseigner votre adresse email")
        if not password:
            raise ValueError("Vous devez renseigner votre mot de passe")
        user_obj = self.model(
            email=self.normalize_email(email)
        )
        user_obj.set_password(password)
        user_obj.admin = is_admin
        user_obj.active = is_active
        user_obj.save(using=self._db)
        return user_obj

    def create_superuser(self, email, password=None):
        user = self.create_user(
            email,
            password=password,
            is_admin=True,
            is_staff=True
        )
        return user


# This class is custom user class.
# Custom user class is required because we need to modify
# default login method with username by email auth
class User(AbstractBaseUser, PermissionsMixin):
    # Attributes
    email = models.EmailField(max_length=80, unique=True)
    is_active = models.BooleanField(default=True)  # can login
    admin = models.BooleanField(default=False)  # admin user is superuser
    timestamp = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'  # login require email

    REQUIRED_FIELDS = []

    objects = UserManager()

    # Methods
    def __str__(self):
        return self.email

    def get_email(self):
        return self.email

    @property
    def is_admin(self):
        return self.admin

    @property
    def is_superuser(self):
        return self.is_admin


# Definition of a method to rename the users avatar  uploaded
def user_avatar_path(instance, filename):
    # Set the path
    upload_to = 'images/avatars/{userid}/'.format(userid=instance.id)

    # Build the filename
    # Get the extension
    ext = filename.split('.')[-1]
    # Set the filename as random string
    filename = '{}.{}'.format(uuid4().hex, ext)

    # Return the whole path to the file
    return os.path.join(upload_to, filename)


# This class contain extra information about user
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')

    # Attributes
    # upload at specific location
    avatar = models.FileField(upload_to=user_avatar_path, blank=True)
    surname = models.CharField(max_length=35, blank=True)
    first_name = models.CharField(max_length=35, blank=True)
    birth_day = models.DateField(blank=True)
    tel = models.CharField(max_length=10, blank=True)
    address_street = models.CharField(
        max_length=200, db_column='UserAddressStreet', blank=True)
    address_postal_code = models.CharField(
        max_length=10, db_column='UserAddressPostalCode', blank=True)
    address_city = models.CharField(
        max_length=30, db_column='UserAddressCity', blank=True)
    address_country = models.CharField(
        max_length=20, blank=True, default="France")

    def __str__(self):
        return self.first_name + " " + self.surname


# Definition of a method to rename the pictures uploaded
def category_path(instance, filename):
    # Set the path
    upload_to = 'images/categories/'

    # Build the filename
    # Get the extension
    ext = filename.split('.')[-1]
    # Set the filename as random string
    from uuid import uuid4
    filename = '{slug}.{extension}'.format(slug=instance.slug, extension=ext)

    # Return the whole path to the file
    import os
    return os.path.join(upload_to, filename)


# Define the Categories available
class Category(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(primary_key=True)
    picture = models.ImageField(upload_to=category_path)

    class Meta:
        verbose_name_plural = "categories"

    def __str__(self):
        return self.name


# Define location for an ad or user
class Location(models.Model):
    country = models.CharField(max_length=50)
    countryCode = models.CharField(max_length=2, blank=True)
    region = models.CharField(max_length=75, blank=True)
    county = models.CharField(max_length=75, blank=True)
    postalCode = models.CharField(max_length=10)
    city = models.CharField(max_length=50)
    street = models.CharField(max_length=200, blank=True)
    lat = models.DecimalField(max_digits=9, decimal_places=6)
    lng = models.DecimalField(max_digits=9, decimal_places=6)

    def __str__(self):
        return self.street + ", " + self.postalCode + " " + self.city + ", " + self.country


# Define the model describing an Ad
class Ad(models.Model):
    # Foreign keys
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='classifiedads')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='classifiedads')
    location = models.ForeignKey(Location, related_name="ad", on_delete=models.CASCADE)

    # Attributes
    published = models.DateField(auto_now_add=True)
    headline = models.CharField(max_length=75)
    description = models.TextField(max_length=1500)
    price = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(500000)])

    def __str__(self):
        return self.headline + " - " + self.price.__str__() + "€"


# Definition of a method to rename the pictures uploaded
def path_and_rename(instance, filename):
    # Set the path
    upload_to = 'images/classifiedads/{adid}/'.format(
        adid=instance.relatedAd.id)

    # Build the filename
    # Get the extension
    ext = filename.split('.')[-1]
    # Set the filename as random string
    filename = '{}.{}'.format(uuid4().hex, ext)

    # Return the whole path to the file
    return os.path.join(upload_to, filename)


# TODO: Save online the pictures instead of inside the folder
# Define the Picture model linked to an Ad
class Picture(models.Model):
    relatedAd = models.ForeignKey(Ad, on_delete=models.SET_NULL, related_name='pictures', null=True)
    pic = models.ImageField(upload_to=path_and_rename, blank=True)

    def __str__(self):
        return self.pic.url


# Define discussion model
class Chat(models.Model):
    # Foreign keys
    sender = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='sender_chat')
    receiver = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='receiver_chat')
    related_ad = models.ForeignKey(
        Ad, on_delete=models.CASCADE, related_name='chats')

    # Attributes
    created_at = models.DateField(auto_now_add=True)
    content = models.TextField(max_length=1500, blank=False)

    def __str__(self):
        return "  {} a envoyé  le message : {} à {}  pour l'annonce : {} ".format(self.sender.email, self.content,
                                                                                  self.receiver.email,
                                                                                  self.related_ad.headline)
