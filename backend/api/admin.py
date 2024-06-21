from django.contrib import admin

from .models import Employer, Worker, Department, Role, CareerTimestamp

admin.site.register(Employer)
admin.site.register(Worker)
admin.site.register(Department)
admin.site.register(Role)
admin.site.register(CareerTimestamp)
