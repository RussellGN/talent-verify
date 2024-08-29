from rest_framework.views import exception_handler as drf_exception_handler
from rest_framework.response import Response
from rest_framework import status

from .models import Employee, CareerTimestamp

def custom_exception_handler(exc, context):
    response = drf_exception_handler(exc, context)

    if response is not None:
        custom_response_data = {
            'error': str(exc)
        }
        response.data = custom_response_data
    else:
        response = Response({'error': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    return response
