from django.shortcuts import render
from attr import fields
from .models import Staff
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user: Staff):
        token = super().get_token(user)
        token['name']= user.username
        token['email']=user.email
        token['role']=user.role
        token['is admin'] = user.is_superuser
        return token

class CustomTokenObtainPairView(TokenObtainPairView):
     serializer_class = CustomTokenObtainPairSerializer