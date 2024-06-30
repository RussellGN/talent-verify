import { axiosClient } from ".";
import { EmployerInterface, HistoricalCareerTimestampInterface, UnormalizedCurrentEmployeeInterface } from "../interfaces";
import { EmployerRegistrationPayload } from "../types";

export default abstract class API {
   static async getTalent(query: string, isDate: boolean) {
      // endpoint : GET /talent?query=(query),is_date=(is_date)
      // expects : query and optional is_date search parameters used to filter the employees retrieved (JSON)
      // onSuccess : returns a list of zero or more employees matching the query criteria (JSON)

      return await axiosClient
         .get<UnormalizedCurrentEmployeeInterface[]>("/talent", {
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

      return await axiosClient.get<ReturnType>(`/talent/${id}`).then((res) => res.data);
   }

   static async registerEmployer(data: EmployerRegistrationPayload) {
      // endpoint: POST /employer/register
      // expects: employer-admin credentials and partial/complete employer details (JSON)
      // onSuccess: returns employer details (with nested employer-admin) and auth token on successful registration (JSON)
      // onError: returns error message on failed registration (JSON)

      const json = JSON.stringify(data);
      return await axiosClient
         .post<{ employer: EmployerInterface; token: string }>("/employer/register/", json)
         .then((res) => res.data);
   }

   private unhandled_api_endpoints = [
      {
         endpoint: "GET /employer/(ID)",
         onSuccess: "returns details of employer with given ID if found (JSON)",
         onError: "returns error message if employer not found (JSON)",
      },
      {
         endpoint: "POST /employer/login",
         expects: "employer-admin credentials  (JSON)",
         onSuccess: "returns employer details (with nested employer-admin) and auth token on successful login (JSON)",
         onError: "returns error message on failed login (JSON)",
      },
      {
         endpoint: "PATCH /employer",
         expects: "partial/complete employer and employer-admin details as well as auth token in request headers (JSON)",
         onSuccess: "returns updated employer details (with nested employer-admin) on successful patch (JSON)",
         onError: "returns error message on failed patch (JSON)",
      },
      {
         endpoint: "POST /employer/logout",
         expects: "auth token in request headers",
         onSuccess: "returns success message (JSON)",
         onError: "returns error message (JSON)",
      },
      {
         endpoint: "POST /employees",
         expects:
            "a list of one or more employees's partial/complete details for adding to an employers list of employees as well as an auth token in request headers (JSON)",
         onSuccess: "returns a list of employees added if successful (JSON)",
         onError: "returns an error message if unsuccessful (JSON)",
      },
      {
         endpoint: "PATCH /employees",
         expects:
            "a list of one or more employees's partial/complete details for updating as well as an auth token in request headers (JSON)",
         onSuccess: "returns a list of updated employees if successful (JSON)",
         onError: "returns an error message on failed patch (JSON)",
      },
      {
         endpoint: "GET /employees",
         expects: "expects an auth token in request headers  (JSON)",
         onSuccess: "returns a list of zero or more employees belonging to an employer (JSON)",
         onError: "returns an error message if unsuccessfull (JSON)",
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
