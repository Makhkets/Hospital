from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    email = models.EmailField()
    username = models.CharField(
        max_length=150,
        unique=True,
        blank=True,
        null=True
    )

    def __str__(self):
        return self.email

class userProfile(models.Model):
    user = models.OneToOneField(CustomUser,on_delete=models.CASCADE,related_name="profile")
    date_joined = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    is_admin = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username