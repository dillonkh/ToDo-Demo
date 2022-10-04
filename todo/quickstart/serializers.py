from django.contrib.auth.models import User, Group
from rest_framework import serializers

from todo.quickstart.models import ToDoItem


class UserSerializer(serializers.HyperlinkedModelSerializer):
    password = serializers.CharField(
          min_length=6, write_only=True, required=True)
    def create(self, options):
          username = options["username"]
          password = options["password"]
          email = options["email"]
          first_name = options["first_name"]
          last_name = options["last_name"]
          return User.objects.create_superuser(
            username=username, 
            password=password, 
            email=email, 
            first_name=first_name, 
            last_name=last_name
          )

    class Meta:
        model = User
        fields = ['id', 'url', 'username', 'email', 'groups', 'password', 'first_name', 'last_name']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class ToDoItemSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = ToDoItem
    fields = [
      'url',
      'status',
      'description',
      'todo_by',
      'completed_at',
      'created_ts',
      'updated_ts',
      'user_id'
    ]
    