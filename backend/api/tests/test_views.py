from rest_framework import status
from .test_setup import TestSetup

class TestViews(TestSetup):
   def test_user_can_get_endpoints(self):
      res = self.client.get(self.get_endpoints_url)
      self.assertEqual(res.status_code, status.HTTP_200_OK)

   def test_user_cannot_use_other_http_methods_on_get_endpoints_route(self):
      res1 = self.client.post(self.get_endpoints_url)
      res2 = self.client.patch(self.get_endpoints_url)
      res3 = self.client.put(self.get_endpoints_url)
      res4 = self.client.delete(self.get_endpoints_url)

      self.assertEqual(res1.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
      self.assertEqual(res2.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
      self.assertEqual(res3.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
      self.assertEqual(res4.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)


