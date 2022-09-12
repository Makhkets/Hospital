from django.contrib import admin

from .models import userProfile, CustomUser

admin.site.register(userProfile)
admin.site.register(CustomUser)