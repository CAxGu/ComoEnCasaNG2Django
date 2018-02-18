from conduit.apps.locales.models import Local, Producto
from rest_framework import serializers


class LocalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Local
        fields = ('id_local','nombre','telefono','direccion','poblacion','provincia','latitud','longitud','foto','categoria')
    
class ProductoSerializer(serializers.ModelSerializer):
    createdAt = serializers.SerializerMethodField(method_name='get_created_at')
    updatedAt = serializers.SerializerMethodField(method_name='get_updated_at')

    class Meta:
        model = Producto
        fields = (
            'id',
            'nombre',
            'foto',
            'descripcion',
            'price',
            'createdAt',
            'updatedAt',
           )
    
    def create(self, validated_data):
        local = self.context['local'] 
       
        return Producto.objects.create(
            local=local, **validated_data
        )

    def get_created_at(self, instance):
        return instance.created_at.isoformat()

    def get_updated_at(self, instance):
        return instance.updated_at.isoformat()
