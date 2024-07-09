from rest_framework import status
from .test_setup import TestSetup

class TestEndpointsSecurity(TestSetup):
   # ______test security for POST 'employer/register/' endpoint______

   def test_can_register_with_proper_data(self):
      res = self.client.post(self.register_employer_url, self.employer_and_employer_admin_registration_data_complete , format='json')
      self.assertEqual(res.status_code, status.HTTP_201_CREATED)

   def test_cannot_register_without_providing_employer_admin_credentials(self):
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

   # ______test security for POST 'employer/login/' endpoint______

   def test_can_login_with_correct_credentials(self):
      self.client.post(self.register_employer_url, self.employer_and_employer_admin_registration_data_complete , format='json')
      res = self.client.post(self.login_employer_url, self.employer_admin_credentials, format='json')
      self.assertEqual(res.status_code, status.HTTP_200_OK)

   def test_cannot_login_with_incorrect_credentials(self):
      res = self.client.post(self.login_employer_url, self.employer_admin_credentials, format='json')
      self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

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

   # ______test security for PATCH 'employer/update/' endpoint______

   def test_can_update_employer_with_proper_data_and_valid_auth_token(self):
      registration_res = self.client.post(self.register_employer_url, self.employer_and_employer_admin_registration_data_complete , format='json')
      token = registration_res.data['token']
      res = self.client.patch(self.patch_employer_url, self.employer_and_employer_admin_patch_data_complete, format='json', headers={'Authorization': f'Token {token}'})
      self.assertEqual(res.status_code, status.HTTP_200_OK)

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

   def test_can_remove_employee_with_valid_auth_token_and_valid_id(self):
      registration_res = self.client.post(self.register_employer_url, self.employer_and_employer_admin_registration_data_complete , format='json')
      token = registration_res.data['token']

      creation_res = self.client.post(self.handle_employees_url, self.employees_creation_data_single_and_complete, format='json', headers={'Authorization': f'Token {token}'})
      id = creation_res.data['employees_added'][0]['id']
      
      res = self.client.delete(f"/employees/{id}/", headers={'Authorization': f'Token {token}'})
      self.assertEqual(res.status_code, status.HTTP_200_OK)

   def test_cannot_remove_employee_without_auth_token(self):
      registration_res = self.client.post(self.register_employer_url, self.employer_and_employer_admin_registration_data_complete , format='json')
      token = registration_res.data['token']

      creation_res = self.client.post(self.handle_employees_url, self.employees_creation_data_single_and_complete, format='json', headers={'Authorization': f'Token {token}'})
      id = creation_res.data['employees_added'][0]['id']
      
      res = self.client.delete(f"/employees/{id}/")
      self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

   def test_cannot_remove_employee_with_invalid_auth_token(self):
      registration_res = self.client.post(self.register_employer_url, self.employer_and_employer_admin_registration_data_complete , format='json')
      token = registration_res.data['token']

      creation_res = self.client.post(self.handle_employees_url, self.employees_creation_data_single_and_complete, format='json', headers={'Authorization': f'Token {token}'})
      id = creation_res.data['employees_added'][0]['id']
      
      res = self.client.delete(f"/employees/{id}/", headers={'Authorization': f'Token invalid-token'})
      self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

