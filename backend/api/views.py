import json
from rest_framework import status 
from rest_framework.authtoken.models import Token  
from rest_framework.response import Response   
from rest_framework.decorators import api_view

from .models import Employer, Employee, Department, Role, CareerTimestamp
from .serializers import EmployerSerializer, EmployeeSerializer, DepartmentSerializer, RoleSerializer, CareerTimestampSerializer, EmployerRegistrationSerializer

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
         "expects" : "employer-admin credentials and partial/complete employer details (JSON)",
         "onSuccess" : "returns employer details (with nested employer-admin) and auth token on successful registration (JSON)",
         "onError" : "returns error message on failed registration (JSON)",
      }, 
      {
         "endpoint" : "POST /employer/login",
         "expects" : "employer-admin credentials  (JSON)",
         "onSuccess" : "returns employer details (with nested employer-admin) and auth token on successful login (JSON)",
         "onError" : "returns error message on failed login (JSON)",
      }, 
      {
         "endpoint" : "PATCH /employer",
         "expects" : "partial/complete employer and employer-admin details as well as auth token in request headers (JSON)",
         "onSuccess" : "returns updated employer details (with nested employer-admin) on successful patch (JSON)",
         "onError" : "returns error message on failed patch (JSON)",
      }, 
      {
         "endpoint" : "POST /employer/logout",
         "expects" : "auth token in request headers",
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
         "expects" : "a list of one or more employees's partial/complete details for adding to an employers list of employees as well as an auth token in request headers (JSON)",
         "onSuccess" : "returns a success message and number of employees added on successful upload (JSON)",
         "onError" : "returns an error message on failed upload (JSON)",
      }, 
      {
         "endpoint" : "PATCH /employees",
         "expects" : "a list of one or more employees's partial/complete details for updating as well as an auth token in request headers (JSON)",
         "onSuccess" : "returns a success message and number of employees updated on successful patch (JSON)",
         "onError" : "returns an error message on failed patch (JSON)",
      }
   ]
   return Response(api_endpoints)

@api_view(['GET'])
def get_employer(request, id):
   """
   endpoint : GET /employer/(ID)
   onSuccess : returns details of employer with given ID if found (JSON)
   onError : returns error message if employer not found (JSON)
   """
   employer = None
   try: 
      employer = Employer.objects.get(id=id)
   except Employer.DoesNotExist:
      return Response({"error": f"employer with id: {id} was not found"}, status=status.HTTP_404_NOT_FOUND)

   serializer = EmployerSerializer(employer, many=False)
   return Response(serializer.data)

