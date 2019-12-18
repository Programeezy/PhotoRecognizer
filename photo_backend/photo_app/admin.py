from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from photo_app.models import User, SearchResult, Person

admin.register(User, UserAdmin)
admin.register(SearchResult, UserAdmin)
admin.register(Person, UserAdmin)
