from django.core.exceptions import ValidationError
import re

class CustomPasswordValidator:
    def validate(self, password, user=None):
        if len(password) > 50:
            raise ValidationError("Password cannot be longer than 50 characters.")
        if not any(char.islower() for char in password):
            raise ValidationError("Password must contain at least one lowercase letter.")
        if not any(char.isupper() for char in password):
            raise ValidationError("Password must contain at least one uppercase letter.")
        if not any(char.isdigit() for char in password):
            raise ValidationError("Password must contain at least one number.")
        if not any(char in "!@#$%&?" for char in password):
            raise ValidationError("Password must contain at least one of the following special characters: "
                                  + "\"!\", \"@\", \"#\", \"$\", \"%\", \"&\", \"?\".")
        
    def get_help_text(self):
        return (
            "Your password must be 8-50 characters long and include at least one "
            "uppercase letter, one lowercase letter, one digit, and one special character (!, @, #, $, %, &, ?)."
        )
