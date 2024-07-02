export type NewEmployee = {
   national_id: string | undefined;
   name: string | undefined;
   employee_id?: string | number | undefined;
   department_name: string | undefined;
   role_title: string | undefined;
   role_duties?: string | undefined;
   date_started?: string | undefined;
   date_left?: string | undefined;
};

export type EmployeeAutocompleteOption = {
   label: string;
   national_id: string;
   id: string | number;
} | null;

export type EmployerRegistrationPayload = {
   "employer-admin": {
      password: string;
      username: string;
   };
   employer: {
      name: string;
      email: string | null;
      registration_number: string | null;
      registration_date: string | null;
      address: string | null;
      contact_person: string | null;
      number_of_employees: number | null;
      contact_phone: string | null;
   };
   departments: string[];
};

export type EmployerUpdatePayload = {
   "employer-admin": {
      password?: string;
      username: string;
   };
   employer: {
      name: string;
      email: string | null;
      registration_number: string | null;
      registration_date: string | null;
      address: string | null;
      contact_person: string | null;
      number_of_employees: number | null;
      contact_phone: string | null;
   };
   departments: string[];
};

export type Credentials = { username: string; password: string };
