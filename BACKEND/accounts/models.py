import email
from django.db import models
from django.forms import EmailField
from classroom_management.models import Staff

#from django.contrib.auth.models import (BaseUserManager, AbstractBaseUser



# class User(AbstractBaseUser):
#     staff = models.OneToOneField(Staff, on_delete= models.CASCADE)
    # email = EmailField(max_length=30)
    # email = AbstractBaseUser.
    # notice the absence of a "Password field", that is built in.
    

    # USERNAME_FIELD = email
    # REQUIRED_FIELDS = []
    
    # def __str__(self):
    #     return email