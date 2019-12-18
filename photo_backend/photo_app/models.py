from django.db import models

from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    is_premium = models.BooleanField(default=False)


class SearchResult(models.Model):
    answer = models.TextField(max_length=100, verbose_name='Initials of the person in the image')
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE)
    uploaded_image = models.ImageField(upload_to='photos/')
    upload_date = models.DateTimeField(auto_now_add=True)


class Person(models.Model):
    name = models.CharField(max_length=1024)
    photo_encoding = models.BinaryField()
