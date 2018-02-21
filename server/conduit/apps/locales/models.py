from django.db import models
from conduit.apps.core.models import TimestampedModel


class Local(models.Model):
    id_local= models.TextField(max_length=25, primary_key=True, unique=True)
    nombre= models.TextField(max_length=25)
    telefono= models.TextField(max_length=9)
    direccion= models.TextField(max_length=55)
    poblacion= models.TextField(max_length=55)
    provincia= models.TextField(max_length=55)
    latitud= models.TextField(max_length=255)
    longitud= models.TextField(max_length=255) 
    foto= models.TextField(max_length=255) 
    categoria= models.TextField(max_length=55) 

class Producto(TimestampedModel):
    nombre = models.CharField(max_length=30)
    foto = models.CharField(max_length=255)
    descripcion = models.CharField(max_length=255)
    price = models.FloatField()
    local = models.ForeignKey( 'locales.Local', related_name='producto', on_delete=models.CASCADE)