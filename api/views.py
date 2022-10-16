from tkinter import Menu
from webbrowser import get
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Todo
from .serializers import TodoSerializer

# Create your views here.

@api_view(["GET"])
def get_todos(request):
    todos = Todo.objects.all()
    serializer = TodoSerializer(todos, many=True)
    return Response(serializer.data)

@api_view(["PUT"])
def update_todo(request,id):
    todo = Todo.objects.get(id=id)
    serializer = TodoSerializer(todo, request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(["POST"])
def add_todo(request):
    todo = Todo.objects.create(**request.data)
    serializer = TodoSerializer(todo, many=False)
    return Response(serializer.data)

@api_view(["DELETE"])
def delete_todo(request,id):
    todo = Todo.objects.get(id=id)
    todo.delete()
    return Response("todo deleted")