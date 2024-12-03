from django.urls import path
from . import views

urlpatterns = [
    path('register/',views.UserRegistrationView.as_view(), name='user-register'),
    path('login/', views.UserLoginView.as_view(), name='user-login'),
    path('user/',views.showuserdata.as_view()),
    path('logout/',views.UserLogoutView.as_view())
]
 