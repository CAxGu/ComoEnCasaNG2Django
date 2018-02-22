from django.conf.urls import url, include

from rest_framework.routers import DefaultRouter

from .views import (
    LocalesViewSet,
    LocalCategoryList,
    ProductsListCreateAPIView,
    ProductsDestroyAPIView,
    SearchLocationAPIView
)


#APIREST_grafica_DRF
loc_list = LocalesViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
loc_detail = LocalesViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})


router = DefaultRouter(trailing_slash=False)
router.register(r'locales', LocalesViewSet)

urlpatterns = [
    url(r'^loclist/$', loc_list, name='loc_list'), #APIREST_grafica_DRF
    url(r'^locdetail/(?P<id_local>[0-9a-zA-Z_-]+)/$', loc_detail, name='loc_detail'), #APIREST_grafica_DRF
    url(r'^loccat/(?P<categoria>\D+)/$', LocalCategoryList.as_view()), #APIREST_grafica_DRF
    url(r'^locales/(?P<local_id>[-\w]+)/productos/?$', ProductsListCreateAPIView.as_view()),
    url(r'^locales/(?P<local_id>[-\w]+)/productos/(?P<producto_pk>[\d]+)/?$', ProductsDestroyAPIView.as_view()),
    url(r'^search/?$', SearchLocationAPIView.as_view()),
    
]
