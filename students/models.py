from django.db import models
from django.contrib.auth.models import AbstractBaseUser

class Student(models.Model):
    rfid_id = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    stars = models.IntegerField(default=0)
    photo_url = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'students_student'

class StarsLog(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    stars_change = models.IntegerField()
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'students_starslog'

class AdminUser(AbstractBaseUser):
    username = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    is_admin = models.BooleanField(default=False)
    
    class Meta:
        db_table = 'students_user'

class LatestRFID(models.Model):
    uid = models.CharField(max_length=255, unique=True)
    timestamp = models.DateTimeField(auto_now=True)  # Updates every time a new UID is stored

    class Meta:
        db_table = 'student_latest_rfid'
