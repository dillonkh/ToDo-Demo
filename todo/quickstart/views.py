from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from todo.quickstart.models import ToDoItem
from todo.quickstart.serializers import UserSerializer, GroupSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

# class ToDoItemViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows ToDoItems to be viewed or edited.
#     """
#     queryset = ToDoItem.objects.all()
#     serializer_class = ToDoItemSerializer
#     permission_classes = [permissions.IsAuthenticated]
