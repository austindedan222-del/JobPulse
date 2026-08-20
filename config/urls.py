"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views.
"""
from django.contrib import admin
from django.urls import include, path
from jobs.views import home, job_detail_page


urlpatterns = [
    # Django administration
    path('admin/', admin.site.urls),
    # JobPulse homepage
    path('', home, name='home'),
    # Job API routes This includes the URLs defined in jobs/urls.py.
    path('', include('jobs.urls')),
    path("job/<int:pk>/", job_detail_page, name="job-detail-page"),
]