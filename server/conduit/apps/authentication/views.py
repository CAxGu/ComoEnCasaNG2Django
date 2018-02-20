from rest_framework import status
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User
import json
from .renderers import UserJSONRenderer
from .serializers import (
    LoginSerializer, RegistrationSerializer, RegistrationSOCIALSerializer, UserSerializer
)


class RegistrationAPIView(APIView):
    # Allow any user (authenticated or not) to hit this endpoint.
    permission_classes = (AllowAny,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = RegistrationSerializer

    def post(self, request):
        user = request.data.get('user', {})

        print('hola estoy en el register normal y corriente')
        print('*******************  DATOS USUARIO   *********************') 
        print(user) 
        print('**********************************************************') 

        # The create serializer, validate serializer, save serializer pattern
        # below is common and you will see it a lot throughout this course and
        # your own work later on. Get familiar with it.
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)



class RegistrationSOCIALAPIView(APIView):
    # Allow any user (authenticated or not) to hit this endpoint.
    permission_classes = (AllowAny,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = RegistrationSOCIALSerializer

    def post(self, request):
        
        user = request.data.get('user', {})
        email = user.get('email')

        users_in_db = User.objects.all()
        result = users_in_db.filter(email=email)

        if result:
            
            result_email=user.get('email')
            result_token=User.objects.all().filter(email=email).first().token
            result_username=user.get('username')

            response_data = {'email':result_email,'token':result_token,'username':result_username}
            return Response(response_data, content_type="application/json", status=status.HTTP_201_CREATED)

        print('hola majos estoy en el servidor')
        print('*******************  DATOS USUARIO   *********************') 
        print(user.get('email'))   
        print(user.get('name')) 
        print(user.get('token')) 
        print(user.get('provider')) 
        print(user.get('uid')) 
        print(user.get('image')) 
        print(user.get('username'))  
        
        print('**********************************************************') 

        # The create serializer, validate serializer, save serializer pattern
        # below is common and you will see it a lot throughout this course and
        # your own work later on. Get familiar with it.
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        print('************** EL serializer .data es : *********************')
        print(serializer.data)
        print(json.dumps(serializer.data))

        # dtaa_json=json.dumps(serializer.data)
        # datauser = {'email':dtaa_json.email,'token':dtaa_json.token,'username':dtaa_json.username}

        print('************************ USER EN JSON ****************************')
        jsondata= json.dumps(serializer.data)
        print jsondata
        response_email=serializer.data.get('email')
        response_token=serializer.data.get('token')
        response_username=serializer.data.get('username')
        print '************************************************* asfasfasffsafa'

        print response_email
        print response_token
        print response_username

        response_data = {'email':response_email,'token':response_token,'username':response_username}

        print '***hola que tal*'
        print response_data


        # return JsonResponse({'email':serializer.data.get('email'),'token':serializer.data.get('token'),'username':serializer.data.get('username')})
        return Response(response_data, content_type="application/json", status=status.HTTP_201_CREATED)
        # return HttpResponse(json.dumps(response_data), status=status.HTTP_201_CREATED)



class LoginAPIView(APIView):
    permission_classes = (AllowAny,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = LoginSerializer

    def post(self, request):
        user = request.data.get('user', {})

        # Notice here that we do not call `serializer.save()` like we did for
        # the registration endpoint. This is because we don't actually have
        # anything to save. Instead, the `validate` method on our serializer
        # handles everything we need.
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class UserRetrieveUpdateAPIView(RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = UserSerializer

    def retrieve(self, request, *args, **kwargs):
        # There is nothing to validate or save here. Instead, we just want the
        # serializer to handle turning our `User` object into something that
        # can be JSONified and sent to the client.
        serializer = self.serializer_class(request.user)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        user_data = request.data.get('user', {})

        serializer_data = {
            'username': user_data.get('username', request.user.username),
            'email': user_data.get('email', request.user.email),

            'profile': {
                'bio': user_data.get('bio', request.user.profile.bio),
                'image': user_data.get('image', request.user.profile.image)
            }
        }

        # Here is that serialize, validate, save pattern we talked about
        # before.
        serializer = self.serializer_class(
            request.user, data=serializer_data, partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

