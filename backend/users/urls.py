from django.urls import path
from . views import create_employer_account, create_student_account
from . import views

urlpatterns = [
    # path('../../src/pages/SignupEmployer.js', views.create_employer_account, name='create_employer_account/'),
    # path('../../src/pages/SignupForm.js', views.create_student_account, name='create_student_account/'),
    path('create_employer_account/', views.create_employer_account, name='create_employer_account'),
    path('create_student_account/', views.create_student_account, name='create_student_account'),
]