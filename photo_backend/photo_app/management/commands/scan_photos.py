import os
import pickle

import face_recognition
from django.core.management import BaseCommand

from photo_app.models import Person

path = 'photos/'


class Command(BaseCommand):
    def handle(self, *args, **options):
        for r, d, f in os.walk(path):
            for photo_name in f:
                image = face_recognition.load_image_file(os.path.join(r, photo_name))
                name = os.path.splitext(photo_name)[0]
                photo_encoding = face_recognition.face_encodings(image)[0]
                dumped_encoding = pickle.dumps(photo_encoding)
                Person.objects.create(name=name, photo_encoding=dumped_encoding).save()
                print(f'Photo {name} has been added to db')
