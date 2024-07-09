from rest_framework.test import APITestCase
from django.urls import reverse

from .fixtures.test_data import credentials, credentials_no_username, employees_patch_data, credentials_no_password,  employer_data,employer_and_employer_admin_registration_data,employees_data, employer_and_employer_admin_patch_data

class TestSetup(APITestCase):
   def setUp(self):
      # setup urls
      self.get_endpoints_url = reverse('get_endpoints')
      self.get_employer_url = reverse('get_employer')
      self.register_employer_url = reverse('register_employer')
      self.login_employer_url = reverse('login_employer')
      self.logout_employer_url = reverse('logout_employer')
      self.patch_employer_url = reverse('patch_employer')
      self.handle_employees_url = reverse('handle_employees')
      self.get_talent_url = reverse('get_talent')

      # setup data
      self.credentials = credentials
      self.credentials_no_username = credentials_no_username
      self.credentials_no_password = credentials_no_password

      self.employer_data = employer_data
      self.employer_and_employer_admin_registration_data = employer_and_employer_admin_registration_data
      self.employer_and_employer_admin_patch_data = employer_and_employer_admin_patch_data

      self.employees_data = employees_data
      self.employees_patch_data = employees_patch_data

      return super().setUp()

   def tearDown(self):      
      return super().tearDown()

