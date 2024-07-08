# Django Rest Framework API for Talent-Verify

This api has the following endpoints

1. `GET /`

   -  returns a json list of all api endpoints and their documentation

2. `GET employer/`

   -  expects auth token in request headers (JSON)
   -  returns details of employer and list of employees for employer assigned with auth token in request headers (JSON)
   -  returns error message if employer not found (JSON)

3. `POST employer/register/`

   -  expects employer-admin credentials and partial/complete employer details (JSON)
   -  returns employer details (with nested employer-admin) and auth token on successful registration (JSON)
   -  returns error message on failed registration (JSON)

4. `POST employer/login/`

   -  expects employer-admin credentials (JSON)
   -  returns employer details (with nested employer-admin), list of employees and auth token on successful login (JSON)
   -  returns error message on failed login (JSON)

5. `POST employer/logout/`

   -  expects auth token in request headers
   -  returns error/success message (JSON)

6. `PATCH employer/update/`

   -  expects partial/complete employer and employer-admin details as well as auth token in request headers (JSON)
   -  returns updated employer details (with nested employer-admin) on successful patch (JSON)
   -  returns error message on failed patch (JSON)

7. `GET employees/`

   -  expects an auth token in request headers (JSON)
   -  returns a list of zero or more employees belonging to an employer (JSON)
   -  returns an error message if unsuccessfull (JSON)

8. `POST employees/`

   -  expects a list of one or more employees's partial/complete details for adding to an employers list of employees as well as an auth token in request headers (JSON)
   -  returns a list of employees added and existing employees updated if successful (JSON)
   -  returns an error message if unsuccessful (JSON)

9. `PATCH employees/`

   -  expects a list of one or more employees's partial/complete details for updating as well as an auth token in request headers (JSON)
   -  returns a list of updated employees if successful (JSON)
   -  returns an error message on failed patch (JSON)

10.   `DELETE employees/(ID)/`

      -  expects the `(ID)` of the employee to remove, along with an auth token in request headers(JSON)
      -  returns a success message if successfull (JSON)
      -  returns an error message if unsuccessfull (JSON)

11.   `GET talent?query=(query),is_date=(is_date)/`

      -  expects `'query'` and optional `'is_date'` search parameters used to filter the employees retrieved (JSON)
      -  returns a list of zero or more employees and a list of zero or more unemployed talent matching the query criteria (JSON)
      -  returns an error message if unsuccessfull (JSON)

12.   `GET talent/(ID)/`

      -  returns details and employement history of talent with given `(ID)` if found (JSON)
      -  returns an error message if talent not found (JSON)

<strong>IMPORTANT NOTE: All excel, csv and txt file uploads are processed to JSON on the frontend. Data sent to the backend is only in the form of JSON<strong>

The API is accessible at [talent-verify-onrender.com](https://talent-verify-onrender.com)
