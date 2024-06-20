from rest_framework.response import Response   
from rest_framework.decorators import api_view

@api_view(['GET'])
def endpoints(request):
   url_endpoints = [
      {"GET /" : "no JSON data required"},
      {"GET /employer/(ID)" : "no JSON data required"},
      {"POST /employer/register" : "accepts employer details (JSON)"},
      {"POST /employer/login" : "accepts employer email and passkey (JSON)"},
      {"PATCH /employer" : "accepts partial/complete employer details and auth token assigned to employer (JSON)"},
      {"POST /employer/logout" : "accepts auth token (JSON)"},
      {"GET /workers" : "accepts a query object used to filter the workers retrieved (JSON)"},
      {"POST /workers" : "accepts an auth token and a list of one or more workers for adding to an employers list of employees (JSON)"},
      {"PATCH /workers" : "accepts an auth token and a list of one or more workers's partial/complete details for updating (JSON)"},
   ]
   return Response(url_endpoints)

