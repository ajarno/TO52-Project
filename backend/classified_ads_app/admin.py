from django.contrib import admin
from .models import (
    Discussion, User,UserProfile
)

# Register your models here.
admin.site.register(Discussion)
admin.site.register(UserProfile)
