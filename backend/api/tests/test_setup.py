from rest_framework.test import APITestCase
from django.urls import reverse

from .sample_data import employer_admin_credentials, employer_admin_credentials_no_username, employer_admin_credentials_no_password, employer_admin_credentials_no_username_no_password, employer_registration_data, employer_registration_data_no_name, employer_registration_data_only_name, employer_registration_data_incorrect_date_format, employer_and_employer_admin_registration_data_complete, employer_and_employer_admin_patch_data_complete, employer_and_employer_admin_patch_data_empty, employees_creation_data_single_and_complete, employees_creation_data_multiple_and_complete, employees_creation_data_single_and_incorrect_date_format, employees_creation_data_multiple_and_incorrect_date_formats, employees_creation_data_single_and_no_name, employees_creation_data_single_and_no_national_id, employees_creation_data_multiple_and_no_names, employees_creation_data_multiple_and_no_national_ids, employees_creation_data_single_and_partial, employees_creation_data_multiple_and_partial

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

      # self.remove_employee_url = reverse('remove_employee')
      # self.get_talent_info_and_employment_history_url = reverse('get_talent_info_and_employment_history')

      # setup data
      self.employer_admin_credentials = employer_admin_credentials
      self.employer_admin_credentials_no_username = employer_admin_credentials_no_username
      self.employer_admin_credentials_no_password = employer_admin_credentials_no_password
      self.employer_admin_credentials_no_username_no_password = employer_admin_credentials_no_username_no_password

      self.employer_registration_data = employer_registration_data
      self.employer_registration_data_no_name = employer_registration_data_no_name
      self.employer_registration_data_only_name = employer_registration_data_only_name
      self.employer_registration_data_incorrect_date_format = employer_registration_data_incorrect_date_format

      self.employer_and_employer_admin_registration_data_complete = employer_and_employer_admin_registration_data_complete
      self.employer_and_employer_admin_patch_data_complete = employer_and_employer_admin_patch_data_complete
      self.employer_and_employer_admin_patch_data_empty = employer_and_employer_admin_patch_data_empty

      self.employees_creation_data_single_and_complete = employees_creation_data_single_and_complete
      self.employees_creation_data_multiple_and_complete = employees_creation_data_multiple_and_complete
      self.employees_creation_data_single_and_incorrect_date_format = employees_creation_data_single_and_incorrect_date_format
      self.employees_creation_data_multiple_and_incorrect_date_formats = employees_creation_data_multiple_and_incorrect_date_formats
      self.employees_creation_data_single_and_no_name = employees_creation_data_single_and_no_name
      self.employees_creation_data_single_and_no_national_id = employees_creation_data_single_and_no_national_id
      self.employees_creation_data_multiple_and_no_names = employees_creation_data_multiple_and_no_names
      self.employees_creation_data_multiple_and_no_national_ids = employees_creation_data_multiple_and_no_national_ids
      self.employees_creation_data_single_and_partial = employees_creation_data_single_and_partial
      self.employees_creation_data_multiple_and_partial = employees_creation_data_multiple_and_partial

      return super().setUp()

   def tearDown(self):      
      return super().tearDown()

