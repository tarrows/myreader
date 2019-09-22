from django.shortcuts import render
from rest_framework import viewsets

from .decorators import bulk_create
from .models import Story
from .serializers import StorySerializer
# Create your views here.

class StoryViewSet(viewsets.ModelViewSet):
    queryset = Story.objects.all()
    serializer_class = StorySerializer

    @bulk_create(serializer_class=StorySerializer)
    def create(self, request):
        pass
