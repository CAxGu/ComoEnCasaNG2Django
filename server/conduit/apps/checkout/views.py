from django.shortcuts import render
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.conf import settings
import stripe
from rest_framework import status
from conduit.apps.locales.models import Producto

# Create your views here.

class CheckoutAPIView(APIView):
    #permission_classes = (IsAuthenticated,)

    def post(self, request):
        stripe.api_key = settings.STRIPE_SECRET_KEY
        print('-----------------------')
        token = request.data.get('data',{}).get("stripeToken")
        cart = request.data.get('data',{}).get("cart")
        total = 0
        for product in cart:
            item = Producto.objects.get(id=product.get('id'))
            total += item.price
            print(item.nombre) 
        print(total)
        try:
            print('-----------------------------------------------')
            charge = stripe.Charge.create(
                amount=int(total*100),  # Amount in cents
                currency='usd',
                source=token,
                description='This is a test.',
            )
            print('-----------------------------------------------')
            return Response({'status': 'true'}, status=status.HTTP_200_OK)

        except stripe.error.CardError as ce:
            print('________ERROR_________')
            return Response({'status': 'true'}, status=status.HTTP_200_OK)
