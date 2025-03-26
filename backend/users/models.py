from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class User(models.Model):
    username = models.CharField(max_length=25, unique=True)
    password = models.CharField(max_length=50)

    def __str__(self):
        return self.username

'''
class CustomUser(AbstractUser):
    # Additional fields if needed
    pass
'''