from django.contrib.auth.models import User, Group
from rest_framework import serializers

from todo.quickstart.models import ToDoItem


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

# class ToDoItemSerializer(serializers.HyperlinkedModelSerializer):
#   class Meta:
#     model = ToDoItem
#     fields = [
#       'status',
#       'todo_by',
#       'completed_at',
#       'created_ts',
#       'updated_ts'
#     ]
    