from django.contrib.auth.models import AbstractUser 
from django.db import models

# Create your models here.
class UserProfile(AbstractUser):
    address=models.TextField(blank=True,null=True)
    phone = models.CharField(max_length=10, blank=True, null=True)
    image=models.ImageField(upload_to='photos/',blank=True,null=True)

    def __str__(self):
        return self.username