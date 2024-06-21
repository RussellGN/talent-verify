from rest_framework.response import Response   
from rest_framework.decorators import api_view

@api_view(['GET'])
def endpoints(request):
   api_endpoints = [
      {
         "endpoint" : "GET /",
         "onSuccess" : "returns a list of all api endpoints and their documentation (JSON)",
      },
      {
         "endpoint" : "GET /employer/(ID)",
         "onSuccess" : "returns details of employer with given ID if found (JSON)",
         "onError" : "returns error message if employer not found (JSON)",
      }, 
      {
         "endpoint" : "POST /employer/register",
         "expects" : "employer details (JSON)",
         "onSuccess" : "returns employer details and auth token on successful registration (JSON)",
         "onError" : "returns error message on failed registration (JSON)",
      }, 
      {
         "endpoint" : "POST /employer/login",
         "expects" : "employer email and passkey (JSON)",
         "onSuccess" : "returns employer details and auth token on successful login (JSON)",
         "onError" : "returns error message on failed login (JSON)",
      }, 
      {
         "endpoint" : "PATCH /employer",
         "expects" : "partial/complete employer details and auth token assigned to employer (JSON)",
         "onSuccess" : "returns updated employer details and auth token on successful patch (JSON)",
         "onError" : "returns error message on failed patch (JSON)",
      }, 
      {
         "endpoint" : "POST /employer/logout",
         "expects" : "auth token (JSON)",
         "onSuccess" : "returns success message (JSON)",
         "onError" : "returns error message (JSON)",
      }, 
      {
         "endpoint" : "GET /employees",
         "expects" : "a query object used to filter the employees retrieved (JSON)",
         "onSuccess" : "returns a list of zero or more employees matching the query criteria (JSON)",
         "onError" : "returns an error message if the query object is of incorrect shape (JSON)",
      }, 
      {
         "endpoint" : "POST /employees",
         "expects" : "an auth token and a list of one or more employees for adding to an employers list of employees (JSON)",
         "onSuccess" : "returns a success message and number of employees added on successful upload (JSON)",
         "onError" : "returns an error message on failed upload (JSON)",
      }, 
      {
         "endpoint" : "PATCH /employees",
         "expects" : "an auth token and a list of one or more employees's partial/complete details for updating (JSON)",
         "onSuccess" : "returns a success message and number of employees updated on successful patch (JSON)",
         "onError" : "returns an error message on failed patch (JSON)",
      }
   ]
   return Response(api_endpoints)
