# Django Rest Framework API for Talent-Verify

This api has the following endpoints

1. GET /

   -  returns a json list of all api endpoints and their documentation

2. GET /employer/(ID)

   -  returns details of employer with given ID if found (JSON)
   -  returns error message if employer not found (JSON)

3. POST /employer/register

   -  accepts employer details (JSON)
   -  returns employer details and auth token on successful registration (JSON)
   -  returns error message on failed registration (JSON)

4. POST /employer/login

   -  accepts employer email and passkey (JSON)
   -  returns employer details and auth token on successful login (JSON)
   -  returns error message on failed login (JSON)

5. PATCH /employer

   -  accepts partial/complete employer details and auth token assigned to employer (JSON)
   -  returns updated employer details and auth token on successful patch (JSON)
   -  returns error message on failed patch (JSON)

6. POST /employer/logout

   -  accepts auth token (JSON)
   -  returns error/success message (JSON)

7. GET /workers

   -  accepts a query object used to filter the workers retrieved (JSON)
   -  returns a list of zero or more workers matching the query criteria (JSON)
   -  returns an error message if the query object is of incorrect shape (JSON)

8. POST /workers

   -  accepts an auth token and a list of one or more workers for adding to an employers list of employees (JSON)
   -  returns a success message and number of employees added on successful upload (JSON)
   -  returns an error message on failed upload (JSON)

9. PATCH /workers

   -  accepts an auth token and a list of one or more workers's partial/complete details for updating (JSON)
   -  returns a success message and number of employees updated on successful patch (JSON)
   -  returns an error message on failed patch (JSON)

<!--
1. GET /
   -  returns a json list of all api endpoints and their documentation

2. POST /login

   -  accepts auth credentials (JSON)
   -  returns an auth token and user details on successful login (JSON)
   -  returns an error message on failed login (JSON)

3. POST /signup

   -  accepts auth credentials (JSON)
   -  returns an auth token and user details on successful login (JSON)
   -  returns an error message on failed login (JSON)

4. POST /logout

   -  accepts auth token of a logged in user (JSON)
   -  returns success/error message (JSON)

5. POST /employer

   -  accepts employer details and passkey for auth purposes (JSON)
   -  returns <b>'employer-registration'</b> success/error message along with emplyer(JSON)

6. PATCH /employer

   -  accepts partial/complete employer details and auth token of the user assigned to employer (JSON)
   -  returns <b>'employer-update'</b> success/error message (JSON)

7. GET /employer/(ID)

   -  returns details of employer with given ID if found (JSON)
   -  returns error message if employer not found (JSON)

8. Employers provide complete or partial employee information via single entry or bulk upload (CSV, text, or Excel document)
   -  Name of employee - employee ID number (if any) - department - role - date started in each role - date left role - duties in each role
9. The platform keeps and shows history as employee progresses in company or changes companies
10.   Ability to update all or part of company information
11.   Ability to update all or part of employee information via single entry or bulk upload (CSV, text, or Excel document)
12.   Allow users to search employee data by name, employer, position, department, year started, year left -->

The API is accessible at [talent-verify-onrender.com](https://talent-verify-onrender.com)
