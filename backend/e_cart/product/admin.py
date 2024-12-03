from django.contrib import admin

from .models import Product

# Register your models here.

class Product_admin(admin.ModelAdmin):
  
   exclude = ["rating","totalRating"]
  

admin.site.register(Product,Product_admin)


