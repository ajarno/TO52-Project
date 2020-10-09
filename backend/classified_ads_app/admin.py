from django.contrib import admin
from classified_ads_app.models import Category, Picture, Ad, UserAccount

admin.site.register(UserAccount)
admin.site.register(Category)
admin.site.register(Ad)
admin.site.register(Picture)
