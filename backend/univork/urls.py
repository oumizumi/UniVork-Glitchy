from django.urls import path, include
from . import views
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from users.views import create_employer_account, create_student_account
from . import views
from users import views

urlpatterns = [
    path('', views.create_employer_account, name='create_employer_account/'),
    path('', views.create_student_account, name='create_student_account/'),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('users/', include('users.urls')),
    # path('login', views.login),
    # path('signup', views.signup),
    # path('test_token', views.test_token),
]
