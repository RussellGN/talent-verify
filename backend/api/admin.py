from django.contrib import admin

from .models import Employer, Employee, Department, Role, CareerTimestamp

admin.site.register(Employer)
admin.site.register(Employee)
admin.site.register(Department)
admin.site.register(Role)
admin.site.register(CareerTimestamp)
