from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Story(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    storyimage = models.ImageField(upload_to='media/')
    imagename = models.TextField(default="")