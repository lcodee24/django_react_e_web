from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView 
from .serializers import Sliderdisplayserializers
from .models import Slider
from rest_framework.generics import ListCreateAPIView


class Sliderdisplay(ListCreateAPIView):
    queryset = Slider.objects.all()
    serializer_class = Sliderdisplayserializers

    def get(self, request):
        data = self.get_queryset()
        print("slider-data : " , data)
        serializer = self.serializer_class(data, many=True)  
        return Response(serializer.data)  

