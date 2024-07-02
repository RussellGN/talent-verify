import { axiosClient } from ".";
import { EmployerInterface, HistoricalCareerTimestampInterface, UnormalizedCurrentEmployeeInterface } from "../interfaces";
import { Credentials, EmployerRegistrationPayload, EmployerUpdatePayload, NewEmployee } from "../types";

export default abstract class API {
   static async getTalent(query: string, isDate: boolean) {
      // endpoint : GET /talent?query=(query),is_date=(is_date)
      // expects : query and optional is_date search parameters used to filter the employees retrieved (JSON)
      // onSuccess : returns a list of zero or more employees matching the query criteria (JSON)

      return await axiosClient
         .get<UnormalizedCurrentEmployeeInterface[]>("talent", {
            params: {
               query: query,
               is_date: isDate,
            },
         })
         .then((res) => res.data);
   }

   static async getTalentWithID(id: string | number) {
      // endpoint: GET /talent/(ID)
      // onSuccess: returns details of talent with given ID if found (JSON)
      // onError: returns an error message if talent not found (JSON)

      type ReturnType = {
         talent: UnormalizedCurrentEmployeeInterface;
         employment_history: HistoricalCareerTimestampInterface[];
      };

      return await axiosClient.get<ReturnType>(`talent/${id}`).then((res) => res.data);
   }

   static async registerEmployer(data: EmployerRegistrationPayload) {
      // endpoint: POST /employer/register
      // expects: employer-admin credentials and partial/complete employer details (JSON)
      // onSuccess: returns employer details (with nested employer-admin) and auth token on successful registration (JSON)
      // onError: returns error message on failed registration (JSON)

      const json = JSON.stringify(data);
      return await axiosClient
         .post<{ employer: EmployerInterface; token: string }>("employer/register/", json)
         .then((res) => res.data);
   }

   static async loginEmployer(credentials: Credentials) {
      /* 
         endpoint: POST /employer/login
         expects: employer-admin credentials  (JSON)
         onError: returns error message on failed login (JSON)
         onSuccess: returns employer details (with nested employer-admin), list of employees and auth token on successful login (JSON)
            {
               token: string

               employer: {id, administrator: {username, password}, name, email, registration_number, registration_date, address, contact_person, number_of_employees, contact_phone, departments: [string]}

               employees : [{id, national_id, name, employee_id, employer, department, role, duties, date_started, date_left}]
            }
      */

      const json = JSON.stringify(credentials);
      return await axiosClient
         .post<{ token: string; employer: EmployerInterface; employees: UnormalizedCurrentEmployeeInterface[] }>(
            "employer/login/",
            json
         )
         .then((res) => res.data);
   }

   static async getEmployer(token: string) {
      /* 
         endpoint: GET /employer
         expects: auth token in request headers
         onError: returns error message if employer not found (JSON)
         onSuccess: onSuccess : returns details of employer and list of employees for employer assigned with auth token in request headers (JSON)
            {
               employer: {id, administrator: {username, password}, name, email, registration_number, registration_date, address, contact_person, number_of_employees, contact_phone, departments: [string]}

               employees : [{id, national_id, name, employee_id, employer, department, role, duties, date_started, date_left}]
            }
         */
      return await axiosClient
         .get<{ employer: EmployerInterface; employees: UnormalizedCurrentEmployeeInterface[] }>("employer/", {
            headers: {
               Authorization: `Token ${token}`,
            },
         })
         .then((res) => res.data);
   }

   static async getEmployees(token: string) {
      /* 
         endpoint: GET /employees
         expects: expects an auth token in request headers  (JSON)
         onError: returns an error message if unsuccessfull (JSON)
         onSuccess: returns a list of zero or more employees belonging to an employer (JSON)
            [{id, national_id, name, employee_id, employer, department, role, duties, date_started, date_left}]
      */
      return await axiosClient
         .get<UnormalizedCurrentEmployeeInterface[]>("employees/", {
            headers: {
               Authorization: `Token ${token}`,
            },
         })
         .then((res) => res.data);
   }

   static async logoutEmployer(token: string) {
      /* 
         endpoint: POST /employer/logout
         expects: auth token in request headers
         onSuccess: returns success message (JSON)
         onError: returns error message (JSON)
      */
      console.log(token);
      return await axiosClient
         .post<string>(
            "employer/logout/",
            {},
            {
               headers: {
                  Authorization: `Token ${token}`,
               },
            }
         )
         .then((res) => res.data);
   }

   static async updateEmployer(token: string, data: EmployerUpdatePayload) {
      // endpoint: PATCH /employer/update
      // expects: partial/complete employer and employer-admin details as well as auth token in request headers (JSON)
      // onSuccess: "returns updated employer details (with nested employer-admin) on successful patch (JSON)",
      // onError: "returns error message on failed patch (JSON)",

      const json = JSON.stringify(data);
      return await axiosClient
         .patch<{ employer: EmployerInterface; message: string }>("employer/update/", json, {
            headers: {
               Authorization: `Token ${token}`,
            },
         })
         .then((res) => res.data);
   }

   static async addEmployees(token: string, data: NewEmployee[]) {
      /*
         endpoint: POST /employees
         expects: a list of one or more employees's partial/complete details for adding to an employers list of employees as well as an auth token in request headers (JSON)
         onSuccess: returns a list of employees added as well as a list of employees updated if successful (JSON)
         onError: returns an error message if unsuccessful (JSON)
      */
      const json = JSON.stringify(data);
      return await axiosClient
         .post<{
            employees_added: UnormalizedCurrentEmployeeInterface[];
            existing_employees_updated: UnormalizedCurrentEmployeeInterface[];
         }>("employees/", json, {
            headers: {
               Authorization: `Token ${token}`,
            },
         })
         .then((res) => res.data);
   }

   private unhandled_api_endpoints = [
      {
         endpoint: "PATCH /employees",
         expects:
            "a list of one or more employees's partial/complete details for updating as well as an auth token in request headers (JSON)",
         onSuccess: "returns a list of updated employees if successful (JSON)",
         onError: "returns an error message on failed patch (JSON)",
      },
      {
         endpoint: "POST /employees/reassign",
         expects:
            "the id of the employee to reassign and employer id (if any) to reassign employee to, along with an auth token in request headers (JSON)",
         onSuccess: "returns a success message (JSON)",
         onError: "returns an error message (JSON)",
      },
   ];
}
