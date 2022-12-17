from rest_framework import serializers
from .models import ActionHistory, Visit, userProfile, Patient, CustomUser, Service

class userProfileSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    class Meta:
        model = userProfile
        fields = '__all__'

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = (
            '__all__'
        )

class ActionHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ActionHistory
        fields = (
            '__all__'
        )

class VisitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visit
        fields = (
            '__all__'
        )

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = (
            '__all__'
        )

class ServiceSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()
    
    class Meta:
        model = Service
        fields = (
            '__all__'
        )