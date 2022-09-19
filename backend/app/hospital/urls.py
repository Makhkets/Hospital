from django.urls import include, path

from rest_framework.routers import DefaultRouter
from rest_framework import routers

from .views import email_activate, PatientAPIView

router = routers.SimpleRouter()
router.register("patients", PatientAPIView)

urlpatterns = [
    path("users/activate/<str:uid>/<str:token>", email_activate),
    path('', include(router.urls), name="router_urls"),
]
