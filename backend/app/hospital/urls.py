from django.urls import include, path

from rest_framework.routers import DefaultRouter
from rest_framework import routers

from .views import ActionHistoryAPIView, StatisticAPIView, \
                     email_activate, PatientAPIView

router = routers.SimpleRouter()
router.register("patients", PatientAPIView)
router.register("actionHistory", ActionHistoryAPIView)

urlpatterns = [
    path("users/activate/<str:uid>/<str:token>", email_activate),
    path('', include(router.urls), name="router_urls"),

    path('statistic', StatisticAPIView.as_view())
]
