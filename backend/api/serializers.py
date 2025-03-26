# api/serializers.py
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from django.core.exceptions import ValidationError
from django.contrib.auth.models import Group

from . models import StudentProfile, EmployerProfile, User

class UserSerializer(serializers.ModelSerializer):
    """
    A class to serialize all users, regardless of their role
    Only used in Login view to serialize and return the user that just logged in
    Not intended for creating new users
    """
    class Meta:
        model = User
        fields = ['id','username', 'email', 'role']
        #All fields are read-only to prevent creating new users using this serializer
        read_only_fields = ['id','username', 'email', 'role']


class StudentSerializer(serializers.ModelSerializer):
    """
    A class for specifically serializing Student users

    ...
    Methods
    -------
    validate_email(self, value):
        Validates that the email address is a University of Ottawa email, raises serializer error otherwise
    
    validate_password(self, value):
        Validates the password
    
    def create(self, validated_data):
        Creates a new student user and a correscponding student profile 
    """
    class Meta:
        model = User
        fields = ['id','username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}
    
    def validate_email(self, value):
        if not value.endswith("@uottawa.ca"):
            raise serializers.ValidationError(str("Your email must be a uOttawa domain."))
        return value

    def validate_password(self, value):
        try:
            validate_password(value)  # Validate the password
        except ValidationError as e:
            raise serializers.ValidationError(str(e))
        return value

    def create(self, validated_data):
        user = User(username=validated_data['username'], email=validated_data['email'], role="student") 
        user.set_password(validated_data['password'])  # Hash the password
        user.save() #New user is saved into the database
        student_group, _ = Group.objects.get_or_create(name='student') 
        user.groups.add(student_group) #User is added to the auth group 'student'
        profile = StudentProfile(user=user,username=validated_data['username'], email=validated_data['email'])
        profile.save() #New profile is created for the user
        Token.objects.create(user=user) #New token is generated for the user
        return user

class PartialEmployerProfileSerilizer(serializers.ModelSerializer):
     """
     A class that only serializes the company name for new Employer accounts
     Only intended for use in Employer serializer, this is necessary to create a nested serializer
     """
     class Meta:
        model = EmployerProfile
        fields = ['company_name']

class EmployerSerializer(serializers.ModelSerializer):
    """
    Same idea as the StudentSerializer except creates employer accounts
    """
    employerProfile = PartialEmployerProfileSerilizer(many=False) #The nested serializer to obtain the employer's company name during account creation
    class Meta:
        model = User
        fields = ['id','username', 'email', 'password', 'employerProfile']
        extra_kwargs = {'password': {'write_only': True}}

    def validate_password(self, value):
        try:
            validate_password(value)  # Validate the password
        except ValidationError as e:
            raise serializers.ValidationError(str(e))
        return value

    def create(self, validated_data):
        user = User(username=validated_data['username'], email=validated_data['email'], role="employer")
        user.set_password(validated_data['password'])  # Hash the password
        user.save() #New employer account is saved in db
        employer_group, _ = Group.objects.get_or_create(name='employer')
        user.groups.add(employer_group) #New employer is added to the 'employer' auth group
        e_profile = EmployerProfile(user=user,username=validated_data['username'], email=validated_data['email'], company_name=validated_data['employerProfile']['company_name'])
        e_profile.save() #The employer's profile is created and saved in the database
        Token.objects.create(user=user) #New token is generated for the user
        return user



class StudentProfileSerializer(serializers.ModelSerializer):
    """
    A class to serialize all fields of student profiles
    """
    class Meta:
        model = StudentProfile
        fields = ['profile_picture', 'user', 'country', 'university', 'email', 'major', 'level', 'status', 'year',
                  'gpa', 'student_card', 'transcript', 'phone_number', 'home_address']


class EmployerProfileSerializer(serializers.ModelSerializer):
    """
    A class to serialize all fields of employer profiles
    """
    class Meta:
        model = EmployerProfile
        fields = ['company_name', 'ceo_name', 'field', 'activity_description']