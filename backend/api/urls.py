from django.urls import path

from . import views

urlpatterns = [
   path('', views.endpoints, name='get_endpoints'),

   path('employer/', views.get_employer, name='get_employer'),
   path('employer/register/', views.register_employer, name='register_employer'),
   path('employer/login/', views.login_employer, name='login_employer'),
   path('employer/logout/', views.logout_employer, name='logout_employer'),
   path('employer/update/', views.patch_employer, name='patch_employer'),

   path('employees/', views.handle_employees, name='handle_employees'),
   path('employees/<int:id>/', views.remove_employee, name='remove_employee'),

   path('talent/', views.get_talent, name='get_talent'),
   path('talent/<int:id>/', views.get_talent_info_and_employment_history, name='get_talent_info_and_employment_history'),
]
