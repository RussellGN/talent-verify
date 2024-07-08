from rest_framework import serializers
from .models import Employer, EmployerAdmin, Employee, Department, Role, CareerTimestamp

class EmployerAdminSerializer(serializers.ModelSerializer):
   class Meta:
      model = EmployerAdmin
      fields = ['id', 'username']

class EmployerAdminRegistrationSerializer(serializers.ModelSerializer):
   class Meta:
      model = EmployerAdmin
      fields = ['password', 'username']

class EmployerSerializer(serializers.ModelSerializer):
   administrator = EmployerAdminSerializer(many=False, read_only=True)
   departments = serializers.SerializerMethodField()
   class Meta:
      model = Employer
      fields = [
         'id',
         'administrator',
         'name',
         'email',
         'registration_number',
         'registration_date',
         'address',
         'contact_person',
         'number_of_employees',
         'contact_phone',
         'departments',
      ]

   def get_departments(self, obj):
      deps = obj.department_set.all() 
      depNames = [dep.name for dep in deps]
      return depNames

class EmployerRegistrationSerializer(serializers.ModelSerializer):
   class Meta:
      model = Employer
      fields = '__all__'

class DepartmentSerializer(serializers.ModelSerializer):
   employer = EmployerSerializer(many=False, read_only=True)
   class Meta:
      model = Department
      fields = '__all__'

class RoleSerializer(serializers.ModelSerializer):
   department = DepartmentSerializer(many=False, read_only=True)
   class Meta:
      model = Role
      fields = '__all__'

class UnemployedTalentSerializer(serializers.ModelSerializer):
   class Meta:
      model = Employee
      fields = ['id', 'name', 'national_id']

class EmployeeRetrievalSerializer(serializers.ModelSerializer):
   id = serializers.IntegerField(source='employee.id') 
   national_id = serializers.CharField(source='employee.national_id') 
   name = serializers.CharField(source='employee.name') 
   employee_id = serializers.CharField(source='employee.employee_id') 
   employer = serializers.SerializerMethodField() 
   department = serializers.SerializerMethodField() 
   role = serializers.SerializerMethodField() 
   duties = serializers.SerializerMethodField() 

   class Meta:
      model = CareerTimestamp
      fields = [
         'id',
         'national_id',
         'name',
         'employee_id',
         'employer',
         'department',
         'role',
         'duties',
         'date_started',
         'date_left',
      ]

   def get_employer(self, obj):
      if obj.employee and obj.employee.employer and obj.employee.employer.name is not None:
         return obj.employee.employer.name
      else: return None

   def get_department(self, obj):
      if obj.role and obj.role.department and obj.role.department.name is not None:
         return obj.role.department.name
      else: return None

   def get_role(self, obj):
      if obj.role and obj.role.title is not None:
         return obj.role.title
      else: return None

   def get_duties(self, obj):
      if obj.role and obj.role.duties is not None:
         return obj.role.duties
      else: return None

class CareerTimestampSerializer(serializers.ModelSerializer):
   employer = serializers.SerializerMethodField()
   department = serializers.SerializerMethodField()
   role = serializers.SerializerMethodField()
   duties = serializers.SerializerMethodField()

   class Meta:
      model = CareerTimestamp
      fields = [
         'id',
         'employer',
         'department',
         'role',
         'duties',
         'date_started',
         'date_left',
      ]

   def get_employer(self, obj):
      if obj.role and obj.role.department and obj.role.department.employer and obj.role.department.employer.name is not None:
         return obj.role.department.employer.name
      else: return None

   def get_department(self, obj):
      if obj.role and obj.role.department and obj.role.department.name is not None:
         return obj.role.department.name
      else: return None

   def get_role(self, obj):
      if obj.role and obj.role.title is not None:
         return obj.role.title
      else: return None

   def get_duties(self, obj):
      if obj.role and obj.role.duties is not None:
         return obj.role.duties
      else: return None

