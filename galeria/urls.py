from django.urls import path
from galeria.views import test, imagem

urlpatterns = [
    path('', test, name='test'),
    path('imagem/<int:foto_id>', imagem, name='imagem'),
]
