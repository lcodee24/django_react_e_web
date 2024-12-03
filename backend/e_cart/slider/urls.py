from django.urls import path 

from . import views

urlpatterns = [
    path('slide/',views.Sliderdisplay.as_view())
]
 