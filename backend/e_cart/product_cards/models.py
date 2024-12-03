from django.db import models

# Create your models here.


class Productcards(models.Model):
    image = models.ImageField(upload_to='images/')
    title = models.CharField(max_length=50)
    para = models.CharField(max_length=50)
    
    

    
    