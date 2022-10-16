from django.db import models

# Create your models here.

class Todo(models.Model):
    text = models.CharField(max_length=256)
    is_complete = models.BooleanField()

    def __str__(self):
        return f"{self.text}: {self.is_complete}"