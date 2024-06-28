from django.db import models
from django.contrib.auth.models import AbstractUser

class EmployerAdmin(AbstractUser):
   username = models.CharField(max_length=100, unique=True)
   
   class Meta:
      verbose_name = 'Employer Admin'
      verbose_name_plural = 'Employer Admins'

   def __str__(self):
      return self.username

class Employer(models.Model):
   administrator = models.OneToOneField(EmployerAdmin, on_delete=models.SET_NULL, null=True, blank=True)
   name = models.CharField(max_length=100, unique=True)
   email = models.EmailField(max_length=100, unique=True)
   registration_number = models.CharField(max_length=100, unique=True, null=True, blank=True)
   registration_date = models.DateField(null=True, blank=True)
   address = models.CharField(max_length=100, null=True, blank=True)
   contact_person = models.CharField(max_length=100, null=True, blank=True)
   number_of_employees = models.PositiveIntegerField(null=True, blank=True)
   contact_phone = models.CharField(max_length=30, null=True, blank=True)

   def __str__(self) -> str:
      return self.name

class Employee(models.Model):
   national_id = models.CharField(max_length=100, unique=True, blank=True)
   name = models.CharField(max_length=100, blank=True)
   employer = models.ForeignKey(Employer, on_delete=models.SET_NULL, null=True, blank=True)
   employee_id = models.CharField(max_length=100, null=True, blank=True)

   def __str__(self) -> str:
      return f"{self.name} (national ID: {self.national_id})"

class Department(models.Model):
   employer = models.ForeignKey(Employer, on_delete=models.SET_NULL, null=True, blank=True)
   name = models.CharField(max_length=100)

   def __str__(self) -> str:
      if self.employer:
         return F"{self.name} ({self.employer.name})"
      return self.name

class Role(models.Model):
   title = models.CharField(max_length=100)
   duties = models.TextField(max_length=400, null=True, blank=True)
   department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, blank=True)

   def __str__(self) -> str:
      if self.department:
         return f"{self.title} ({self.department.name}, {self.department.employer.name})"
      return self.title

class CareerTimestamp(models.Model):
   employee = models.ForeignKey(Employee, on_delete=models.CASCADE, null=True)
   role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True)
   date_started = models.DateField(null=True, blank=True)  
   date_left = models.DateField(null=True, blank=True)  

   def __str__(self) -> str:
      if self.employee and self.role:
         period = "from " + str(self.date_started) 
         if self.date_left:
            period += ' to ' + str(self.date_left)
         else:
            period += ' to _ ' 
         return f"{self.employee.name}, {self.role.title}, {self.role.department.name}, {self.role.department.employer.name} ({period})"
      return super().__str__()



