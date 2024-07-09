credentials = {
   'username': 'org HR Officer', 
   'password': '123456789', 
}

credentials_no_username = {
   'password': '123456789', 
}

credentials_no_password = {
   'username': 'org HR Officer', 
}

employer_data = {
   'name': 'Green Fuel inc',
   'email': 'info@greenfuel.com',
   'registration_number': 'T123',
   'registration_date': '2024-02-21',
   'address': '22F 1st Street Harare',
   'contact_person': 'Nelson Manyika',
   'number_of_employees': 20,
   'contact_phone': '+263 7183 328',
}

employer_and_employer_admin_registration_data = {
   'employer': {
      'name': 'Green Fuel inc',
      'email': 'info@greenfuel.com',
      'registration_number': 'T123',
      'registration_date': '2024-02-21',
      'address': '22F 1st Street Harare',
      'contact_person': 'Nelson Manyika',
      'number_of_employees': 20,
      'contact_phone': '+263 7183 328',
   },
   'employer-admin': {
      'username': 'org HR Officer', 
      'password': '123456789', 
   },
   'departments': ['finance', 'IT']
}

employer_and_employer_admin_patch_data = {
   'employer': {
      'name': 'Green Fuel inc',
      'email': 'info@greenfuel.com',
      'registration_number': 'T123',
      'registration_date': '2024-02-21',
      'address': '22F 1st Street Harare',
      'contact_person': 'Nelson Manyika',
      'number_of_employees': 20,
      'contact_phone': '+263 7183 328',
   },
   'employer-admin': {
      'username': 'org HR Officer', 
      'password': '123456789', 
   },
   'departments': ['finance', 'IT']
}

employees_data = [
   {
      'national_id': '123F44',
      'name': 'John Doe',
      'employee_id': 'E1',
      'department_name': 'Customer relations',
      'role_title': 'Customer relations manager',
      'role_duties': 'management of clientele',
      'date_started': '2024-02-21',
   },
]

employees_patch_data = [
   {
      'id': 1,
      'national_id': '123F44',
      'name': 'John Doe',
      'employee_id': 'E1',
      'department_name': 'Customer relations',
      'role_title': 'Customer relations manager',
      'role_duties': 'management of clientele',
      'date_started': '2024-02-21',
   },
]
