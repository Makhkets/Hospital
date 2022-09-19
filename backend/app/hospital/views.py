from http.client import HTTPResponse
from rest_framework.generics import (ListCreateAPIView,RetrieveUpdateDestroyAPIView,)
from rest_framework.permissions import IsAuthenticated
from .models import Patient, userProfile
from .permissions import ActionPermissionClassesMixin, IsOwnerProfileOrReadOnly, IsTokenAdminAuth
from .serializers import userProfileSerializer

from django.http import HttpResponse
from django.shortcuts import redirect

from rest_framework import generics, viewsets
from rest_framework.decorators import action, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated,\
                                                IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import PatientSerializer


frontend_url = "http://127.0.0.1:3000"

class PatientAPIView(ActionPermissionClassesMixin, viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    action_permission_classes = {
                                                    'create': [IsTokenAdminAuth],
                                                    'retrieve': [IsTokenAdminAuth],
                                                    'list': [IsTokenAdminAuth],
                                                    'update': [IsTokenAdminAuth],
                                                    'partial_update': [IsTokenAdminAuth],
                                                    'destroy': [IsTokenAdminAuth],
                                }

class UserProfileListCreateView(ListCreateAPIView):
    queryset = userProfile.objects.all()
    serializer_class = userProfileSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)


class userProfileDetailView(RetrieveUpdateDestroyAPIView):
    queryset = userProfile.objects.all()
    serializer_class = userProfileSerializer
    permission_classes = [IsOwnerProfileOrReadOnly,IsAuthenticated]

def email_activate(request, uid, token):
    return redirect(f'{frontend_url}/activate/{uid}/{token}/')