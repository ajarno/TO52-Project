from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager
)
from django_countries.fields import CountryField

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
class User(AbstractBaseUser):
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

"""
    This class contain extra informations
    about user
"""
class UserProfile(models.Model):

    user = models.OneToOneField(User,on_delete=models.CASCADE)

   # Attributes
    validated = models.BooleanField(default=False)
    surname = models.CharField(max_length=35,blank=True)
    first_name = models.CharField(max_length=35,blank=True)
    tel = models.CharField(max_length=15)
    adress_street = models.CharField(max_length=200, db_column='UserAdressStreet', blank=True)
    adress_postal_code = models.CharField(max_length=10, db_column='UserAdressPostalCode', blank=True)
    adress_city = models.CharField(max_length=30, db_column='UserAdressCity', blank=True)
    adress_country = CountryField(blank_label='(select country)',default=None)

    def __str__(self):
        return  self.first_name + " " + self.surname + ">"


# Define discussion model

class Discussion(models.Model):
    # Foreign keys 
    sender = models.ForeignKey(User,on_delete=models.CASCADE, related_name='sender_discussion')
    receiver = models.ForeignKey(User,on_delete=models.CASCADE, related_name='receiver_discussion')
    #related_ad = models.ForeignKey(Ad,on_delete=models.CASCADE, related_name='ad')
   
    # Attributes
    created_at = models.DateField(auto_now_add=True)
    content = models.TextField(max_length=1500,blank=False)

    def __str__(self):
        return self.sender.__str__ + " send " + self.content + " to " + self.receiver.__str__ + " about + self.related_ad.headline + >"

