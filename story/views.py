import json
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, parser_classes, permission_classes
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.permissions import IsAuthenticated

from story.models import Story
from . import tasmia

from story.serializers import StorySerializer

# Create your views here.

@api_view(['POST','GET'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser, JSONParser])
def stories(request):
    
    if request.method == 'POST':
        serializer = StorySerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            serializer.validated_data["user"] = request.user
            imagename = json.dumps(serializer.validated_data["imagename"])
            serializer.save()
            tasmia.uploadToMinio(serializer.validated_data["storyimage"],serializer.validated_data["imagename"]) #Uncomment this line for minio
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'GET':
        user = request.user
        stories = Story.objects.exclude(user=user).order_by("-id")[:10]
        #notes = user.note_set.all()
        serializer = StorySerializer(stories,many=True)
        return Response(serializer.data)

    # if request.method == "POST":
    #     serializer = StorySerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.validated_data["user"] = request.user
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)