from django.urls import path
from base.views import * 

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

urlpatterns = [
    path("login/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("register/", createAccount, name="register"),
    path("cryptos/", getCsvs, name="coins"),
]
