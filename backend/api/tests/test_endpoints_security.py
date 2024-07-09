from rest_framework import status
from .test_setup import TestSetup

class TestEndpointsSecurity(TestSetup):
   # ______test security for POST 'employer/register/' endpoint______

   def test_can_register_with_proper_data(self):
      res = self.client.post(self.register_employer_url, self.employer_and_employer_admin_registration_data_complete , format='json')
      self.assertEqual(res.status_code, status.HTTP_201_CREATED)

   def test_cannot_use_http_methods_other_than_POST_on_register_employer_route(self):
      res0 = self.client.post(self.register_employer_url, self.employer_and_employer_admin_registration_data_complete , format='json')
      res1 = self.client.get(self.register_employer_url)
      res2 = self.client.patch(self.register_employer_url)
      res3 = self.client.put(self.register_employer_url)
      res4 = self.client.delete(self.register_employer_url)

      self.assertEqual(res0.status_code, status.HTTP_201_CREATED)
      self.assertEqual(res1.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
      self.assertEqual(res2.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
      self.assertEqual(res3.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
      self.assertEqual(res4.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

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

   # ______test security for GET 'employer/' endpoint______

   def test_can_get_employer_details_with_valid_auth_token(self):
      registration_res = self.client.post(self.register_employer_url, self.employer_and_employer_admin_registration_data_complete , format='json')
      token = registration_res.data['token']

      res = self.client.get(self.get_employer_url, headers={'Authorization': f'Token {token}'})
      self.assertEqual(res.status_code, status.HTTP_200_OK)

   def test_cannot_get_employer_details_without_auth_token(self):
      res = self.client.get(self.get_employer_url)
      self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

   def test_cannot_get_employer_details_with_invalid_auth_token(self):
      res = self.client.get(self.get_employer_url, headers={'Authorization': 'Token invalid_token'})
      self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

   def test_cannot_use_http_methods_other_than_GET_on_get_employer_route(self):
      registration_res = self.client.post(self.register_employer_url, self.employer_and_employer_admin_registration_data_complete , format='json')
      token = registration_res.data['token']

      res0 = self.client.get(self.get_employer_url, headers={'Authorization': f'Token {token}'})
      res1 = self.client.post(self.get_employer_url, headers={'Authorization': f'Token {token}'})
      res2 = self.client.patch(self.get_employer_url, headers={'Authorization': f'Token {token}'})
      res3 = self.client.put(self.get_employer_url, headers={'Authorization': f'Token {token}'})
      res4 = self.client.delete(self.get_employer_url, headers={'Authorization': f'Token {token}'})

      self.assertEqual(res0.status_code, status.HTTP_200_OK)
      self.assertEqual(res1.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
      self.assertEqual(res2.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
      self.assertEqual(res3.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
      self.assertEqual(res4.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

   # ______test security for POST 'employer/login/' endpoint______

   def test_can_login_with_credentials(self):
      self.client.post(self.register_employer_url, self.employer_and_employer_admin_registration_data_complete , format='json')
      res = self.client.post(self.login_employer_url, self.employer_admin_credentials, format='json')
      self.assertEqual(res.status_code, status.HTTP_200_OK)

   def test_cannot_login_with_incorrect_credentials(self):
      res = self.client.post(self.login_employer_url, self.employer_admin_credentials, format='json')
      self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

   def test_cannot_use_http_methods_other_than_POST_on_login_employer_route(self):
      self.client.post(self.register_employer_url, self.employer_and_employer_admin_registration_data_complete , format='json')

      res0 = self.client.post(self.login_employer_url, self.employer_admin_credentials, format='json')
      res1 = self.client.get(self.login_employer_url, self.employer_admin_credentials, format='json')
      res2 = self.client.patch(self.login_employer_url, self.employer_admin_credentials, format='json')
      res3 = self.client.put(self.login_employer_url, self.employer_admin_credentials, format='json')
      res4 = self.client.delete(self.login_employer_url, self.employer_admin_credentials, format='json')

      self.assertEqual(res0.status_code, status.HTTP_200_OK)
      self.assertEqual(res1.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
      self.assertEqual(res2.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
      self.assertEqual(res3.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
      self.assertEqual(res4.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

   def test_cannot_login_without_providing_any_json_data(self):
      self.client.post(self.register_employer_url, self.employer_and_employer_admin_registration_data_complete , format='json')
      res = self.client.post(self.login_employer_url)
      self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

   def test_cannot_login_with_empty_data(self):
      self.client.post(self.register_employer_url, self.employer_and_employer_admin_registration_data_complete , format='json')
      res = self.client.post(self.login_employer_url, {}, format='json')
      self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

   def test_cannot_login_without_providing_employer_admin_username(self):
      self.client.post(self.register_employer_url, self.employer_and_employer_admin_registration_data_complete , format='json')
      res = self.client.post(self.login_employer_url, self.employer_admin_credentials_no_username, format='json')
      self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

   def test_cannot_login_without_providing_employer_admin_password(self):
      self.client.post(self.register_employer_url, self.employer_and_employer_admin_registration_data_complete , format='json')
      res = self.client.post(self.login_employer_url, self.employer_admin_credentials_no_password, format='json')
      self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

   # ______test security for POST 'employer/logout/' endpoint______

   def test_can_logout_with_valid_auth_token(self):
      registration_res = self.client.post(self.register_employer_url, self.employer_and_employer_admin_registration_data_complete , format='json')
      token = registration_res.data['token']
      res = self.client.post(self.logout_employer_url, headers={'Authorization': f'Token {token}'})
      self.assertEqual(res.status_code, status.HTTP_200_OK)

   def test_cannot_logout_without_auth_token(self):
      res = self.client.post(self.logout_employer_url)
      self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

   def test_cannot_logout_with_invalid_auth_token(self):
      res = self.client.post(self.logout_employer_url, headers={'Authorization': 'Token invalid_token'})
      self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

   def test_cannot_use_http_methods_other_than_POST_on_logout_employer_route(self):
      registration_res = self.client.post(self.register_employer_url, self.employer_and_employer_admin_registration_data_complete , format='json')
      token = registration_res.data['token']
      res0 = self.client.post(self.logout_employer_url, headers={'Authorization': f'Token {token}'})

      login_res = self.client.post(self.login_employer_url, self.employer_admin_credentials, format='json')
      token = login_res.data['token']
      res1 = self.client.get(self.logout_employer_url, headers={'Authorization': f'Token {token}'})

      login_res = self.client.post(self.login_employer_url, self.employer_admin_credentials, format='json')
      token = login_res.data['token']
      res2 = self.client.patch(self.logout_employer_url, headers={'Authorization': f'Token {token}'})

      login_res = self.client.post(self.login_employer_url, self.employer_admin_credentials, format='json')
      token = login_res.data['token']
      res3 = self.client.put(self.logout_employer_url, headers={'Authorization': f'Token {token}'})

      login_res = self.client.post(self.login_employer_url, self.employer_admin_credentials, format='json')
      token = login_res.data['token']
      res4 = self.client.delete(self.logout_employer_url, headers={'Authorization': f'Token {token}'})

      self.assertEqual(res0.status_code, status.HTTP_200_OK)
      self.assertEqual(res1.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
      self.assertEqual(res2.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
      self.assertEqual(res3.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
      self.assertEqual(res4.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

   # ______test security for PATCH 'employer/update/' endpoint______

   def test_can_update_employer_with_proper_data_and_valid_auth_token(self):
      registration_res = self.client.post(self.register_employer_url, self.employer_and_employer_admin_registration_data_complete , format='json')
      token = registration_res.data['token']
      res = self.client.patch(self.patch_employer_url, self.employer_and_employer_admin_patch_data_complete, format='json', headers={'Authorization': f'Token {token}'})
      self.assertEqual(res.status_code, status.HTTP_200_OK)

   def test_cannot_use_http_methods_other_than_PATCH_on_update_employer_route(self):
      registration_res = self.client.post(self.register_employer_url, self.employer_and_employer_admin_registration_data_complete , format='json')
      token = registration_res.data['token']

      res0 = self.client.patch(self.patch_employer_url, self.employer_and_employer_admin_patch_data_complete, format='json', headers={'Authorization': f'Token {token}'})
      res1 = self.client.get(self.patch_employer_url, self.employer_and_employer_admin_patch_data_complete, format='json', headers={'Authorization': f'Token {token}'})
      res2 = self.client.post(self.patch_employer_url, self.employer_and_employer_admin_patch_data_complete, format='json', headers={'Authorization': f'Token {token}'})
      res3 = self.client.put(self.patch_employer_url, self.employer_and_employer_admin_patch_data_complete, format='json', headers={'Authorization': f'Token {token}'})
      res4 = self.client.delete(self.patch_employer_url, self.employer_and_employer_admin_patch_data_complete, format='json', headers={'Authorization': f'Token {token}'})

      self.assertEqual(res0.status_code, status.HTTP_200_OK)
      self.assertEqual(res1.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
      self.assertEqual(res2.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
      self.assertEqual(res3.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
      self.assertEqual(res4.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

   def test_cannot_update_employer_without_auth_token(self):
      res = self.client.patch(self.patch_employer_url, self.employer_and_employer_admin_patch_data_complete, format='json')
      self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

   def test_cannot_update_employer_with_invalid_auth_token(self):
      res = self.client.patch(self.patch_employer_url, self.employer_and_employer_admin_patch_data_complete, format='json', headers={'Authorization': f'Token invalid_token'})
      self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

   # ______test security for GET 'employees/' endpoint______

   def test_can_get_employees_with_valid_auth_token(self):
      registration_res = self.client.post(self.register_employer_url, self.employer_and_employer_admin_registration_data_complete , format='json')
      token = registration_res.data['token']

      res = self.client.get(self.handle_employees_url, headers={'Authorization': f'Token {token}'})
      self.assertEqual(res.status_code, status.HTTP_200_OK)

   def test_cannot_get_employees_without_auth_token(self):
      res = self.client.get(self.handle_employees_url)
      self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

   def test_cannot_get_employees_with_invalid_auth_token(self):
      res = self.client.get(self.handle_employees_url, headers={'Authorization': 'Token invalid_token'})
      self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

   # ______test security for POST 'employees/' endpoint______

   def test_can_post_employee_with_valid_auth_token_and_valid_data(self):
      registration_res = self.client.post(self.register_employer_url, self.employer_and_employer_admin_registration_data_complete , format='json')
      token = registration_res.data['token']

      res = self.client.post(self.handle_employees_url, self.employees_creation_data_single_and_complete, format='json', headers={'Authorization': f'Token {token}'})
      self.assertEqual(res.status_code, status.HTTP_201_CREATED)

   def test_cannot_post_employee_without_auth_token(self):
      res = self.client.post(self.handle_employees_url, self.employees_creation_data_single_and_complete, format='json')
      self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

   def test_cannot_post_employee_with_invalid_auth_token(self):
      res = self.client.post(self.handle_employees_url, self.employees_creation_data_single_and_complete, format='json', headers={'Authorization': f'Token invalid-token'})
      self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

   # ______test security for PATCH 'employees/' endpoint______

   def test_can_patch_employee_with_valid_auth_token_and_valid_data(self):
      registration_res = self.client.post(self.register_employer_url, self.employer_and_employer_admin_registration_data_complete , format='json')
      token = registration_res.data['token']
      self.client.post(self.handle_employees_url, self.employees_creation_data_single_and_complete, format='json', headers={'Authorization': f'Token {token}'})

      res = self.client.patch(self.handle_employees_url, self.employees_pacth_data_single_and_complete, format='json', headers={'Authorization': f'Token {token}'})
      self.assertEqual(res.status_code, status.HTTP_200_OK)

   def test_cannot_patch_employee_without_auth_token(self):
      registration_res = self.client.post(self.register_employer_url, self.employer_and_employer_admin_registration_data_complete , format='json')
      token = registration_res.data['token']
      self.client.post(self.handle_employees_url, self.employees_creation_data_single_and_complete, format='json', headers={'Authorization': f'Token {token}'})

      res = self.client.patch(self.handle_employees_url, self.employees_pacth_data_single_and_complete, format='json')
      self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

   def test_cannot_patch_employee_with_invalid_auth_token(self):
      registration_res = self.client.post(self.register_employer_url, self.employer_and_employer_admin_registration_data_complete , format='json')
      token = registration_res.data['token']
      self.client.post(self.handle_employees_url, self.employees_creation_data_single_and_complete, format='json', headers={'Authorization': f'Token {token}'})

      res = self.client.patch(self.handle_employees_url, self.employees_pacth_data_single_and_complete, format='json', headers={'Authorization': f'Token invalid-token'})
      self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

   # ______test security for DELETE 'employees/(ID)/' endpoint______

   # ______test security for GET 'talent?query=(query),is_date=(is_date)/' endpoint______

   # ______test security for GET 'talent/(ID)/' endpoint______
