from django.urls import path 

from . import views

urlpatterns = [
    path("cart",views.showproduct.as_view(),name="cart")
]

