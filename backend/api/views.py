# api/views.py
from rest_framework.permissions import IsAuthenticated, AllowAny 
from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView
from rest_framework.authtoken.views import ObtainAuthToken
from . serializers import StudentSerializer, StudentProfileSerializer, EmployerProfileSerializer, EmployerSerializer, UserSerializer
from rest_framework.authtoken.models import Token
from . models import StudentProfile, EmployerProfile, User
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status

class StudentCreateView(CreateAPIView):
    """
    A class for the API endpoint for registration
    Handles POST requests to create new users
    """
    serializer_class = StudentSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        """
        Overrided the post method to automatically log in the user after the register
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        login = Login()
        return login.post(request=request)

class EmployerCreateView(CreateAPIView):
    """
    A class for the API endpoint for registration
    Handles POST requests to create new users
    """
    serializer_class = EmployerSerializer
    permission_classes = [AllowAny]
    #TODO: Override the post method for employers so that they are also logged in after account creation
    def post(self, request, *args, **kwargs):
        """
        Overrided the post method to automatically log in the user after the register
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        login = Login()
        return login.post(request=request)

class StudentProfileCreateView(CreateAPIView):
    """
    A class for creating new student profiles, handles POST requests
    NOTE: This class is likely unnecessary as the frontend does not need to create Student profiles, they're created automatically during registration
    """
    serializer_class = StudentProfileSerializer
    permission_classes = [AllowAny]

class EmployerProfileCreateView(CreateAPIView):
    """
    A class for creating new employer profiles, handles POST requests
    NOTE: This class is likely unnecessary as the frontend does not need to create employer profiles, they're created automatically during registration
    """
    serializer_class = StudentProfileSerializer
    permission_classes = [AllowAny]

class StudentProfileEditView(RetrieveUpdateAPIView):
    """
    A class for the API endpoint to edit existing student profiles
    Handles PUT requests
    """
    serializer_class = StudentProfileSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'user'

    def get_queryset(self):
        print(self.request)
        print(self.request.user)
        user=self.request.user
        return User.objects.get(username=user.username)

class EmployerProfileEditView(RetrieveUpdateAPIView):
    """
    A class for the API endpoint to edit existing employer profiles
    Handles PUT requests
    """
    queryset = User.objects.filter(role="employer")
    serializer_class = EmployerProfileSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'user'

class Login(ObtainAuthToken):
    """
    A class for the API endpoint to log in new users
    """
    def post(self, request, *args, **kwargs):
        """
        Overrided the post method to return information about the user, in addition to the token
        """
        serializer = self.serializer_class(data=request.data,context={'request': request})

        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': UserSerializer(user).data
        })