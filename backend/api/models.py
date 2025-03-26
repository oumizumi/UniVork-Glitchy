from django.db import models
from django.contrib.auth.models import AbstractUser

#TODO: File uploads, e.g. profile pictures, transcripts, CV, Company certificate

class User(AbstractUser):
    ROLE_CHOICES = (
        ('administrator', 'Administrator'),
        ('employer', 'Employer'),
        ('student', 'Student'),
    )
    role = models.CharField(max_length=15, choices=ROLE_CHOICES)
    email = models.EmailField(default="student@uottawa.ca")
    

class StudentProfile(models.Model):
    #TODO: Maybe use a phone number and university field from an existing framework
    LEVEL_CHOICES = (
        ("undergraduate", "Undergraduate"),
        ("graduate", "Graduate"),
    )
    STATUS_CHOICES = (
        ("currently", "Currently Enrolled"),
        ("alumni", "Alumni"),
    )
    username = models.CharField(max_length=50, unique=True, default="StudentUsername")
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="studentProfile", unique=True)
    country = models.CharField(max_length=50, default="Canada", editable=False)
    university = models.CharField(max_length=50, default="University of Ottawa", editable=False)
    email = models.CharField(max_length=50, default="dummyemail@uottawa.ca")
    major = models.CharField(max_length=50)
    level = models.CharField(max_length=15, choices=LEVEL_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    year = models.IntegerField(default=1, blank=True, null=True)
    gpa = models.IntegerField(default=2.5, blank=False, null=False)
    student_card = models.ImageField(upload_to='student_cards/', null=True, blank=True)
    transcript = models.FileField(upload_to='transcripts/', null=True, blank=True)
    resume = models.FileField(upload_to='resumes/', null=True, blank=True)
    phone_number = models.IntegerField(default="1234567890", null=False, blank=False)
    home_address = models.CharField(max_length=80, default="500 Generic Street, Generic City, Generic Province, Canada",
                                    null=False, blank=False)
    

class EmployerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="employerProfile")
    username = models.CharField(max_length=50, unique=True, default="EmployerUsername")
    email = models.EmailField(default="employer@uottawa.ca")
    profile_picture = models.FileField(upload_to='profile_pictures/', null=True, blank=True)
    company_name = models.CharField(max_length=50, default="EmployerCompany")
    ceo_name = models.CharField(max_length=50)
    field = models.CharField(max_length=50)
    activity_description = models.CharField(max_length=50)
