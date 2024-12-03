from django.db import models

# Create your models here.

class Cart(models.Model):
    
    user_cart = models.CharField(max_length=30)
    img = models.TextField()
    title = models.CharField(max_length=30)
    offer = models.PositiveIntegerField(default=0)
    Originalprice = models.PositiveIntegerField(default=0)
    rating = models.IntegerField(default = 0)
    
    
    
   
  