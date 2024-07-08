from rest_framework import status
from .test_setup import TestSetup

class TestViews(TestSetup):

   # ______test GET '/' endpoint______

   def test_can_get_endpoints(self):
      res = self.client.get(self.get_endpoints_url)
      self.assertEqual(res.status_code, status.HTTP_200_OK)

   def test_cannot_use_http_methods_other_than_GET_on_get_endpoints_route(self):
      res1 = self.client.post(self.get_endpoints_url)
      res2 = self.client.patch(self.get_endpoints_url)
      res3 = self.client.put(self.get_endpoints_url)
      res4 = self.client.delete(self.get_endpoints_url)

      self.assertEqual(res1.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
      self.assertEqual(res2.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
      self.assertEqual(res3.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
      self.assertEqual(res4.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

   # ______test POST 'employer/register/' endpoint______

   def test_cannot_use_http_methods_other_than_POST_on_register_employer_route(self):
      res1 = self.client.get(self.register_employer_url)
      res2 = self.client.patch(self.register_employer_url)
      res3 = self.client.put(self.register_employer_url)
      res4 = self.client.delete(self.register_employer_url)

      self.assertEqual(res1.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
      self.assertEqual(res2.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
      self.assertEqual(res3.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
      self.assertEqual(res4.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

   def test_cannot_register_without_providing_any_json_data(self):
      res = self.client.post(self.register_employer_url)
      print(res.content)
      self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

   def test_cannot_register_with_empty_data(self):
      res = self.client.post(self.register_employer_url, {}, format='json')
      self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

   def test_cannot_register_without_providing_employer_admin_details(self):
      res = self.client.post(self.register_employer_url, {'employer': self.employer_registration_data}, format='json')
      self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

   def test_cannot_register_without_providing_employer_admin_username(self):
      res = self.client.post(self.register_employer_url, {
         'employer-admin': self.employer_admin_credentials_no_username, 
         'employer': self.employer_registration_data
      }, format='json')
      self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

   def test_cannot_register_without_providing_employer_admin_password(self):
      res = self.client.post(self.register_employer_url, {
         'employer-admin': self.employer_admin_credentials_no_password, 
         'employer': self.employer_registration_data
      }, format='json')
      self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

   def test_cannot_register_without_providing_employer_details(self):
      res = self.client.post(self.register_employer_url, {'employer-admin': self.employer_admin_credentials}, format='json')
      self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

   def test_cannot_register_without_providing_employer_name(self):
      res = self.client.post(self.register_employer_url, {
         'employer-admin': self.employer_admin_credentials,
         'employer': self.employer_registration_data_no_name,
      }, format='json')
      self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

   def test_cannot_register_with_non_ISO_date_value_for_registration_date(self):
      res = self.client.post(self.register_employer_url, {
         'employer-admin': self.employer_admin_credentials,
         'employer': self.employer_registration_data_incorrect_date_format,
      }, format='json')
      self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

   def test_can_register_with_proper_data(self):
      res = self.client.post(self.register_employer_url, {
         'employer-admin': self.employer_admin_credentials,
         'employer': self.employer_registration_data,
      }, format='json')
      self.assertEqual(res.status_code, status.HTTP_201_CREATED)

   # ______test GET 'employer/' endpoint______

   # ______test POST 'employer/login/' endpoint______

   # ______test POST 'employer/logout/' endpoint______

   # ______test PATCH 'employer/update/' endpoint______

   # ______test GET 'employees/' endpoint______

   # ______test POST 'employees/' endpoint______

   # ______test PATCH 'employees/' endpoint______

   # ______test DELETE 'employees/(ID)/' endpoint______

   # ______test GET 'talent?query=(query),is_date=(is_date)/' endpoint______

   # ______test GET 'talent/(ID)/' endpoint______
