from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


# Create your views here.

from .serializers import NoteSerializer
from status.models import Note

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def statuses(request):
    if request.method == "GET":
        user = request.user
        notes = Note.objects.exclude(user=user).order_by("-id")[:10]
        #notes = user.note_set.all()
        serializer = NoteSerializer(notes,many=True)
        return Response(serializer.data)

    if request.method == "POST":
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data["user"] = request.user
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)