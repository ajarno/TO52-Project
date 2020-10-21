from rest_framework.permissions import BasePermission,SAFE_METHODS

#restriction de la consultation du profil 
class IsOwnerProfileOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.user==request.user

#restriction de la consultation de chats 
class IsOwnerChatOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.sender == request.user or obj.receiver == request.user