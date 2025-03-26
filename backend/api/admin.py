from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import  User, StudentProfile, EmployerProfile
# Register your models here.

class MyUserAdmin(UserAdmin):
    list_filter = UserAdmin.list_filter + ('groups__name',)



admin.site.register(User, UserAdmin)
admin.site.register(StudentProfile)
admin.site.register(EmployerProfile)