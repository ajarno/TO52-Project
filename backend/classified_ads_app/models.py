from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager
)
from django_countries.fields import CountryField
from phonenumber_field.modelfields import PhoneNumberField

class UserManager(BaseUserManager):
    def create_user(self,email, password =None, is_active=True,is_staff=False,is_admin=False):
        if not email:
            raise ValueError("Vous devez renseigner votre adresse email")
        if not password:
            raise ValueError("Vous devez renseigner le mot de passe")
        user_obj = self.model(
            email = self.normalize_email(email)
        )
        user_obj.set_password(password)
        user_obj.staff = is_staff
        user_obj.admin = is_admin
        user_obj.active = is_active
        user_obj.save(using = self._db)
        return user_obj
    
    def create_staffuser(self, email,password=None):
        user = self.create_user(
            email,
            password=password,
            is_staff = True
        )
        return user
    
    def create_superuser(self,email,password=None):
        user = self.create_user(
            email,
            password=password,
            is_admin = True,
            is_staff = True
        )
        return user

"""
    This class is custom user class.
    Custom user class is required because we 
    need to modify default login method with username
    by email auth
"""
class User(AbstractBaseUser,PermissionsMixin):
    # Attributes
    email     = models.EmailField(max_length=80, unique=True)
    active    = models.BooleanField(default=True) # can login
    staff     = models.BooleanField(default=False) # staff user is ad publisher or buyer
    admin     = models.BooleanField(default=False) # admin user is superuser
    timestamp = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD  = 'email' # login require email

    REQUIRED_FIELDS = []

    objects = UserManager()

   # methods
    def __str__(self):
        return self.email

    def get_email(self):
        return self.email
    
    @property
    def is_staff(self):
        return self.staff

    @property
    def is_admin(self):
        return self.admin
    
    @property
    def is_active(self):
        return self.active

    @property
    def is_superuser(self):
        return self.is_admin





# Definition of a method to rename the users avatar  uploaded
def user_avatar_path(instance, filename):
    # Set the path
    upload_to = 'static/images/avatars/{userid}/'.format(userid=instance.id)

    # Build the filename
    # Get the extension
    ext = filename.split('.')[-1]
    # Set the filename as random string
    from uuid import uuid4
    filename = '{}.{}'.format(uuid4().hex, ext)

    # Return the whole path to the file
    import os
    return os.path.join(upload_to, filename)
    

"""
    This class contain extra informations
    about user
"""
class UserProfile(models.Model):

    user = models.OneToOneField(User,on_delete=models.CASCADE)

   # Attributes
    #upload at specific location
    avatar = models.ImageField(upload_to=user_avatar_path)
    validated = models.BooleanField(default=False)
    surname = models.CharField(max_length=35,blank=True)
    first_name = models.CharField(max_length=35,blank=True)
    tel = PhoneNumberField()
    adress_street = models.CharField(max_length=200, db_column='UserAdressStreet', blank=True)
    adress_postal_code = models.CharField(max_length=10, db_column='UserAdressPostalCode', blank=True)
    adress_city = models.CharField(max_length=30, db_column='UserAdressCity', blank=True)
    adress_country = CountryField(blank_label='(select country)',default=None)

    def __str__(self):
        return  self.first_name + " " + self.surname + ">"



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
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ads')
    saved_by = models.ManyToManyField(User, db_column='SavedBy', blank=True, related_name='saved_ads')
    category = models.ForeignKey(SubCategory, on_delete=models.CASCADE, related_name='ads')

    # Attributes
    published = models.DateField(auto_now_add=True)
    headline = models.CharField(max_length=75)
    description = models.TextField(max_length=1500)
    price = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(500000)])
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

# Define discussion model

class Chat(models.Model):
    # Foreign keys 
    sender = models.ForeignKey(User,on_delete=models.CASCADE, related_name='sender_chat')
    receiver = models.ForeignKey(User,on_delete=models.CASCADE, related_name='receiver_chat')
    related_ad = models.ForeignKey(Ad,on_delete=models.CASCADE, related_name='chats')
   
    # Attributes
    created_at = models.DateField(auto_now_add=True)
    content = models.TextField(max_length=1500,blank=False)

    def __str__(self):
        return   "  {} a envoyé  le message : {} à {}  pour l'annonce : {} ".format(self.sender.email,self.content,self.receiver.email,self.related_ad.headline)