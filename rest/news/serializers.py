from rest_framework import serializers
from .models import Story


class StoryListSerializer(serializers.ListSerializer):
    def create(self, validated_data):
        stories = [Story(**item) for item in validated_data]
        return Story.objects.bulk_create(stories)


class StorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Story
        fields = ('item_id', 'title', 'by', 'score', 'time', 'url')
        list_serializer_class = StoryListSerializer
