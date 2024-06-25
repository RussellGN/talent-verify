import {
   CareerTimestampInterface,
   DepartmentInterface,
   EmployeeInterface,
   EmployerAdminInterface,
   EmployerInterface,
   RoleInterface,
} from "../interfaces";

export const sampleEmployeeAdmins: EmployerAdminInterface[] = [
   {
      id: 1,
      username: "econet hr",
      email: "hr@econet.co.zw",
   },
   {
      id: 2,
      username: "nmb bank hr",
      email: "hr@nmb.co.zw",
   },
];

export const sampleEmployers: EmployerInterface[] = [
   {
      id: 1,
      administrator: sampleEmployeeAdmins[0],
      name: "econet",
      email: "info@econet.co.zw",
      registration_number: "22g221",
      registration_date: "2022-03-05",
      address: "213 Borrowdale Road",
      contact_person: "Madelyn Makomo",
      number_of_employees: 540,
      contact_phone: null,
   },
   {
      id: 2,
      administrator: sampleEmployeeAdmins[1],
      name: "NMB Bank",
      email: "info@nmb.co.zw",
      registration_number: null,
      registration_date: null,
      address: "Corner Nelson Mandela and 1st",
      contact_person: null,
      number_of_employees: 300,
      contact_phone: "+263 4545 656",
   },
];

export const sampleDepartments: DepartmentInterface[] = [
   {
      id: 1,
      employer: sampleEmployers[0],
      name: "management",
   },
   {
      id: 2,
      employer: sampleEmployers[1],
      name: "IT systems",
   },
];

export const sampleRoles: RoleInterface[] = [
   {
      id: 1,
      department: sampleDepartments[0],
      title: "COO",
      duties: "management of operations",
   },
   {
      id: 2,
      department: sampleDepartments[1],
      title: "software developer",
      duties: "maintanance of company systems",
   },
];

export const sampleEmployees: EmployeeInterface[] = [
   {
      id: 1,
      employer: sampleEmployers[0],
      national_id: "1234h43hhb",
      name: "john doe",
      employee_id: null,
   },
   {
      id: 3,
      employer: sampleEmployers[1],
      national_id: "4h43hhb",
      name: "takudzwa moyo",
      employee_id: null,
   },
];

export const sampleCareerTimestamps: CareerTimestampInterface[] = [
   {
      id: 8,
      employee: sampleEmployees[0],
      role: sampleRoles[0],
      date_started: "2024-08-03",
      date_left: null,
   },
   {
      id: 9,
      employee: sampleEmployees[1],
      role: sampleRoles[1],
      date_started: "2024-01-23",
      date_left: null,
   },
];
