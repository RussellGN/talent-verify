from datetime import datetime, date
import json

from django.db.models import Q
from rest_framework import status 
from rest_framework.authentication import authenticate
from rest_framework.authtoken.models import Token  
from rest_framework.response import Response   
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated

from .models import Employer, Employee, Department, Role, CareerTimestamp
from .serializers import DepartmentSerializer, EmployerAdminRegistrationSerializer, EmployerSerializer, EmployerRegistrationSerializer, HistoricalCareerTimestampSerializer, CompactEmployeeSerializer
from .utils import get_latest_career_timestamp

@api_view(['GET'])
def endpoints(request):
   api_endpoints = [
      {
         "endpoint" : "GET /",
         "onSuccess" : "returns a list of all api endpoints and their documentation (JSON)",
      },
      {
         "endpoint" : "GET /employer",
         "expects": "auth token in request headers",
         "onError" : "returns error message if employer not found (JSON)",
         "onSuccess" : """onSuccess : returns details of employer and list of employees for employer assigned with auth token in request headers (JSON)
            {
               employer: {id, administrator: {username, password}, name, email, registration_number, registration_date, address, contact_person, number_of_employees, contact_phone, departments: [string]}

               employees : [{id, national_id, name, employee_id, employer, department, role, duties, date_started, date_left}]
            }
            """
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
         "onError" : "returns error message on failed login (JSON)",
         "onSuccess" : """returns employer details (with nested employer-admin), list of employees and auth token on successful login (JSON)
            {
            token: string

            employer: {id, administrator: {username, password}, name, email, registration_number, registration_date, address, contact_person, number_of_employees, contact_phone, departments: [string]}

            employees : [{id, national_id, name, employee_id, employer, department, role, duties, date_started, date_left}]
            }
            """

      }, 
      {
         "endpoint" : "PATCH /employer/update",
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
         "endpoint" : "POST /employees",
         "expects" : "a list of one or more employees's partial/complete details for adding to an employers list of employees as well as an auth token in request headers (JSON)",
         "onSuccess" : "returns a list of employees added if successful (JSON)",
         "onError" : "returns an error message if unsuccessful (JSON)",
      }, 
      {
         "endpoint" : "PATCH /employees",
         "expects" : "a list of one or more employees's partial/complete details for updating as well as an auth token in request headers (JSON)",
         "onSuccess" : "returns a list of updated employees if successful (JSON)",
         "onError" : "returns an error message on failed patch (JSON)",
      },
      {
         "endpoint" : "GET /employees",
         "expects" : "expects an auth token in request headers  (JSON)",
         "onSuccess" : "returns a list of zero or more employees belonging to an employer (JSON)",
         "onError" : "returns an error message if unsuccessfull (JSON)",
      }, 
      {
         "endpoint" : "POST /employees/reassign",
         "expects" : "the id of the employee to reassign and employer id (if any) to reassign employee to, along with an auth token in request headers (JSON)",
         "onSuccess" : "returns a success message (JSON)",
         "onError" : "returns an error message (JSON)",
      }, 
      {
         "endpoint" : "GET /talent?query=(query),is_date=(is_date)",
         "expects" : "'query' and optional 'is_date' search parameters used to filter the employees retrieved (JSON)",
         "onSuccess" : "returns a list of zero or more employees matching the query criteria (JSON)",
      },
      {
         "endpoint": "GET /talent/(ID)",
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
   endpoint : GET /employer
   expects: auth token in request headers
   onError : returns error message if employer not found (JSON)
   onSuccess : returns details of employer and list of employees for employer assigned with auth token in request headers (JSON)
      {
         employer: {id, administrator: {username, password}, name, email, registration_number, registration_date, address, contact_person, number_of_employees, contact_phone, departments: [string]}

         employees : [{id, national_id, name, employee_id, employer, department, role, duties, date_started, date_left}]
      }
   """
   employer = request.user.employer
   employees = employer.employee_set.all()
   latest_career_timestamps = [get_latest_career_timestamp(employee) for employee in employees]
   employer_serializer = EmployerSerializer(employer)
   compact_employee_serializer = CompactEmployeeSerializer(latest_career_timestamps, many=True)
   return Response({'employer': employer_serializer.data, 'employees': compact_employee_serializer.data})

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
   department_list = data.get('departments', [])
   department_list.append('general') 
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

   dep_errors = []
   if department_list:
      for dep in department_list:
         if not Department.objects.filter(name=dep, employer=employer).exists():
            depSerializer = DepartmentSerializer(data={'name': dep})
            if not depSerializer.is_valid():
               dep_errors.append(depSerializer.errors)
            else:
               dep = depSerializer.save()
               dep.employer = employer
               dep.save()

   employerSerializer = EmployerSerializer(instance=employer)
   resData = {"message": "registration successful", "employer": employerSerializer.data, "token": token.key}
   resStatus = status.HTTP_201_CREATED
   if len(dep_errors) > 0:
      resData['departemnt_list_error'] = {'message': 'failed to create all departments provided', 'errors': dep_errors}
      resStatus = status.HTTP_207_MULTI_STATUS

   return Response(resData, status=resStatus)

@api_view(['POST'])
def login_employer(request):
   """
   endpoint : POST /employer/login
   expects : employer-admin credentials  (JSON)
   onError : returns error message on failed login (JSON)
   onSuccess : returns employer details (with nested employer-admin), list of employees and auth token on successful login (JSON)
      {
      token: string

      employer: {id, administrator: {username, password}, name, email, registration_number, registration_date, address, contact_person, number_of_employees, contact_phone, departments: [string]}

      employees : [{id, national_id, name, employee_id, employer, department, role, duties, date_started, date_left}]
      }
   """
   data = json.loads(request.body)
   username = data.get('username')   
   password = data.get('password')   

   employerAdmin = authenticate(request, username=username, password=password)
   if employerAdmin is None:
      return Response({"error": "login failed", "details": "incorrect credentials"}, status=status.HTTP_400_BAD_REQUEST)

   token, created = Token.objects.get_or_create(user=employerAdmin)
   employees = employerAdmin.employer.employee_set.all()
   latest_career_timestamps = [get_latest_career_timestamp(employee) for employee in employees]
   employer_serializer = EmployerSerializer(instance=employerAdmin.employer)
   compact_employee_serializer = CompactEmployeeSerializer(latest_career_timestamps, many=True)
   return Response({'employer': employer_serializer.data, 'employees': compact_employee_serializer.data, "token": token.key})

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def patch_employer(request):
   """
   endpoint : PATCH /employer/update
   expects : partial/complete employer and employer-admin details as well as auth token in request headers (JSON)
   onSuccess : returns updated employer details (with nested employer-admin) on successful patch (JSON)
   onError : returns error message on failed patch (JSON)
   """
   data = json.loads(request.body)
   print(data)
   new_department_list = data.get('departments', []) 
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

   dep_errors = []
   if new_department_list:
      for dep in new_department_list:
         if not Department.objects.filter(name=dep, employer=employer).exists():
            depSerializer = DepartmentSerializer(data={'name': dep})
            if not depSerializer.is_valid():
               dep_errors.append(depSerializer.errors)
            else:
               dep = depSerializer.save()
               dep.employer = employer
               dep.save()

   employerSerializer = EmployerSerializer(instance=employer)
   resData = {"message": "patch successful", "employer": employerSerializer.data}
   resStatus = status.HTTP_200_OK
   if len(dep_errors) > 0:
      resData['departemnt_list_error'] = {'message': 'failed to create all departments provided', 'errors': dep_errors}
      resStatus = status.HTTP_207_MULTI_STATUS

   return Response(resData, status=resStatus)

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

# for handle employees_____________
def get_employees(request):
   """
   endpoint : GET /employees
   expects : expects an auth token in request headers  (JSON)
   onSuccess : returns a list of zero or more employees belonging to an employer (JSON)
   onError : returns an error message if unsuccessfull (JSON)
   """
   employees = request.user.employer.employee_set.all()
   latest_career_timestamps = [get_latest_career_timestamp(employee) for employee in employees]
   compact_employee_serializer = CompactEmployeeSerializer(latest_career_timestamps, many=True)
   return Response(compact_employee_serializer.data)

def add_employees(request):
   """
   endpoint : POST /employees
   expects : a list of one or more employees's partial/complete details for adding to an employers list of employees as well as an auth token in request headers (JSON)
   onSuccess : returns a list of employees added and existing employees updated if successful (JSON)
   onError : returns an error message if unsuccessful (JSON)

   data = [{...employee}, {...employee}, {...employee}]
   employee = {name, national_id, employee_id, department_name, role_tile, role_duties, date_started, date_left}   
   """ 
   data = json.loads(request.body)
   print(data)
   employer = request.user.employer

   employees_added = []
   existing_employees_updated = []
   data_item = 1
   try:
      for item in data:
         # handle department
         department, created = Department.objects.get_or_create(name=item.get("department_name", "general"), employer=employer)

         # handle role
         role, created = Role.objects.update_or_create(title=item.get("role_title"), department=department, defaults={"duties": item.get("role_duties")})

         # handle employee
         employee, created_employee = Employee.objects.update_or_create(national_id=item.get("national_id"), defaults={"name": item.get("name"), "employee_id": item.get("employee_id"), "employer": employer})

         # handle career-timestamp
         career_timestamp, created = CareerTimestamp.objects.get_or_create(employee=employee, role=role, date_started=item.get("date_started"), date_left=item.get("date_left"))

         # increment counter and add to employeesAdded
         data_item += 1
         if created_employee:
            employees_added.append(career_timestamp)
         else:
            existing_employees_updated.append(career_timestamp)
   except Exception as e:
      status_to_use = status.HTTP_207_MULTI_STATUS if len(employees_added) else status.HTTP_400_BAD_REQUEST
      employees_added_serializer = CompactEmployeeSerializer(instance=employees_added, many=True)
      existing_employees_updated_serializer = CompactEmployeeSerializer(instance=existing_employees_updated, many=True)
      return Response({"error": f"failed to complete upload starting from data item #{data_item}", "details": f"{e}", "employees_added": employees_added_serializer.data, "existing_employees_updated":  existing_employees_updated_serializer.data }, status=status_to_use)

   employees_added_serializer = CompactEmployeeSerializer(instance=employees_added, many=True)
   existing_employees_updated_serializer = CompactEmployeeSerializer(instance=existing_employees_updated, many=True)
   return Response({"employees_added": employees_added_serializer.data, "existing_employees_updated":  existing_employees_updated_serializer.data }, status=status.HTTP_201_CREATED)

def update_employees(request):
   """
   endpoint : PATCH /employees
   expects : a list of one or more employees's partial/complete details for updating as well as an auth token in request headers (JSON)
   onSuccess : returns a list of updated employees if successful (JSON)
   onError : returns an error message on failed patch (JSON)

   data = [{...employee}, {...employee}, {...employee}]
   employee = {id, name, national_id, employee_id, department_name, role_tile, role_duties, date_started, date_left}   
   """ 
   data = json.loads(request.body)
   print(data)
   employer = request.user.employer

   employees_updated = []
   data_item = 1
   try:
      for item in data:
         # handle employee
         employee = Employee.objects.get(id=item.get("id"))
         if item.get("national_id"):
            employee.national_id = item.get("national_id")
         if item.get("name"):
            employee.name = item.get("name")
         if item.get("employee_id"):
            employee.employee_id = item.get("employee_id")
         employee.save()

         # handle department
         department, created = Department.objects.get_or_create(name=item.get("department_name", "general"), employer=employer)

         # handle role
         role, created = Role.objects.update_or_create(title=item.get("role_title"), department=department, defaults={"duties": item.get("role_duties")})

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
      employees_updated_serializer = CompactEmployeeSerializer(instance=employees_updated, many=True)
      return Response({"error": f"failed to complete updates starting from data item #{data_item}", "details": f"{e}", "employees_updated":  employees_updated_serializer.data }, status=status_to_use)

   employees_updated_serializer = CompactEmployeeSerializer(instance=employees_updated, many=True)
   return Response({"employees_updated": employees_updated_serializer.data}, status=status.HTTP_200_OK)
# _____________

@api_view(['GET', 'POST', 'PATCH'])
@permission_classes([IsAuthenticatedOrReadOnly])
@authentication_classes([TokenAuthentication])
def handle_employees(request):
   if (request.method == 'GET'):
      return get_employees(request)
   if (request.method == 'POST'):
      return add_employees(request)
   if (request.method == 'PATCH'):
      return update_employees(request)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def reassign_employee(request):
   """
   endpoint : POST /employees/reassign
   expects : the id of the employee to reassign and employer id (if any) to reassign employee to, along with an auth token in request headers (JSON)
   onSuccess : returns a success message (JSON)
   onError : returns an error message (JSON)
   """
   data = json.loads(request.body)
   employee = Employee.objects.get(id=int(data.get('employee_id')))
   current_employer = employee.employer
   re_assign_to = None
   if data.get('employer_id') is not None:
      employer_queryset = Employer.objects.filter(id=int(data.get('employer_id')))
      re_assign_to = employer_queryset.first() if employer_queryset.exists() else None

   employee.employer = re_assign_to
   employee.save()

   if current_employer is not None:
      incomplete_career_timestamps_at_current_employer = CareerTimestamp.objects.filter(employee=employee, role__department__employer=current_employer, date_left=None)
      for stamp in incomplete_career_timestamps_at_current_employer:
         stamp.date_left = date.today().isoformat()
         stamp.save()
   
   current_employer_name = current_employer.name if current_employer else "no employer"
   re_assigning_to = re_assign_to.name if re_assign_to else "no employer"
   return Response(f"successfully reassigned {employee.name} with id {employee.id} from '{current_employer_name}' to '{re_assigning_to}'")

@api_view(['GET'])
def get_talent(request):
   """
   endpoint : GET /talent?query=(query),is_date=(is_date)
   expects : 'query' and optional 'is_date' search parameters used to filter the employees retrieved (JSON)
   onSuccess : returns a list of zero or more employees matching the query criteria (JSON)
   """
   query = request.GET.get("query")
   is_date = request.GET.get("is_date")
   print(query, is_date)
   if not query or len(query) < 2:
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
   matched_career_timestamps = latest_career_timestamps.filter(filter_options)

   career_timestamp_serializer = CompactEmployeeSerializer(matched_career_timestamps, many=True)
   return Response(career_timestamp_serializer.data)

@api_view(['GET'])
def get_detailed_info_on_talent(request, id):
   """
   endpoint: GET /talent/(ID)
   onSuccess : returns details of talent with given ID if found (JSON)
   onError : returns an error message if talent not found (JSON)
   """   
   employment_history_timestamps = CareerTimestamp.objects.filter(employee__id=int(id)).order_by('id')
   latest_career_timestamp = employment_history_timestamps.last()

   talent_s_current_employment_serializer = CompactEmployeeSerializer(latest_career_timestamp)
   employment_history_serializer = HistoricalCareerTimestampSerializer(employment_history_timestamps, many=True)

   return Response({'talent': talent_s_current_employment_serializer.data, 'employment_history': employment_history_serializer.data})

