from rest_framework.serializers import ModelSerializer
from story.models import Story

class StorySerializer(ModelSerializer):
    class Meta:
        model = Story
        fields = ['storyimage','imagename']