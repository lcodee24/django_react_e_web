from rest_framework.generics import CreateAPIView , ListCreateAPIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate , login , logout
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework.views import APIView

class UserRegistrationView(CreateAPIView):
    
    serializer_class = UserSerializer

    def post(self, request):
        
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)      
      
class UserLoginView(APIView):
          
    def post(self, request):
        
        email = request.data.get("email")
        password = request.data.get("password")
        
        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request,user)
            return Response({"message": "Login successful"})
        return Response({"error": "Invalid credentials"},)


class showuserdata(ListCreateAPIView):
      queryset = User.objects.all()
      serializer_class = UserSerializer
      
      def get(self,request):
        data = self.get_queryset()
        serializer = self.get_serializer(data,many=True)
        
        return Response(serializer.data)
    
 
    
           
class UserLogoutView(APIView):
     
     def post(self,request):
        logout(request)
        return Response("logout successfully")
         
         
        
        
        
                
        
        
             
        
      
        


       
      
     