# ________________employer_admin_data
employer_admin_credentials = {
   'username': 'org HR Officer', 
   'password': '123456789', 
}
employer_admin_credentials_no_username = {
   'password': '123456789', 
}
employer_admin_credentials_no_password = {
   'username': 'org HR Officer', 
}
employer_admin_credentials_no_username_no_password = {}

# ________________employer_registration_data
employer_registration_data = {
   'name': 'Green Fuel inc',
   'email': 'info@greenfuel.com',
   'registration_number': 'T123',
   'registration_date': '02/21/2024',
   'address': '22F 1st Street Harare',
   'contact_person': 'Nelson Manyika',
   'number_of_employees': 20,
   'contact_phone': '+263 7183 328',
   'departments': ['finance', 'IT'],
}
employer_registration_data_no_name = {
   'email': 'info@greenfuel.com',
   'registration_number': 'T123',
   'registration_date': '02/21/2024',
   'address': '22F 1st Street Harare',
   'contact_person': 'Nelson Manyika',
   'number_of_employees': 20,
   'contact_phone': '+263 7183 328',
   'departments': ['finance', 'IT'],
}
employer_registration_data_only_name = {
   'name': 'Green Fuel inc',
}

# ________________employer_patch_data
employer_and_employer_admin_patch_data_complete = {
   'employer': {
      'name': 'Green Fuel inc',
      'email': 'info@greenfuel.com',
      'registration_number': 'T123',
      'registration_date': '02/21/2024',
      'address': '22F 1st Street Harare',
      'contact_person': 'Nelson Manyika',
      'number_of_employees': 20,
      'contact_phone': '+263 7183 328',
      'departments': ['finance', 'IT']
   },
   'employer-admin': {
      'username': 'org HR Officer', 
      'password': '123456789', 
   }
}
employer_and_employer_admin_patch_data_empty = {}

# ________________employees_data
employees_creation_data_single_and_complete = [
   {
      'national_id': '123F44',
      'name': 'John Doe',
      'employee_id': 'E1',
      'department_name': 'Customer relations',
      'role_title': 'Customer relations manager',
      'role_duties': 'management of clientele',
      'date_started': '02/21/2023',
   },
]
employees_creation_data_multiple_and_complete = [
      {
      'national_id': '123F44',
      'name': 'John Doe',
      'employee_id': 'E1',
      'department_name': 'Customer relations',
      'role_title': 'Customer relations manager',
      'role_duties': 'management of clientele',
      'date_started': '02/21/2023',
   },
   {
      'national_id': '112233F44',
      'name': 'Kane Smith',
      'employee_id': 'E2',
      'department_name': 'finance',
      'role_title': 'accountant',
      'role_duties': 'financial record keeping',
      'date_started': '02/21/2023',
   },
]
employees_creation_data_single_and_no_name = [
   {
      'national_id': '123F44',
      'employee_id': 'E1',
      'department_name': 'Customer relations',
      'role_title': 'Customer relations manager',
      'role_duties': 'management of clientele',
      'date_started': '02/21/2023',
   },
]
employees_creation_data_single_and_no_national_id = [
   {
      'name': 'Kane Smith',
      'employee_id': 'E1',
      'department_name': 'Customer relations',
      'role_title': 'Customer relations manager',
      'role_duties': 'management of clientele',
      'date_started': '02/21/2023',
   },
]
employees_creation_data_multiple_and_no_name = [
   {
      'national_id': '123F44',
      'employee_id': 'E1',
      'department_name': 'Customer relations',
      'role_title': 'Customer relations manager',
      'role_duties': 'management of clientele',
      'date_started': '02/21/2023',
   },
   {
      'national_id': '112233F44',
      'employee_id': 'E2',
      'department_name': 'finance',
      'role_title': 'accountant',
      'role_duties': 'financial record keeping',
      'date_started': '02/21/2023',
   },
]
employees_creation_data_multiple_and_no_national_ids = [
   {
      'name': 'Kane Smith',
      'employee_id': 'E1',
      'department_name': 'Customer relations',
      'role_title': 'Customer relations manager',
      'role_duties': 'management of clientele',
      'date_started': '02/21/2023',
   },
   {
      'name': 'John Doe',
      'employee_id': 'E2',
      'department_name': 'finance',
      'role_title': 'accountant',
      'role_duties': 'financial record keeping',
      'date_started': '02/21/2023',
   },
]
employees_creation_data_single_and_partial = [
   {
      'national_id': '112233F44',
      'name': 'Kane Smith',
   },
]
employees_creation_data_multiple_and_partial = [
   {
      'national_id': '112233F44',
      'name': 'Kane Smith',
   },
   {
      'national_id': '123F44',
      'name': 'John Doe',
   },
]
