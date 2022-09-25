from rest_framework import serializers
from .models import ActionHistory, userProfile, Patient

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
        