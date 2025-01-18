from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Student, LatestRFID, StarsLog
from .serializers import StudentSerializer, StarsLogSerializer
from django.contrib.auth import authenticate, login
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import LatestRFID, Student

class RFIDView(APIView):
    def post(self, request):
        uid = request.data.get('uid')
        if not uid:
            return Response(
                {"error": "No UID found"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        LatestRFID.objects.update_or_create(id=1, defaults={"uid": uid})

        try:
            student = Student.objects.get(rfid_id=uid)
            student_data = {
                "name": student.name,
                "stars": student.stars,
                "photo_url": student.photo_url,
                "rfid_id": student.rfid_id,
            }
            return Response(
                {"message": "UID received", "student": student_data}, 
                status=status.HTTP_200_OK
            )
        except Student.DoesNotExist:
            return Response(
                {"message": "UID received but no student found"}, 
                status=status.HTTP_404_NOT_FOUND
            )


        
class GetLatestRFIDView(APIView):
    def get(self, request):
        try:
            latest_rfid = LatestRFID.objects.get(id=1) 
            return Response({'uid': latest_rfid.uid}, status=status.HTTP_200_OK)
        except LatestRFID.DoesNotExist:
            return Response({'uid': None}, status=status.HTTP_404_NOT_FOUND)
        
class ClearRFIDView(APIView):
    def post(self, request):
        try:
            LatestRFID.objects.filter(id=1).delete()
            return Response({"message": "RFID cleared successfully"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class StudentListView(APIView):
    def get(self, request):
        students = Student.objects.all() 
        serializer = StudentSerializer(students, many=True) 
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class StudentDetailView(APIView):
    def get(self, request, uid):
        try:
            student = Student.objects.get(rfid_id=uid)
            serializer = StudentSerializer(student)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Student.DoesNotExist:
            return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)

class RegisterCardView(APIView):
    def post(self, request):
        rfid_id = request.data.get("rfid_id")
        name = request.data.get("name")
        stars = request.data.get("stars", 0)
        photo_url = request.data.get("photo_url", "")

        if not rfid_id or not name:
            return Response({"error": "RFID ID and name are required."}, status=status.HTTP_400_BAD_REQUEST)

        if Student.objects.filter(rfid_id=rfid_id).exists():
            return Response({"error": "This RFID is already registered."}, status=status.HTTP_400_BAD_REQUEST)

        student = Student.objects.create(
            rfid_id=rfid_id,
            name=name,
            stars=stars,
            photo_url=photo_url,
        )

        serializer = StudentSerializer(student)

        return Response({"message": "Card registered successfully!", "student": serializer.data}, status=status.HTTP_201_CREATED)
    
from datetime import datetime

class UpdateStudentProfileView(APIView):
    def put(self, request, rfid_id):
        stars = request.data.get("stars")
        name = request.data.get("name")
        photo_url = request.data.get("photo_url")

        try:
            student = Student.objects.get(rfid_id=rfid_id)
            
            if stars is not None:
                stars_change = int(stars) - student.stars
                
                student.stars = stars
                
                StarsLog.objects.create(
                    student=student,
                    stars_change=stars_change,
                    description="Stars updated by admin.",
                    created_at=datetime.now()
                )

            if name:
                student.name = name 
            if photo_url:
                student.photo_url = photo_url 
            
            student.save()

            serializer = StudentSerializer(student)
            return Response({"message": "Student profile updated successfully!", "student": serializer.data}, status=status.HTTP_200_OK)
        
        except Student.DoesNotExist:
            return Response({"error": "Student not found."}, status=status.HTTP_404_NOT_FOUND)


class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        print(f"Received username: {username}, password: {password}")

        user = authenticate(username=username, password=password)
        if user:
            print("User authenticated successfully!")
            login(request, user)

            # Generate token
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            return Response({"access_token": access_token}, status=status.HTTP_200_OK)
        else:
            print("Authentication failed.")
            return Response({"error": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)
        
class DeleteStudentView(APIView):
    def delete(self, request, rfid_id):
        try:
            student = Student.objects.get(rfid_id=rfid_id)
            student.delete()  
            return Response({"message": "Student deleted successfully."}, status=status.HTTP_200_OK)
        except Student.DoesNotExist:
            return Response({"error": "Student not found."}, status=status.HTTP_404_NOT_FOUND)
        
class StarsLogView(APIView):
    def get(self, request, student_id=None):
        if student_id:
            logs = StarsLog.objects.filter(student_id=student_id).order_by("-created_at")
        else:
            logs = StarsLog.objects.all().order_by("-created_at")

        serializer = StarsLogSerializer(logs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)