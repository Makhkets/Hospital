from django.urls import include, path

from rest_framework.routers import DefaultRouter
from rest_framework import routers

from .views import ActionHistoryAPIView, StatisticAPIView, VisitAPIView, \
                     email_activate, PatientAPIView

router = routers.SimpleRouter()
router.register("patients", PatientAPIView)
router.register("actionHistory", ActionHistoryAPIView)
router.register("visitor", VisitAPIView)

urlpatterns = [
    path('', include(router.urls), name="router_urls"),

    path("users/activate/<str:uid>/<str:token>", email_activate),
    path('statistic', StatisticAPIView.as_view()),
]
