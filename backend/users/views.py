'''
from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password

class UserCreationAPIView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        try:
            validate_password(password)  # Ensure password is strong
            if User.objects.filter(username=username).exists():
                return Response({"error": "Username already exists"}, status=400)
            user = User.objects.create_user(username=username, password=password)
            return Response({"username": user.username}, status=201)
        except ValidationError as e:
            return Response({"error": e.messages}, status=400)
'''

from univork.settings import BASE_DIR

from django.shortcuts import render
from django.http import HttpResponse
import os

'''def create_employer_account(request):
    return render(request, "src/components/SignupEmployer.js")

def create_student_account(request):
    return render(request, "src/components/SignupForm.js")'''

def create_employer_account(request):
    js_file_path = os.path.join(BASE_DIR, '..', 'src', 'pages', 'SignupEmployer.js')

    with open(js_file_path, 'r') as file:
        js_content = file.read()

    return HttpResponse(js_content, content_type="application/javascript")

def create_student_account(request):
    # js_file_path = os.path.join('..', '..', 'src', 'pages', 'SignupForm.js')
    js_file_path = os.path.join(BASE_DIR, '..', 'src', 'pages', 'SignupForm.js')

    with open(js_file_path, 'r') as file:
        js_content = file.read()

    return HttpResponse(js_content, content_type="application/javascript")