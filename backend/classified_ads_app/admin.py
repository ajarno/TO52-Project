from django.contrib import admin
from classified_ads_app.models import Category, Picture, Ad, UserAccount

# Register the usual administration panels
admin.site.register(UserAccount)
admin.site.register(Category)


# Create an inline administration component to add the pictures
class PictureInline(admin.StackedInline):
    model = Picture


# Create a panel which will be linked to the ad panel
class AdAdmin(admin.ModelAdmin):
    inlines = [PictureInline]


# Add the pictures inline panel to the ad panel
admin.site.register(Ad, AdAdmin)

