from django.urls import path

from . import views

urlpatterns = [
    path('card_product/',views.showproductcards.as_view())
]
 