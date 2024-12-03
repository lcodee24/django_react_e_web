from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response
from .serializers import UserCartProductSerializer
from .models import Cart
from rest_framework.views import APIView

class Usercartproduct(ListCreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = UserCartProductSerializer
    
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save() 
            return Response({"message": "Cart successfully saved."})
        else:
            return Response(f"{serializer.errors} no cart added")
     
    def get(self, request):
        user_cart = self.request.query_params.get('user_cart')
        queryset = self.get_queryset()

        if user_cart:
            queryset = queryset.filter(user_cart=user_cart)
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        return Response([])
    
    
class Usercartremove(APIView):
    queryset = Cart.objects.all()
    serializer_class = UserCartProductSerializer

    def delete(self, request):
        try:
            cart_id = request.query_params.get('user_cart')  
            print(cart_id)
            cart_item = Cart.objects.get(id=cart_id)
            cart_item.delete()
            return Response({"message":"Item removed from cart successfully"})

        except Cart.DoesNotExist:
            
            return Response({"error":"Cart item not found"})
            