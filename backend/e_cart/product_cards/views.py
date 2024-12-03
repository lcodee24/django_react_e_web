from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView

from .models import Productcards
from .serializers import Productcardshomeserializers

# Create your views here.


class showproductcards(ListCreateAPIView):
     queryset = Productcards.objects.all()
     serializer_class = Productcardshomeserializers
     
     def get(self,request):
        data = self.get_queryset()
        
        serializer = self.get_serializer(data, many=True)
        
        return Response(serializer.data)
      