from django.urls import path

from . import views

urlpatterns = [
   path('', views.endpoints),
   path('employer/<int:id>/', views.get_employer),
]
