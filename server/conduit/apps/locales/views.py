from rest_framework import status, viewsets, generics
from conduit.apps.locales.serializers import LocalSerializer, ProductoSerializer
from conduit.apps.locales.models import Local, Producto
from .renderers import ProductoJSONRenderer
from rest_framework.exceptions import NotFound
from rest_framework.permissions import (
    AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
)
from rest_framework.response import Response
from rest_framework.views import APIView
import json


class LocalesViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Local.objects.all()
    serializer_class = LocalSerializer
    lookup_field = 'id_local'
    


class LocalCategoryList(generics.ListCreateAPIView):
    """ List of all events by the same category """
    serializer_class = LocalSerializer

    def get_queryset(self):
        categoria = self.kwargs['categoria']
        return Local.objects.filter(categoria=categoria)


class ProductsListCreateAPIView(generics.ListCreateAPIView):
    lookup_field = 'local__id_local'
    lookup_url_kwarg = 'local_id'
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Producto.objects.select_related(
        'local' 
    )
    renderer_classes = (ProductoJSONRenderer,)
    serializer_class = ProductoSerializer

    def filter_queryset(self, queryset):
        # The built-in list function calls `filter_queryset`. Since we only
        # want comments for a specific article, this is a good place to do
        # that filtering.
        print('-----------------queryset')
        filters = {self.lookup_field: self.kwargs[self.lookup_url_kwarg]}
        print(filters)

        return queryset.filter(**filters)

    def create(self, request, local_id=None):
        data = request.data.get('producto', {})
        #context = {'author': request.user.profile}

        try:
            context['local'] = Local.objects.get(local_id=local_id)
        except Local.DoesNotExist:
            raise NotFound('An article with this slug does not exist.')

        serializer = self.serializer_class(data=data, context=context)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

class ProductsDestroyAPIView(generics.DestroyAPIView):
    lookup_url_kwarg = 'producto_pk'
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Producto.objects.all()

    def destroy(self, request, local_id=None, producto_pk=None):
        try:
            producto = Producto.objects.get(pk=producto_pk)
        except Producto.DoesNotExist:
            raise NotFound('A comment with this ID does not exist.')

        producto.delete()

        return Response(None, status=status.HTTP_204_NO_CONTENT)

class SearchLocationAPIView(generics.ListCreateAPIView):
    """
    API endpoint that allows locals to be finded by search.
    """
    permission_classes = (AllowAny,)

    def post(self, request):
        
        search = request.data.get('search', {})
        term = search.get('search')
        option = search.get('options')
        locals_in_db = Local.objects.all()
        

        if option=='localizacion':
            
            result=Local.objects.extra(where=['poblacion=%s OR provincia=%s'],params=[term,term])
            response_data = {'local':result.values(),'search':search}
            return Response(response_data, content_type="application/json", status=status.HTTP_201_CREATED) 

        elif option=='comida':

            resultComida = Producto.objects.filter(nombre__contains=term)
            locales=[]
            for producto in resultComida:
                idloc=producto.local_id 
                local=Local.objects.filter(id_local=idloc).values()
                locales.append(local[0])

            response_data = {'local':locales,'search':search}
            return Response(response_data, content_type="application/json", status=status.HTTP_201_CREATED)