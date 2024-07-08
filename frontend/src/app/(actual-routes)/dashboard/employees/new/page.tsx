"use client";

import useAddEmployees from "@/hooks/useAddEmployees";
import useEmployer from "@/hooks/useEmployer";
import { NewEmployee } from "@/types";
import { ArrowBack, CheckCircle, InfoOutlined, WarningOutlined } from "@mui/icons-material";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { FormEvent, useRef } from "react";

export default function DetailsPage() {
   const { data: employerData } = useEmployer();
   const { mutate, reset, data, isPending, isSuccess, isError, error } = useAddEmployees();
   const formRef = useRef<HTMLFormElement>(null);

   function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data: NewEmployee = {
         national_id: formData.get("national_id")?.toString(),
         name: formData.get("name")?.toString(),
         employee_id: formData.get("employee_id")?.toString() || undefined,
         department_name: formData.get("department")?.toString(),
         role_title: formData.get("role")?.toString(),
         role_duties: formData.get("duties")?.toString() || undefined,
         date_started: formData.get("date_started")?.toString() || undefined,
         date_left: formData.get("date_left")?.toString() || undefined,
      };
      mutate([data]);
   }

   if (isSuccess) {
      let message = "";
      if (data.employees_added.length === 1) {
         message = `${data.employees_added[0].name} was added to employees!`;
      } else if (data.existing_employees_updated.length === 1) {
         message = `an employee with the ID ${data.existing_employees_updated[0].national_id} was found and an update was made instead!`;
      } else {
         message = JSON.stringify(data);
      }
      formRef.current?.reset();

      return (
         <div className="text-center max-w-prose mx-auto py-20">
            <CheckCircle fontSize="large" color="success" className="mb-3" />
            <p>
               {message}
               <br />
               <Button onClick={reset} type="button" startIcon={<ArrowBack />} variant="outlined" sx={{ mt: 3 }}>
                  Back to form
               </Button>
            </p>
         </div>
      );
   }

   return (
      <>
         {/* had to return everything but conditionally render content in order to not clear form */}

         {isPending && (
            <div className="text-center px-10 py-20">
               <CircularProgress />
               <p>submitting...</p>
            </div>
         )}

         {isError && (
            <div className="text-center px-10 py-20">
               <WarningOutlined color="error" fontSize="large" />
               <p>
                  <strong>Error</strong> <br /> {error.message}
                  <br />
                  <Button onClick={reset} type="button" startIcon={<ArrowBack />} sx={{ mt: 3 }}>
                     Back to form
                  </Button>
               </p>
            </div>
         )}

         <div className={`min-h-[550px] ${isPending || isError ? "hidden" : "flex"} items-center justify-center`}>
            <form ref={formRef} onSubmit={handleSubmit}>
               <Box
                  component="fieldset"
                  sx={{ border: "solid 2px", borderColor: "divider", borderRadius: "10px", p: 2, mb: 3 }}
               >
                  <legend>Employee details</legend>

                  <Typography variant="subtitle2" sx={{ mb: 3 }}>
                     <InfoOutlined fontSize="inherit" color="warning" sx={{ mt: -0.3, mr: 0.5 }} />
                     Only the name and national ID number of the employee is required, all other fields can be filled after
                     saving. The national ID number is required for uniquely identying an employee on the platform in a real
                     world sense.
                  </Typography>

                  <label className="flex mb-4 flex-col gap-1" htmlFor="name">
                     <span className="px-5">
                        <InfoOutlined
                           fontSize="inherit"
                           titleAccess="Enter the name of the employee"
                           sx={{
                              color: "primary.main",
                              mr: 0.5,
                              mt: -0.3,
                              cursor: "pointer",
                              "&:hover": { color: "primary.light" },
                           }}
                        />{" "}
                        Employee&apos;s full name*
                     </span>
                     <input
                        className="min-w-[300px] d-block rounded-[20px] border-2 shadow px-5 py-1.5"
                        id="name"
                        name="name"
                        minLength={3}
                        required
                     />
                  </label>

                  <label className="flex mb-4 flex-col gap-1" htmlFor="national_id">
                     <span className="px-5">
                        <InfoOutlined
                           fontSize="inherit"
                           titleAccess="The National ID number of your the employee"
                           sx={{
                              color: "primary.main",
                              mr: 0.5,
                              mt: -0.3,
                              cursor: "pointer",
                              "&:hover": { color: "primary.light" },
                           }}
                        />{" "}
                        National ID number*
                     </span>

                     <input
                        className="min-w-[300px] d-block rounded-[20px] border-2 shadow px-5 py-1.5"
                        id="national_id"
                        name="national_id"
                        required
                     />
                  </label>

                  <label className="flex mb-4 flex-col gap-1" htmlFor="employee_id">
                     <span className="px-5">
                        <InfoOutlined
                           fontSize="inherit"
                           titleAccess="The employee's assigned ID within your organization"
                           sx={{
                              color: "primary.main",
                              mr: 0.5,
                              mt: -0.3,
                              cursor: "pointer",
                              "&:hover": { color: "primary.light" },
                           }}
                        />{" "}
                        Employee ID
                     </span>

                     <input
                        className="min-w-[300px] d-block rounded-[20px] border-2 shadow px-5 py-1.5"
                        id="employee_id"
                        name="employee_id"
                     />
                  </label>

                  <label className="flex mb-4 flex-col gap-1" htmlFor="department">
                     <span className="px-5">
                        <InfoOutlined
                           fontSize="inherit"
                           titleAccess="The employee's assigned department within your organization"
                           sx={{
                              color: "primary.main",
                              mr: 0.5,
                              mt: -0.3,
                              cursor: "pointer",
                              "&:hover": { color: "primary.light" },
                           }}
                        />{" "}
                        Department
                     </span>

                     <input
                        className="min-w-[300px] d-block rounded-[20px] border-2 shadow px-5 py-1.5"
                        id="department"
                        name="department"
                        list={employerData ? "department_options" : undefined}
                     />

                     {employerData && (
                        <datalist id="department_options">
                           {employerData.employer.departments?.map((dept) => (
                              <option key={dept} value={dept} />
                           ))}
                        </datalist>
                     )}
                  </label>

                  <label className="flex mb-4 flex-col gap-1" htmlFor="role">
                     <span className="px-5">
                        <InfoOutlined
                           fontSize="inherit"
                           titleAccess="The employee's assigned role/job-position"
                           sx={{
                              color: "primary.main",
                              mr: 0.5,
                              mt: -0.3,
                              cursor: "pointer",
                              "&:hover": { color: "primary.light" },
                           }}
                        />{" "}
                        Role
                     </span>

                     <input
                        className="min-w-[300px] d-block rounded-[20px] border-2 shadow px-5 py-1.5"
                        id="role"
                        name="role"
                     />
                  </label>

                  <label className="flex mb-4 flex-col gap-1" htmlFor="duties">
                     <span className="px-5">
                        <InfoOutlined
                           fontSize="inherit"
                           titleAccess="The employees's assigned duties"
                           sx={{
                              color: "primary.main",
                              mr: 0.5,
                              mt: -0.3,
                              cursor: "pointer",
                              "&:hover": { color: "primary.light" },
                           }}
                        />{" "}
                        Duties
                     </span>

                     <textarea
                        rows={3}
                        maxLength={400}
                        className="min-w-[300px] d-block rounded-[20px] border-2 shadow px-5 py-1.5"
                        id="duties"
                        name="duties"
                     />
                  </label>

                  <label className="flex mb-4 flex-col gap-1" htmlFor="date_started">
                     <span className="px-5">
                        <InfoOutlined
                           fontSize="inherit"
                           titleAccess="The date they started the role"
                           sx={{
                              color: "primary.main",
                              mr: 0.5,
                              mt: -0.3,
                              cursor: "pointer",
                              "&:hover": { color: "primary.light" },
                           }}
                        />{" "}
                        Date started role
                     </span>

                     <input
                        className="min-w-[300px] d-block rounded-[20px] border-2 shadow px-5 py-1.5"
                        id="date_started"
                        name="date_started"
                        type="date"
                     />
                  </label>

                  {/* <label className="flex mb-4 flex-col gap-1" htmlFor="date_left">
                     <span className="px-5">
                        <InfoOutlined
                           fontSize="inherit"
                           titleAccess="The date they left the role, if they've already left"
                           sx={{
                              color: "primary.main",
                              mr: 0.5,
                              mt: -0.3,
                              cursor: "pointer",
                              "&:hover": { color: "primary.light" },
                           }}
                        />{" "}
                        Date left
                     </span>

                     <input
                        className="min-w-[300px] d-block rounded-[20px] border-2 shadow px-5 py-1.5"
                        id="date_left"
                        name="date_left"
                        type="date"
                     />
                  </label> */}
               </Box>

               <div className="text-center mt-5">
                  <Button type="submit" color="success" variant="contained">
                     Add employee
                  </Button>
               </div>
            </form>
         </div>
      </>
   );
}
