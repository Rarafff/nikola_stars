from rest_framework import serializers
from .models import Student, StarsLog

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class StarsLogSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only=True)
    class Meta:
        model = StarsLog
        fields = '__all__'
