from django.urls import path
from . import views

urlpatterns = [
    path("get-todos", views.get_todos),
    path("update-todo/<id>", views.update_todo),
    path("add-todo", views.add_todo),
    path("delete-todo/<id>", views.delete_todo),
]