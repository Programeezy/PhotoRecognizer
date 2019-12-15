import os

from PIL import Image, ImageDraw
import face_recognition


image = face_recognition.load_image_file('/home/tim/PhotoRecognizer/photo_backend/photos/Anton Belski.jpg')
face_landmarks_list = face_recognition.face_landmarks(image)

pil_image = Image.fromarray(image)

for face_landmarks in face_landmarks_list:
    pass
