from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.


class Product(models.Model):
   
  image = models.ImageField(upload_to='images/')
  title = models.CharField(max_length=30)
  orginalPrize = models.PositiveIntegerField(default=0)
  offerprice = models.PositiveIntegerField(default=0)
  category = models.CharField(max_length=200)
  rating = models.IntegerField(default = 0,validators=[MinValueValidator(1),MaxValueValidator(5)])
  totalRating = models.IntegerField(default=0)
  
      
  # def update_rating(self, new_rating):

  #     self.totalRating += 1 
  #     self.rating = ((self.rating * (self.totalRating - 1)) + new_rating) / self.totalRating
  #     self.save()
      
  def __str__(self):
     return self.title
   
   
   
        
        
        