from rest_framework.serializers import ModelSerializer

from .models import Employer, Employee, Department, Role, CareerTimestamp

class EmployerSerializer(ModelSerializer):
   class Meta:
      model = Employer
      fields = ['__all__']

class EmployeeSerializer(ModelSerializer):
   employer = EmployerSerializer(many=False, read_only=True)
   class Meta:
      model = Employee
      fields = ['__all__']

class DepartmentSerializer(ModelSerializer):
   employer = EmployerSerializer(many=False, read_only=True)
   class Meta:
      model = Department
      fields = ['__all__']

class RoleSerializer(ModelSerializer):
   department = DepartmentSerializer(many=False, read_only=True)
   class Meta:
      model = Role
      fields = ['__all__']

class CareerTimestampSerializer(ModelSerializer):
   employee = EmployeeSerializer(many=False, read_only=True)
   role = RoleSerializer(many=False, read_only=True)
   class Meta:
      model = CareerTimestamp
      fields = ['__all__']

