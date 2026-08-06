from rest_framework import generics
from rest_framework import filters
from .models import Job
from .serializers import JobSerializer


from rest_framework import generics, filters

from .models import Job
from .serializers import JobSerializer


class JobListAPIView(generics.ListAPIView):
    serializer_class = JobSerializer

    filter_backends = [
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    search_fields = [
        "title",
        "company",
        "location",
    ]

    ordering_fields = [
        "title",
        "company",
        "location",
        "created_at",
    ]

    def get_queryset(self):
        queryset = Job.objects.all().order_by("-created_at")

        location = self.request.query_params.get("location")

        if location:
            queryset = queryset.filter(location__icontains=location)

        return queryset


class JobDetailAPIView(generics.RetrieveAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

