import pickle

import face_recognition
from django.contrib.auth import get_user_model
from django.forms import model_to_dict
from django.http import JsonResponse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from photo_app.models import Person
from photo_app.serializers import CreateUserSerializer

from photo_backend.photo_backend.models import SearchResult


class CreateUserAPIView(CreateAPIView):
    serializer_class = CreateUserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        token = Token.objects.create(user=serializer.instance)
        token_data = {"token": token.key}
        return Response(
            {**serializer.data, **token_data},
            status=status.HTTP_201_CREATED,
            headers=headers
        )


class LogoutUserAPIView(APIView):
    queryset = get_user_model().objects.all()

    def get(self, request, format=None):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_picture(request):
    image = face_recognition.load_image_file(request.FILES['photo'])
    known_faces = [(l[0], pickle.loads(l[1])) for l in Person.objects.values_list('name', 'photo_encoding')]
    faces = [l[1] for l in known_faces]
    uploaded_faces = face_recognition.face_encodings(image)

    for uploaded_face in uploaded_faces:
        result = face_recognition.compare_faces(faces, uploaded_face, tolerance=0.5)
        try:
            match = result.index(True)
        except:
            match = None
        if match is not None:
            name = known_faces[match][0]
        else:
            name = 'Not recognized'
    if len(uploaded_faces) > 1:
        return JsonResponse({'Name': f'There are few faces on photo. {name}'})
    return JsonResponse({'Name': name})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_search_results(request):
    json_search_results_list = []
    search_results_by_user = SearchResult.objects.filter(user=request.user)

    for search_result in search_results_by_user:
        json_search_results_list.append(model_to_dict(search_result))

    return JsonResponse(json_search_results_list, safe=False)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_premium_activate(request):
    user = request.user
    user.is_premium = True
    user.save()

    return JsonResponse({})
