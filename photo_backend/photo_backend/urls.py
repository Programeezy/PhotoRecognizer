"""photo_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
import photo_app.views

from photo_app.views import CreateUserAPIView, LogoutUserAPIView

from photo_backend.photo_backend import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/upload_photo/', photo_app.views.upload_picture),
    path('api/search_history/', photo_app.views.user_search_results),
    path('api/premium_activate/', photo_app.views.user_premium_activate),
    path('auth/login/', obtain_auth_token, name='auth_user_login'),
    path('auth/register/', CreateUserAPIView.as_view(), name='auth_user_create'),
    path('auth/logout/', LogoutUserAPIView.as_view(), name='auth_user_logout')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
