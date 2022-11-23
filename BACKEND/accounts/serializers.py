from .models import *
from classroom_management.models import Staff
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = ['id', 'uname', 'email', 'Is_admin']

    