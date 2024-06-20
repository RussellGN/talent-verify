from django.contrib import admin

from .models import Employer, Worker, Department, Role, CareerTimestamp

admin.register(Employer)
admin.register(Worker)
admin.register(Department)
admin.register(Role)
admin.register(CareerTimestamp)
