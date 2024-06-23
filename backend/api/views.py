import json
from rest_framework import status 
from rest_framework.authentication import authenticate
from rest_framework.authtoken.models import Token  
from rest_framework.response import Response   
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.db.utils import IntegrityError

from .models import Employer, Employee, Department, Role, CareerTimestamp
from .serializers import EmployerAdminSerializer, EmployerAdminRegistrationSerializer, EmployerSerializer, EmployerRegistrationSerializer, EmployeeSerializer, DepartmentSerializer, RoleSerializer, CareerTimestampSerializer

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

@api_view(['POST'])
def register_employer(request):
   """
   endpoint : POST /employer/register
   expects : employer-admin credentials and partial/complete employer details (JSON)
   onSuccess : returns employer details (with nested employer-admin) and auth token on successful registration (JSON
   onError : returns error message on failed registration (JSON)
   """
   data = json.loads(request.body)
   print(data)
   adminSerializer = EmployerAdminRegistrationSerializer(data=data.get('employer-admin'))
   employerSerializer = EmployerRegistrationSerializer(data=data.get('employer'))
   if not adminSerializer.is_valid():
      return Response({"error": "registration failed", "details": {"employer-admin": adminSerializer.errors}}, status=status.HTTP_400_BAD_REQUEST)
   if not employerSerializer.is_valid():
      return Response({"error": "registration failed", "details": {"employer": employerSerializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

   admin = adminSerializer.save()
   admin.set_password(data.get('employer-admin').get('password'))
   admin.save()
   token, created = Token.objects.get_or_create(user=admin)      

   employer = employerSerializer.save()
   employer.administrator = admin
   employer.save()
   employerSerializer = EmployerSerializer(instance=employer)

   return Response({"message": "registration successful", "employer": employerSerializer.data, "token": token.key}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def login_employer(request):
   """
   endpoint : POST /employer/login
   expects : employer-admin credentials  (JSON)
   onSuccess : returns employer details (with nested employer-admin) and auth token on successful login (JSON)
   onError : returns error message on failed login (JSON)
   """
   data = json.loads(request.body)
   username = data.get('username')   
   password = data.get('password')   

   employerAdmin = authenticate(request, username=username, password=password)
   if employerAdmin is None:
      return Response({"error": "login failed", "details": "incorrect credentials"}, status=status.HTTP_400_BAD_REQUEST)

   token, created = Token.objects.get_or_create(user=employerAdmin)
   employerSerializer = EmployerSerializer(instance=employerAdmin.employer)
   return Response({"employer": employerSerializer.data, "token": token.key})

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def patch_employer(request):
   """
   endpoint : PATCH /employer
   expects : partial/complete employer and employer-admin details as well as auth token in request headers (JSON)
   onSuccess : returns updated employer details (with nested employer-admin) on successful patch (JSON)
   onError : returns error message on failed patch (JSON)
   """
   data = json.loads(request.body)
   print(data)
   admin = request.user 
   adminSerializer = EmployerAdminRegistrationSerializer(instance=admin, data=data.get('employer-admin', {}), partial=True)
   employerSerializer = EmployerRegistrationSerializer(instance=admin.employer, data=data.get('employer', {}), partial=True)
   if not adminSerializer.is_valid():
      return Response({"error": "patch failed", "details": {"employer-admin": adminSerializer.errors}}, status=status.HTTP_400_BAD_REQUEST)
   if not employerSerializer.is_valid():
      return Response({"error": "patch failed", "details": {"employer": employerSerializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

   admin = adminSerializer.save()
   if data.get('employer-admin', {}).get('password', None):
      admin.set_password(data.get('employer-admin').get('password'))
      admin.save()

   employer = employerSerializer.save()
   employerSerializer = EmployerSerializer(instance=employer)

   return Response({"message": "patch successful", "employer": employerSerializer.data}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def logout_employer(request):
   """
   endpoint : POST /employer/logout
   expects : auth token in request headers
   onSuccess : returns success message (JSON)
   onError : returns error message (JSON)
   """
   try:
      token = request.auth
      token.delete()
   except:
      return Response("error logging out", status=status.HTTP_400_BAD_REQUEST)
   return Response("successfully logged out")

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def add_employees(request):
   """
   endpoint : POST /employees
   expects : a list of one or more employees's partial/complete details for adding to an employers list of employees as well as an auth token in request headers (JSON)
   onSuccess : returns a success message and number of employees added on successful upload (JSON)
   onError : returns an error message on failed upload (JSON)
   """ 
   data = json.loads(request.body)
   employer = request.user.employer
   return Response(data)




