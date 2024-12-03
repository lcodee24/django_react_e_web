from django.db import models

# Create your models here.

class Slider(models.Model):
     image = models.ImageField(upload_to='images/')
     
