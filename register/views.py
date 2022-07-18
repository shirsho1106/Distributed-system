from rest_framework import status
from rest_framework.response import Response
from .forms import NewUserForm
from django.contrib.auth import login
from django.contrib import messages
from rest_framework.decorators import api_view, permission_classes

@api_view(['POST'])
def register_request(request):
    form = NewUserForm(data=request.data)
    if form.is_valid():
        form.save()
        return Response(status=status.HTTP_201_CREATED)
    return Response(status=status.HTTP_400_BAD_REQUEST)