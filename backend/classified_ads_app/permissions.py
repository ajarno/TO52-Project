from rest_framework.permissions import BasePermission, SAFE_METHODS


# Restriction for the visualization of the profile
class IsOwnerProfileOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.user == request.user


# Restriction for the visualization of the chats
class IsOwnerChatOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.sender == request.user or obj.receiver == request.user
