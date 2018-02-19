from django.conf.urls import url
from .views import (
    CheckoutAPIView
)

urlpatterns = [
    url(r'^checkout/?$', CheckoutAPIView.as_view()),
]