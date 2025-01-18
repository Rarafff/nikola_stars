from django.urls import path
from .views import RFIDView, StudentListView, StudentDetailView, RegisterCardView, UpdateStudentProfileView, LoginView, GetLatestRFIDView, ClearRFIDView, DeleteStudentView, StarsLogView

urlpatterns = [
    path('rfid/', RFIDView.as_view(), name='rfid'),
    path('students/', StudentListView.as_view(), name='student-list'),  # Fetch all students
    path('student/<str:uid>/', StudentDetailView.as_view(), name='student-detail'),  # Fetch student by UID    
    path('register-card/', RegisterCardView.as_view(), name='register-card'),  # Add this line
    path("update-student/<str:rfid_id>/", UpdateStudentProfileView.as_view(), name="update-student"),
    path('login/', LoginView.as_view(), name='login'),
    path('latest-rfid/', GetLatestRFIDView.as_view(), name='get_latest_rfid'),
    path('clear-rfid/', ClearRFIDView.as_view(), name='clear_rfid'),
    path('delete-student/<str:rfid_id>/', DeleteStudentView.as_view(), name='delete_student'),
    path('stars-log/', StarsLogView.as_view(), name='stars-log'),
    path('stars-log/<int:student_id>/', StarsLogView.as_view(), name='student-stars-log'),
]
