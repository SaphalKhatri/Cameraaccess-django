from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name', 
                 'address', 'phone', 'image', 'date_joined', 'is_active']
        extra_kwargs = {
            'password': {'write_only': True},
            'image': {'required': False},
            'id': {'read_only': True},
            'date_joined': {'read_only': True},
            'is_active': {'read_only': True}
        }
    
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = UserProfile(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        return user
