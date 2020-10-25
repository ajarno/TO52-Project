from django.contrib import admin
from .models import (
    Chat, User,
    Category, Picture, Ad,
    SubCategory,UserProfile
)

# Register your models here.
admin.site.register(Chat)
admin.site.register(UserProfile)


# Register the usual administration panels
admin.site.register(User)
admin.site.register(SubCategory)
admin.site.register(Category)


# Create an inline administration component to add the pictures
class PictureInline(admin.StackedInline):
    model = Picture


# Create a panel which will be linked to the ad panel
class AdAdmin(admin.ModelAdmin):
    inlines = [PictureInline]


# Add the pictures inline panel to the ad panel
admin.site.register(Ad, AdAdmin)

