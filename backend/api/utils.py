from .models import Employee, CareerTimestamp

def get_latest_career_timestamp(employee: Employee) -> CareerTimestamp: 
   """
   returns the latest and most relevant career-timestamp of an employee, hence their 'current state of employment'
   """
   assert isinstance(employee, Employee) , 'employee must be an instance of Employee'
   return CareerTimestamp.objects.filter(employee=employee).latest('id')