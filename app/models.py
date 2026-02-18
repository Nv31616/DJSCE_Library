from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=200)
    type = models.CharField(max_length=50)
    number = models.PositiveIntegerField()
    side = models.CharField(max_length=50)
    id = models.AutoField(primary_key=True)
    location_id = models.CharField(max_length=30)

    def __str__(self):
        return f"{self.title}"
    