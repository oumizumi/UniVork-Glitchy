# api/urls.py
from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
# from . views import UserCreateView
from . import views

urlpatterns = [
   #Registration routes 
   path('student_account/', views.StudentCreateView.as_view(), name='student-account-create'),
   path('employee_account/', views.EmployerCreateView.as_view(), name='employee-account-create'),

   #Login route
   path('login/', views.Login.as_view(), name='login'), 

   #Profile routes
   path('student_profile/', views.StudentProfileCreateView.as_view(), name="student-profile-create"),
   path('employee_profile/', views.EmployerProfileCreateView.as_view(), name="employee-profile-create"),
   path('student_update/<int:user>/', views.StudentProfileEditView.as_view(), name="student-profile-edit"),
   path('employee_update/<int:user>/', views.EmployerProfileEditView.as_view(), name="employee-profile-edit"),
]
