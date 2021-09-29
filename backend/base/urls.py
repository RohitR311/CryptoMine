from django.urls import path
from base.views import * 

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

urlpatterns = [
    path("login/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("register/", createAccount, name="register"),
    path("cryptos/", getCsvs, name="coins"),
    path("create/", createFavCoin, name="create_watchlist"), 
    path("mywatchlist/", getMyFavCoins, name="watchlist"), 
    path("myprediction/", getPredictionValue, name="prediction"), 
    path("<str:pk>/", getCsvById, name="coin")
]
