# students/authentication.py

from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.hashers import check_password
from .models import AdminUser  

class CustomAuthenticationBackend(BaseBackend):
    def authenticate(self, request, username=None, password=None):
        try:
            user = AdminUser.objects.get(username=username)
            if check_password(password, user.password):
                return user
        except AdminUser.DoesNotExist:
            return None
