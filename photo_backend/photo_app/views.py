import pickle

import face_recognition
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from photo_app.models import Person


@csrf_exempt
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
