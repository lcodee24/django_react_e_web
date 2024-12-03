from rest_framework import serializers

from .models import Productcards


class Productcardshomeserializers(serializers.ModelSerializer):
     image = serializers.SerializerMethodField()
     
     def get_image(self,obj):
       return obj.image.url
     
     class Meta:
       
       model =  Productcards
       fields = "__all__"
       
       
       