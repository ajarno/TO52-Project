from django.contrib import admin
from classified_ads_app.models import Book, BookNumber, Character, Author


# Register your models here.
@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ['title', 'description']
    list_filter = ['published']  # offer filtering on this field
    search_fields = ['title', 'description']
    # fields = ['title', 'description']  # editable fields


admin.site.register(BookNumber)
admin.site.register(Character)
admin.site.register(Author)
