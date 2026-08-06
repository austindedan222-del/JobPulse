from django.urls import path

from .views import JobListAPIView, JobDetailAPIView

urlpatterns = [
    path("jobs/", JobListAPIView.as_view(), name="job-list"),
    path("jobs/<int:pk>/", JobDetailAPIView.as_view(), name="job-detail"),
]