from django.db import models


class Job(models.Model):
    title = models.CharField(max_length=255)

    company = models.CharField(max_length=255)

    location = models.CharField(max_length=255)

    url = models.URLField(unique=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.title} - {self.company}"