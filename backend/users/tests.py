'''
from django.test import TestCase

# Create your tests here.
from users.models import User
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password

class UserCreationTests(TestCase):
    def test_create_user_with_valid_password(self):
        password = "StrongP@ssw0rd!"
        validate_password(password)  # Should not raise a ValidationError
        user = User.objects.create_user(username="TestUser", password=password)
        self.assertEqual(user.username, "TestUser")
        self.assertTrue(user.check_password(password))

    def test_create_user_with_weak_password(self):
        with self.assertRaises(ValidationError):
            validate_password("weakpass")

    def test_unique_username(self):
        User.objects.create_user(username="UniqueUser", password="StrongP@ssw0rd!")
        with self.assertRaises(Exception):
            User.objects.create_user(username="UniqueUser", password="AnotherP@ssw0rd!")
'''