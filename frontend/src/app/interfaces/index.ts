export interface EmployerAdminInterface {
   id: number;
   username: string;
   email: string;
}

export interface EmployerInterface {
   id: number;
   administrator: EmployerAdminInterface;
   name: string;
   email: string | null;
   registration_number: string | null;
   registration_date: string | null;
   address: string | null;
   contact_person: string | null;
   number_of_employees: number | null;
   contact_phone: string | null;
}

export interface EmployeeInterface {
   id: number;
   national_id: string;
   name: string;
   employer: EmployerInterface | null;
   employee_id: string | null;
}

export interface DepartmentInterface {
   id: number;
   employer: EmployerInterface;
   name: string;
}

export interface RoleInterface {
   id: number;
   title: string;
   duties: string;
   department: DepartmentInterface;
}

export interface CareerTimestampInterface {
   id: number;
   employee: EmployeeInterface;
   role: RoleInterface;
   date_started: string | null;
   date_left: string | null;
}
