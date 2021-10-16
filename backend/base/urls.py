from django.urls import path
from base.views import * 

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

urlpatterns = [
    path("login/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("register/", createAccount, name="register"),
    path("profile/", getUserProfile, name="user-profile"),
    path("profile/update/", updateUserProfile, name="update-user-profile"),
    path("", getUsers, name="users"),
    path("cryptos/", getCsvs, name="coins"),
    path("create/", createFavCoin, name="create_watchlist"), 
    path("mywatchlist/", getMyFavCoins, name="watchlist"), 
    path("myprediction/", getPredictionValue, name="prediction"), 
    path("<str:pk>/", getCsvById, name="coin"),
    path("id/<str:pk>/", getUserById, name="user"),
    path("update/<str:pk>/", updateUser, name="user-update"),
    path("delete/<str:pk>/", deleteUser, name="user-delete"),
]
