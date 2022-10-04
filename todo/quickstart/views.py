from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response
from todo.quickstart.models import ToDoItem
from todo.quickstart.serializers import ToDoItemSerializer, UserSerializer, GroupSerializer
from rest_framework.decorators import action


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    # permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['GET'], name='Get User By username')
    def find(self, request, *args, **kwargs):
        username = request.GET.get('username', '')
        queryset = User.objects.filter(username=username)

        serializer = self.get_serializer(queryset, many=True)
        if len(serializer.data):
            return Response(serializer.data[0])
        else:
            return Response({})


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

class ToDoItemViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows ToDoItems to be viewed or edited.
    """
    queryset = ToDoItem.objects.all()
    serializer_class = ToDoItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = self.queryset
        query_set = queryset.filter(user_id=self.request.user)
        return query_set
