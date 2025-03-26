from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User, AbstractBaseUser, UserManager
from django.contrib.auth.password_validation import validate_password

User = get_user_model()

'''class RegistrationForm(UserCreationForm):
    # email = forms.EmailField(required=True)

    class Meta:
        Model = User
        # Fields = ["username", "email", "password1", "password2"]
        Fields = ["username", "password1", "password2"]
'''

'''
class UserRegistrationForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput, validators=[validate_password])

    class Meta:
        model = User
        fields = ['username', 'password']

    def clean_username(self):
        username = self.cleaned_data['username']
        if User.objects.filter(username=username).exists():
            raise forms.ValidationError("This username is already taken.")
        return username
'''