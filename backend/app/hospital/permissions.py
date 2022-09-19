from rest_framework.permissions import BasePermission,SAFE_METHODS

from .models import USER

import jwt

def decode_jwt(token):
    ''' Расшифровка JWT '''
    return jwt.decode(token, options={"verify_signature": False})

class IsOwnerProfileOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.user==request.user

class ActionPermissionClassesMixin(object):
    def get_permissions(self):
        """
        Позволяет указать свои разрешения на каждое действие
        """
        if self.action_permission_classes and self.action in self.action_permission_classes:
            permissions = self.action_permission_classes[self.action]
            return [permission() for permission in permissions]
        return super(ActionPermissionClassesMixin, self).get_permissions()

class IsTokenAdminAuth(BasePermission):
    def has_permission(self, request, view):
        try:
            token = request.headers.get('Authorization').split("JWT ")[1]
            data = decode_jwt(token=token)
            user = USER.objects.get(pk=data["user_id"])
            if user.is_staff:
                return True
            return False
        except Exception as ex: 
            print(ex)
            return False
        