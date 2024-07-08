from datetime import datetime, date
import json

from django.db.models import Q
from rest_framework import status 
from rest_framework.authentication import authenticate
from rest_framework.authtoken.models import Token  
from rest_framework.response import Response   
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from .utils import get_latest_career_timestamp
from .models import Employer, Employee, Department, Role, CareerTimestamp
from .serializers import EmployerAdminRegistrationSerializer, EmployerAdminPatchSerializer, EmployerRegistrationSerializer, EmployerSerializer, DepartmentSerializer, UnemployedTalentSerializer, EmployeeRetrievalSerializer, CareerTimestampSerializer 

@api_view(['GET'])
def endpoints(request):
   api_endpoints = [
      {
         "endpoint" : "GET /",
         "onSuccess" : "returns a list of all api endpoints and their documentation (JSON)",
      },
      {
         "endpoint" : "GET employer/",
         "expects": "auth token in request headers",
         "onSuccess" : "onSuccess : returns details of employer and list of employees for employer assigned with auth token in request headers (JSON)",
         "onError" : "returns error message if employer not found (JSON)",
      }, 
      {
         "endpoint" : "POST employer/register/",
         "expects" : "employer-admin credentials and partial/complete employer details (JSON)",
         "onSuccess" : "returns employer details (with nested employer-admin) and auth token on successful registration (JSON)",
         "onError" : "returns error message on failed registration (JSON)",
      }, 
      {
         "endpoint" : "POST employer/login/",
         "expects" : "employer-admin credentials  (JSON)",
         "onSuccess" : "returns employer details (with nested employer-admin), list of employees and auth token on successful login (JSON)",
         "onError" : "returns error message on failed login (JSON)",

      }, 
      {
         "endpoint" : "POST employer/logout/",
         "expects" : "auth token in request headers",
         "onSuccess" : "returns success message (JSON)",
         "onError" : "returns error message (JSON)",
      }, 
      {
         "endpoint" : "PATCH employer/update/",
         "expects" : "partial/complete employer and employer-admin details as well as auth token in request headers (JSON)",
         "onSuccess" : "returns updated employer details (with nested employer-admin) on successful patch (JSON)",
         "onError" : "returns error message on failed patch (JSON)",
      }, 
      {
         "endpoint" : "GET employees/",
         "expects" : "expects an auth token in request headers  (JSON)",
         "onSuccess" : "returns a list of zero or more employees belonging to an employer (JSON)",
         "onError" : "returns an error message if unsuccessfull (JSON)",
      }, 
      {
         "endpoint" : "POST employees/",
         "expects" : "a list of one or more employees's partial/complete details for adding to an employers list of employees as well as an auth token in request headers (JSON)",
         "onSuccess" : "returns a list of employees added if successful (JSON)",
         "onError" : "returns an error message if unsuccessful (JSON)",
      }, 
      {
         "endpoint" : "PATCH employees/",
         "expects" : "a list of one or more employees's partial/complete details for updating as well as an auth token in request headers (JSON)",
         "onSuccess" : "returns a list of updated employees if successful (JSON)",
         "onError" : "returns an error message on failed patch (JSON)",
      },
      {
         "endpoint" : "DELETE employees/(ID)/",
         "expects" : "the (ID) of the employee to remove, along with an auth token in request headers (JSON)",
         "onSuccess" : "returns a success message (JSON)",
         "onError" : "returns an error message (JSON)",
      }, 
      {
         "endpoint" : "GET talent?query=(query),is_date=(is_date)/",
         "expects" : "'query' and optional 'is_date' search parameters used to filter the employees retrieved (JSON)",
         "onSuccess" : "returns a list of zero or more employees matching the query criteria (JSON)",
      },
      {
         "endpoint": "GET talent/(ID)/",
         "onSuccess" : "returns details of talent with given ID if found (JSON)",
         "onError" : "returns an error message if talent not found (JSON)",
      }
   ]
   return Response(api_endpoints)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def get_employer(request):
   """
   endpoint : GET employer/
   expects: auth token in request headers
   onSuccess : returns details of employer and list of employees for employer assigned with auth token in request headers (JSON)
   onError : returns error message if employer not found (JSON)
   """
   employer = request.user.employer
   employees = employer.employee_set.all()
   latest_career_timestamps = [get_latest_career_timestamp(employee) for employee in employees]
   employer_serializer = EmployerSerializer(employer)
   employee_serializer = EmployeeRetrievalSerializer(latest_career_timestamps, many=True)
   return Response({'employer': employer_serializer.data, 'employees': employee_serializer.data})

@api_view(['POST'])
def register_employer(request):
   """
   endpoint : POST employer/register/
   expects : employer-admin credentials and partial/complete employer details (JSON)
   onSuccess : returns employer details (with nested employer-admin) and auth token on successful registration (JSON
   onError : returns error message on failed registration (JSON)
   """
   if not request.body:
      return Response(f"Error no registration data provided", status=status.HTTP_400_BAD_REQUEST)

   data = json.loads(request.body)
   department_list = data.get('departments', [])
   department_list.append('general') 
   admin_serializer = EmployerAdminRegistrationSerializer(data=data.get('employer-admin'))
   employer_serializer = EmployerRegistrationSerializer(data=data.get('employer'))
   if not admin_serializer.is_valid():
      return Response(f"Error, registration failed due to employer-admin details provided: {str(admin_serializer.errors)}", status=status.HTTP_400_BAD_REQUEST)
   if not employer_serializer.is_valid():
      return Response(f"Error, registration failed due to employer details provided: {str(employer_serializer.errors)}", status=status.HTTP_400_BAD_REQUEST)

   admin = admin_serializer.save()
   admin.set_password(data.get('employer-admin').get('password'))
   admin.save()
   token, created = Token.objects.get_or_create(user=admin)      

   employer = employer_serializer.save()
   employer.administrator = admin
   employer.save()

   dep_errors = []
   if department_list:
      for dep in department_list:
         if not Department.objects.filter(name=dep, employer=employer).exists():
            dep_serializer = DepartmentSerializer(data={'name': dep})
            if not dep_serializer.is_valid():
               dep_errors.append(dep_serializer.errors)
            else:
               dep = dep_serializer.save()
               dep.employer = employer
               dep.save()

   employer_serializer = EmployerSerializer(instance=employer)
   res_data = {"message": "registration successful", "employer": employer_serializer.data, "token": token.key}
   res_status = status.HTTP_201_CREATED
   if len(dep_errors) > 0:
      res_data['departemnt_list_error'] = {'message': 'failed to create all departments provided', 'errors': dep_errors}
      res_status = status.HTTP_207_MULTI_STATUS

   return Response(res_data, status=res_status)

@api_view(['POST'])
def login_employer(request):
   """
   endpoint : POST employer/login/
   expects : employer-admin credentials (JSON)
   onError : returns error message on failed login (JSON)
   onSuccess : returns employer details (with nested employer-admin), list of employees and auth token on successful login (JSON)
   """
   if not request.body:
      return Response(f"Error no registration data provided", status=status.HTTP_400_BAD_REQUEST)

   data = json.loads(request.body)
   username = data.get('username')   
   password = data.get('password')   

   employer_admin = authenticate(request, username=username, password=password)
   if employer_admin is None:
      return Response("Login failed. Incorrect credentials", status=status.HTTP_400_BAD_REQUEST)

   token, created = Token.objects.get_or_create(user=employer_admin)
   employees = employer_admin.employer.employee_set.all()
   latest_career_timestamps = [get_latest_career_timestamp(employee) for employee in employees]
   employer_serializer = EmployerSerializer(instance=employer_admin.employer)
   employee_serializer = EmployeeRetrievalSerializer(latest_career_timestamps, many=True)
   return Response({'employer': employer_serializer.data, 'employees': employee_serializer.data, "token": token.key})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def logout_employer(request):
   """
   endpoint : POST employer/logout/
   expects : auth token in request headers
   onSuccess : returns success message (JSON)
   onError : returns error message (JSON)
   """
   try:
      token = request.auth
      token.delete()
   except Exception as e:
      return Response(f"Error logging out: {e}", status=status.HTTP_400_BAD_REQUEST)
   return Response("successfully logged out")

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def patch_employer(request):
   """
   endpoint : PATCH employer/update/
   expects : partial/complete employer and employer-admin details as well as auth token in request headers (JSON)
   onSuccess : returns updated employer details (with nested employer-admin) on successful patch (JSON)
   onError : returns error message on failed patch (JSON)
   """
   data = json.loads(request.body)
   new_departments_list = data.get('departments', []) 
   admin = request.user 
   admin_serializer = EmployerAdminPatchSerializer(instance=admin, data=data.get('employer-admin', {}), partial=True)
   employer_serializer = EmployerRegistrationSerializer(instance=admin.employer, data=data.get('employer', {}), partial=True)
   if not admin_serializer.is_valid():
      return Response(f"Error, patch failed due to employer-admin details provided: {str(admin_serializer.errors)}", status=status.HTTP_400_BAD_REQUEST)
   if not employer_serializer.is_valid():
      return Response(f"Error, patch failed due to employer details provided: {str(employer_serializer.errors)}", status=status.HTTP_400_BAD_REQUEST)

   admin = admin_serializer.save()
   password = data.get('employer-admin', {}).get('password', None) 
   if password:
      admin.set_password(password)
      admin.save()

   employer = employer_serializer.save()

   dep_errors = []
   if new_departments_list:
      for dep in new_departments_list:
         if not Department.objects.filter(name=dep, employer=employer).exists():
            dep_serializer = DepartmentSerializer(data={'name': dep})
            if not dep_serializer.is_valid():
               dep_errors.append(dep_serializer.errors)
            else:
               dep = dep_serializer.save()
               dep.employer = employer
               dep.save()

   employer_serializer = EmployerSerializer(instance=employer)
   res_data = {"message": "patch successful", "employer": employer_serializer.data}
   res_status = status.HTTP_200_OK
   if len(dep_errors) > 0:
      res_data['departemnt_list_error'] = {'message': 'failed to create all departments provided', 'errors': dep_errors}
      res_status = status.HTTP_207_MULTI_STATUS

   return Response(res_data, status=res_status)

# for handle employees_____________
def get_employees(request):
   """
   endpoint : GET employees/
   expects : expects an auth token in request headers  (JSON)
   onSuccess : returns a list of zero or more employees belonging to an employer (JSON)
   onError : returns an error message if unsuccessfull (JSON)
   """
   employees = request.user.employer.employee_set.all()
   latest_career_timestamps = [get_latest_career_timestamp(employee) for employee in employees]
   employee_serializer = EmployeeRetrievalSerializer(latest_career_timestamps, many=True)
   return Response(employee_serializer.data)

def add_employees(request):
   """
   endpoint : POST employees/
   expects : a list of one or more employees's partial/complete details for adding to an employers list of employees as well as an auth token in request headers (JSON)
   onSuccess : returns a list of employees added and existing employees updated if successful (JSON)
   onError : returns an error message if unsuccessful (JSON)
   """ 
   data = json.loads(request.body)
   employer = request.user.employer

   employees_added = []
   existing_employees_updated = []
   data_item = 1
   try:
      for item in data:
         # handle employee
         national_id = item.get("national_id")
         if national_id:
            qs = Employee.objects.filter(national_id=national_id) 
            if qs.exists() and qs.first().employer and (qs.first().employer.id != employer.id):
               # this employee belongs to another employer, raise an error
               raise Exception(f"Employee with national ID '{national_id}' is currently listed by another employer '{qs.first().employer.name}'")
               
         employee, created_employee = Employee.objects.update_or_create(national_id=national_id, defaults={"name": item.get("name"), "employee_id": item.get("employee_id"), "employer": employer})

         # handle department
         department_name = item.get("department_name", "general")
         department, created = Department.objects.get_or_create(name=department_name, employer=employer)

         # handle role
         role_title = item.get("role_title", "general")
         role, created = Role.objects.update_or_create(title=role_title, department=department, defaults={"duties": item.get("role_duties")})

         # handle career-timestamp
         career_timestamp, created = CareerTimestamp.objects.get_or_create(employee=employee, role=role, date_started=item.get("date_started"), date_left=item.get("date_left"))

         # increment counter and add to employees_added
         data_item += 1
         if created_employee:
            employees_added.append(career_timestamp)
         else:
            existing_employees_updated.append(career_timestamp)
   except Exception as e:
      status_to_use = status.HTTP_207_MULTI_STATUS if len(employees_added) or len(existing_employees_updated) else status.HTTP_400_BAD_REQUEST
      employees_added_serializer = EmployeeRetrievalSerializer(instance=employees_added, many=True)
      existing_employees_updated_serializer = EmployeeRetrievalSerializer(instance=existing_employees_updated, many=True)
      return Response({"error": f"failed to complete upload starting from data item #{data_item}: {e}", "employees_added": employees_added_serializer.data, "existing_employees_updated":  existing_employees_updated_serializer.data }, status=status_to_use)

   employees_added_serializer = EmployeeRetrievalSerializer(instance=employees_added, many=True)
   existing_employees_updated_serializer = EmployeeRetrievalSerializer(instance=existing_employees_updated, many=True)
   return Response({"employees_added": employees_added_serializer.data, "existing_employees_updated":  existing_employees_updated_serializer.data }, status=status.HTTP_201_CREATED)

def update_employees(request):
   """
   endpoint : PATCH employees/
   expects : a list of one or more employees's partial/complete details for updating as well as an auth token in request headers (JSON)
   onSuccess : returns a list of updated employees if successful (JSON)
   onError : returns an error message on failed patch (JSON)
   """ 
   data = json.loads(request.body)
   employer = request.user.employer

   employees_updated = []
   data_item = 1
   try:
      for item in data:
         # handle employee
         employee = Employee.objects.get(id=item.get("id"))
         national_id = item.get("national_id")
         if national_id:
            qs = Employee.objects.filter(national_id=national_id) 
            if qs.exists() and qs.first().employer and (qs.first().employer.id != employer.id):
               # the edited national_id belongs to an employee of another employer, raise an error
               raise Exception(f"Employee with national ID '{national_id}' already exists and is currently listed by another employer '{qs.first().employer.name}'")

            employee.national_id = national_id
         if item.get("name"):
            employee.name = item.get("name")
         if item.get("employee_id"):
            employee.employee_id = item.get("employee_id")
         employee.save()

         # handle department
         department, created = Department.objects.get_or_create(name=item.get("department_name", "general"), employer=employer)

         # handle role
         role, created = Role.objects.update_or_create(title=item.get("role_title", "general"), department=department, defaults={"duties": item.get("role_duties")})

         # handle career-timestamp
         career_timestamp_queryset = CareerTimestamp.objects.filter(employee=employee, role=role)
         if career_timestamp_queryset.exists():
            career_timestamp = career_timestamp_queryset.first()
            if item.get("date_started"):
               career_timestamp.date_started = item.get("date_started")
            if item.get("date_left"):
               career_timestamp.date_left = item.get("date_left")
            career_timestamp.save()
         else:
            career_timestamp = CareerTimestamp.objects.create(employee=employee, role=role, date_started=item.get("date_started"), date_left=item.get("date_left"))

         data_item += 1
         employees_updated.append(career_timestamp)
   except Exception as e:
      status_to_use = status.HTTP_207_MULTI_STATUS if len(employees_updated) else status.HTTP_400_BAD_REQUEST
      employees_updated_serializer = EmployeeRetrievalSerializer(instance=employees_updated, many=True)
      return Response({"error": f"failed to complete updates starting from data item #{data_item}: {e}", "employees_updated":  employees_updated_serializer.data }, status=status_to_use)

   employees_updated_serializer = EmployeeRetrievalSerializer(instance=employees_updated, many=True)
   return Response({"employees_updated": employees_updated_serializer.data}, status=status.HTTP_200_OK)
# _____________

@api_view(['GET', 'POST', 'PATCH'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def handle_employees(request):
   if (request.method == 'GET'):
      return get_employees(request)
   if (request.method == 'POST'):
      return add_employees(request)
   if (request.method == 'PATCH'):
      return update_employees(request)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def remove_employee(request, id):
   """
   endpoint : DELETE employees/(ID)/
   expects : the (ID) of the employee to remove, along with an auth token in request headers (JSON)
   onSuccess : returns a success message (JSON)
   onError : returns an error message (JSON)
   """
   try:
      employee = Employee.objects.get(id=id)
      employee.employer = None
      employee.employee_id = None
      employee.save()

      incomplete_career_timestamps = CareerTimestamp.objects.filter(employee=employee, date_left=None)
      for stamp in incomplete_career_timestamps:
         stamp.date_left = date.today().isoformat()
         stamp.save()
      return Response(f"successfully removed {employee.name} with id {employee.id}")
   except Exception as e:
      return Response(f"encountered error removing employee with id {id}: {e}")

@api_view(['GET'])
def get_talent(request):
   """
   endpoint : GET talent?query=(query),is_date=(is_date)/
   expects : 'query' and optional 'is_date' search parameters used to filter the employees retrieved (JSON)
   onSuccess : returns a list of zero or more employees and a list of zero or more unemployed talent matching the query criteria (JSON)
   """
   query = request.GET.get("query")
   is_date = request.GET.get("is_date")
   if not query or len(query) < 3:
      return Response("query is too short", status=status.HTTP_400_BAD_REQUEST)

   filter_options = Q()
   if is_date is not None and str.lower(is_date).strip() == 'true':
      try:
         datetime.fromisoformat(query)
      except ValueError:
         return Response("unsupported date format, only ISO is supported", status=status.HTTP_400_BAD_REQUEST)
      filter_options |= Q(date_started=query) | Q(date_left=query)

   else:      
      filter_options |= (
         Q(employee__name__icontains=query) | 
         Q(employee__national_id__icontains=query) | 
         Q(employee__employer__name__icontains=query) | 
         Q(role__title__icontains=query) | 
         Q(role__department__name__icontains=query)
      )

   # the folllowing logic is very ugly and inneficient, find a better implementation
   all_employees = Employee.objects.all()
   latest_career_timestamps = []
   for employee in all_employees:
      career_timestamp = get_latest_career_timestamp(employee)
      latest_career_timestamps.append(career_timestamp)

   latest_career_timestamps = CareerTimestamp.objects.filter(
      id__in=[stamp.id for stamp in latest_career_timestamps]
   )
   matched_career_timestamps = latest_career_timestamps.filter(Q(employee__employer__isnull=False) & filter_options)
   matched_unemployed_talent = Employee.objects.filter(
      Q(employer__isnull=True) &
      Q(name__icontains=query) | 
      Q(national_id__icontains=query)
   )

   unemployed_talent_serializer = UnemployedTalentSerializer(matched_unemployed_talent, many=True)
   career_timestamp_serializer = EmployeeRetrievalSerializer(matched_career_timestamps, many=True)
   return Response({'employed' : career_timestamp_serializer.data, 'unemployed': unemployed_talent_serializer.data})

@api_view(['GET'])
def get_talent_info_and_employment_history(request, id):
   """
   endpoint: GET talent/(ID)/
   onSuccess : returns details of talent with given ID if found (JSON)
   onError : returns an error message if talent not found (JSON)
   """   
   employment_history_timestamps = CareerTimestamp.objects.filter(employee__id=int(id)).order_by('id')
   latest_career_timestamp = employment_history_timestamps.last()

   talent_s_current_employment_serializer = EmployeeRetrievalSerializer(latest_career_timestamp)
   employment_history_serializer = CareerTimestampSerializer(employment_history_timestamps, many=True)

   return Response({'talent': talent_s_current_employment_serializer.data, 'employment_history': employment_history_serializer.data})

