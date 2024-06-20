from django.contrib.auth.hashers import make_password, check_password
from django.db import models

class Employer(models.Model):
   email = models.EmailField(max_length=100, unique=True, blank=True)
   name = models.CharField(max_length=100, blank=True)
   registration_number = models.CharField(max_length=100, null=True, blank=True)
   registration_date = models.DateField(null=True, blank=True)
   address = models.CharField(max_length=100, null=True, blank=True)
   contact_person = models.CharField(max_length=100, null=True, blank=True)
   number_of_employees = models.PositiveIntegerField(null=True, blank=True)
   contact_phone = models.CharField(max_length=30, null=True, blank=True)
   password = models.CharField(max_length=200, blank=True)

   def __str__(self) -> str:
      return 'employer: ' + self.name + ', email: ' + self.email

   def set_password(self, raw_password):
      self.password = make_password(raw_password)
      self.save()

   def validate_password(self, raw_password):
      return check_password(raw_password, self.password)


class Worker(models.Model):
   name = models.CharField(max_length=100)
   employer = models.ForeignKey(Employer, on_delete=models.SET_NULL, null=True, blank=True)
   worker_id = models.CharField(max_length=100, null=True, blank=True)

   def __str__(self) -> str:
      return self.name

class Department(models.Model):
   name = models.CharField(max_length=100)

   def __str__(self) -> str:
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
   worker = models.ForeignKey(Worker, on_delete=models.CASCADE)
   role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True)
   date_started = models.DateField(auto_now_add=True)  
   date_left = models.DateField(null=True, blank=True)  

   def __str__(self) -> str:
      if self.worker and self.role:
         period = str(self.date_started) 
         if self.date_left:
            period += ' - ' + str(self.date_left)
         return period + ': ' + self.worker.name + ' as ' + self.role.title
      return super().__str__()



