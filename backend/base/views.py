from .regression import regression
from django.http import response
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, BasePermission
from rest_framework.response import Response

from .serializers import *

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status

from .models import Crypto

import requests

# Create your views here.
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["POST"])
# @permission_classes([IsAdminUser])
def createAccount(request):
    data = request.data

    try:
        user = User.objects.create(
            first_name=data["name"],
            username=data["email"],
            email=data["email"],
            password=make_password(data["password"]),
        )

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {"detail": "User with this email already exists"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


# Update User Profile
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)

    data = request.data

    user.first_name = data["name"]
    user.username = data["email"]
    user.email = data["email"]

    if data["password"] != "":
        user.password = make_password(data["password"])

    user.save()

    return Response(serializer.data)


# Get all users
@api_view(["GET"])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def getUserById(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateUser(request, pk):
    user = User.objects.get(id=pk)

    data = request.data

    user.first_name = data["name"]
    user.username = data["email"]
    user.email = data["email"]
    user.is_staff = data["isAdmin"]

    user.save()
     
    serializer = UserSerializerWithToken(user, many=False)

    return Response(serializer.data)


@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    userForDeletion = User.objects.get(id=pk)
    userForDeletion.delete()
    return Response("User was deleted successfully")



@api_view(["GET"])
def getCsvs(request):
    coins = Crypto.objects.all()
    serializer = CryptoSerializer(coins, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def getCsvById(request, pk):
    coin = Crypto.objects.get(name=pk)
    serializer = CryptoSerializer(coin, many=False)
    return Response(serializer.data)

@api_view(["GET", "POST"])
def getPredictionValue(request):
    data = request.data

    csv_file = data["file"]
    date_p = data["date_p"]
    open_p = data["open_p"]
    close_p = data["close_p"]
    volume = data["volume"]

    prediction = regression(csv_file, date_p, open_p, close_p, volume)

    return Response(prediction)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getMyFavCoins(request):
    user = request.user
    coins = user.favcoin_set.all()
    serializer = FavCoinSerializer(coins, many=True)
    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def createFavCoin(request):
    data = request.data
    user = User.objects.get(email=request.user)

    if FavCoin.objects.filter(user=user, coin=data["coin"]).exists():
        coinForDeletion = request.user.favcoin_set.get(coin=data["coin"])
        coinForDeletion.delete()
        return Response("Coin was deleted successfully")

    else:
        try:
            coin = FavCoin.objects.create(
            user = user,
            coin = data["coin"],
            )

            serializer = FavCoinSerializer(coin, many=False)
            return Response(serializer.data)
        except:
            message = {"detail": "Coin with this email already exists"}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
