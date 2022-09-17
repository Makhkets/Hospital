from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import email_activate

urlpatterns = [
    path("users/activate/<str:uid>/<str:token>", email_activate)
]
