
from conduit.apps.core.renderers import ConduitJSONRenderer

class ProductoJSONRenderer(ConduitJSONRenderer):
    object_label = 'producto'
    pagination_object_label = 'productos'
    pagination_count_label = 'productosCount'