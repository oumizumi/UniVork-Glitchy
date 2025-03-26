from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password

User = get_user_model()

def create_user(username, password):

    if User.objects.filter(username=username).exists():
        raise ValueError("Username already exists.")
    
    try:
        validate_password(password)
    except ValidationError as e:
        raise ValueError("Password is invalid: {e}")
    
    user = User.objects.create_user(username=username, password=password)
    return user