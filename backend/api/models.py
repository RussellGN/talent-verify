from django.db import models
from django.contrib.auth.models import AbstractUser

class EmployerAdmin(AbstractUser):
   email = models.EmailField(max_length=100, unique=True)
   name = models.CharField(max_length=100, blank=True)

   class Meta:
      verbose_name = 'EmployerAdmin'
      verbose_name_plural = 'Employer Admins'

   def __str__(self):
      if self.name:
         return f"{self.name} - {self.email}"
      return self.email

class Employer(models.Model):
   administrator = models.OneToOneField(EmployerAdmin, on_delete=models.SET_NULL, null=True, blank=True)
   name = models.CharField(max_length=100, unique=True, blank=True)
   email = models.EmailField(max_length=100, unique=True, blank=True)
   registration_number = models.CharField(max_length=100, unique=True, null=True, blank=True)
   registration_date = models.DateField(null=True, blank=True)
   address = models.CharField(max_length=100, null=True, blank=True)
   contact_person = models.CharField(max_length=100, null=True, blank=True)
   number_of_employees = models.PositiveIntegerField(null=True, blank=True)
   contact_phone = models.CharField(max_length=30, null=True, blank=True)

   def __str__(self) -> str:
      return self.name

class Employee(models.Model):
   name = models.CharField(max_length=100)
   employer = models.ForeignKey(Employer, on_delete=models.SET_NULL, null=True, blank=True)
   employee_id = models.CharField(max_length=100, null=True, blank=True)

   def __str__(self) -> str:
      return self.name

class Department(models.Model):
   employer = models.ForeignKey(Employer, on_delete=models.SET_NULL, null=True, blank=True)
   name = models.CharField(max_length=100)

   def __str__(self) -> str:
      if self.employer:
         return self.name + ' at ' + self.employer.name
      return self.name

class Role(models.Model):
   title = models.CharField(max_length=100)
   duties = models.TextField(max_length=400)
   department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, blank=True)

   def __str__(self) -> str:
      if self.department:
         return self.title + ' in ' + self.department.name
      return self.title

class CareerTimestamp(models.Model):
   employee = models.ForeignKey(Employee, on_delete=models.CASCADE, null=True)
   role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True)
   date_started = models.DateField(auto_now_add=True)  
   date_left = models.DateField(null=True, blank=True)  

   def __str__(self) -> str:
      if self.employee and self.role:
         period = str(self.date_started) 
         if self.date_left:
            period += ' - ' + str(self.date_left)
         return period + ': ' + self.employee.name + ' as ' + self.role.title
      return super().__str__()



