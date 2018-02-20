from django.conf.urls import url

from .views import (
    LoginAPIView, RegistrationAPIView, RegistrationSOCIALAPIView, UserRetrieveUpdateAPIView
)

urlpatterns = [
    url(r'^user/?$', UserRetrieveUpdateAPIView.as_view()),
    url(r'^users/?$', RegistrationAPIView.as_view()),
    url(r'^users/login/?$', LoginAPIView.as_view()),
    url(r'^users/social/?$', RegistrationSOCIALAPIView.as_view())
]
