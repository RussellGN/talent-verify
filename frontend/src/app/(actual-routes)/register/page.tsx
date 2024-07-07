"use client";

import useRegisterEmployer from "@/hooks/useRegisterEmployer";
import { EmployerRegistrationPayload } from "@/types";
import { ArrowBack, InfoOutlined, WarningOutlined } from "@mui/icons-material";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { redirect } from "next/navigation";
import { FormEvent } from "react";

export default function RegistrationPage() {
   const { isPending, isError, isSuccess, mutate, reset, error } = useRegisterEmployer();

   function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data: EmployerRegistrationPayload = {
         employer: {
            name: formData.get("name")?.toString() || "",
            email: formData.get("email")?.toString() || null,
            registration_number: formData.get("registration_number")?.toString() || null,
            registration_date: formData.get("registration_date")?.toString() || null,
            address: formData.get("address")?.toString() || null,
            contact_person: formData.get("contact_person")?.toString() || null,
            number_of_employees: formData.get("number_of_employees")
               ? Number(formData.get("number_of_employees")?.toString())
               : null,
            contact_phone: formData.get("contact_phone")?.toString() || null,
         },
         "employer-admin": {
            password: formData.get("password")?.toString() || "",
            username: formData.get("username")?.toString() || "",
         },
         departments:
            formData
               .get("departments")
               ?.toString()
               .split(",")
               .map((dep) => dep.trim())
               .filter((dep) => dep.length > 0) || [],
      };
      console.log(data);
      mutate(data);
   }

   if (isSuccess) redirect("/dashboard/employees");

   return (
      <>
         {/* had to return everything but conditionally render content in order to not clear form */}

         {(isPending || isSuccess) && (
            <div className="min-h-[72vh] flex items-center justify-center text-center">
               <div className="w-full max-w-[500px] mx-auto rounded-[20px] shadow-lg bg-white border px-5 sm:px-10 py-20">
                  <CircularProgress />
                  <p>submitting...</p>
               </div>
            </div>
         )}

         {isError && (
            <div className="min-h-[72vh] flex items-center justify-center text-center">
               <div className="w-full max-w-[500px] mx-auto rounded-[20px] shadow-lg bg-white border px-5 sm:px-10 py-20">
                  <WarningOutlined color="error" fontSize="large" />
                  <p>
                     <strong>Registration error</strong> <br /> {error.message}
                     <br />
                     <Button onClick={reset} type="button" startIcon={<ArrowBack />} variant="outlined" sx={{ mt: 3 }}>
                        Back to form
                     </Button>
                  </p>
               </div>
            </div>
         )}

         <div
            className={`min-h-[72vh] ${
               isPending || isError || isSuccess ? "hidden" : "flex"
            } items-center justify-center mt-3`}
         >
            <form onSubmit={handleSubmit} className="w-full">
               <div className="w-full max-w-[500px] mx-auto rounded-[20px] shadow-lg bg-white border px-5 sm:px-10 py-20">
                  <Typography variant="h4" className="text-center" sx={{ mb: 4 }}>
                     Register
                  </Typography>

                  <Box
                     component="fieldset"
                     sx={{ border: "solid 2px", borderColor: "divider", borderRadius: "10px", p: 2, mb: 3 }}
                  >
                     <legend>Employer details</legend>

                     <Typography variant="subtitle2" sx={{ mb: 3, maxWidth: "400px" }}>
                        <InfoOutlined fontSize="inherit" color="warning" sx={{ mt: -0.3, mr: 0.5 }} />
                        Please fill out the following with regards to your organization. Required fields are marked with an
                        asterisk (
                        <Typography component="strong" fontSize="150%">
                           *
                        </Typography>
                        )
                     </Typography>

                     <label className="flex mb-4 flex-col gap-1" htmlFor="name">
                        <span className="px-5">
                           <InfoOutlined
                              fontSize="inherit"
                              titleAccess="Enter the name of your organization"
                              sx={{
                                 color: "primary.main",
                                 mr: 0.5,
                                 mt: -0.3,
                                 cursor: "pointer",
                                 "&:hover": { color: "primary.light" },
                              }}
                           />{" "}
                           Organization&apos;s name*
                        </span>
                        <input
                           className="w-full d-block rounded-[20px] border-2 shadow px-5 py-1.5"
                           id="name"
                           name="name"
                           minLength={3}
                           required
                        />
                     </label>

                     <label className="flex mb-4 flex-col gap-1" htmlFor="email">
                        <span className="px-5">
                           <InfoOutlined
                              fontSize="inherit"
                              titleAccess="The business email address of your organization"
                              sx={{
                                 color: "primary.main",
                                 mr: 0.5,
                                 mt: -0.3,
                                 cursor: "pointer",
                                 "&:hover": { color: "primary.light" },
                              }}
                           />{" "}
                           Email address
                        </span>

                        <input
                           className="w-full d-block rounded-[20px] border-2 shadow px-5 py-1.5"
                           id="email"
                           name="email"
                           type="email"
                           placeholder="enquiries@example.com"
                        />
                     </label>

                     <label className="flex mb-4 flex-col gap-1" htmlFor="address">
                        <span className="px-5">
                           <InfoOutlined
                              fontSize="inherit"
                              titleAccess="Your organization's physical address"
                              sx={{
                                 color: "primary.main",
                                 mr: 0.5,
                                 mt: -0.3,
                                 cursor: "pointer",
                                 "&:hover": { color: "primary.light" },
                              }}
                           />{" "}
                           Address
                        </span>

                        <input
                           className="w-full d-block rounded-[20px] border-2 shadow px-5 py-1.5"
                           id="address"
                           name="address"
                           placeholder="physical address"
                        />
                     </label>

                     <label className="flex mb-4 flex-col gap-1" htmlFor="contact_person">
                        <span className="px-5">
                           <InfoOutlined
                              fontSize="inherit"
                              titleAccess="Your organization's main contact person"
                              sx={{
                                 color: "primary.main",
                                 mr: 0.5,
                                 mt: -0.3,
                                 cursor: "pointer",
                                 "&:hover": { color: "primary.light" },
                              }}
                           />{" "}
                           Contact person
                        </span>

                        <input
                           className="w-full d-block rounded-[20px] border-2 shadow px-5 py-1.5"
                           id="contact_person"
                           name="contact_person"
                           placeholder="full name of contact person"
                        />
                     </label>

                     <label className="flex mb-4 flex-col gap-1" htmlFor="contact_phone">
                        <span className="px-5">
                           <InfoOutlined
                              fontSize="inherit"
                              titleAccess="Your organization's contact details"
                              sx={{
                                 color: "primary.main",
                                 mr: 0.5,
                                 mt: -0.3,
                                 cursor: "pointer",
                                 "&:hover": { color: "primary.light" },
                              }}
                           />{" "}
                           Contact phone
                        </span>

                        <input
                           className="w-full d-block rounded-[20px] border-2 shadow px-5 py-1.5"
                           id="contact_phone"
                           name="contact_phone"
                        />
                     </label>

                     <label className="flex mb-4 flex-col gap-1" htmlFor="registration_number">
                        <span className="px-5">
                           <InfoOutlined
                              fontSize="inherit"
                              titleAccess="Your organization's registration number"
                              sx={{
                                 color: "primary.main",
                                 mr: 0.5,
                                 mt: -0.3,
                                 cursor: "pointer",
                                 "&:hover": { color: "primary.light" },
                              }}
                           />{" "}
                           Registration number
                        </span>

                        <input
                           className="w-full d-block rounded-[20px] border-2 shadow px-5 py-1.5"
                           id="registration_number"
                           name="registration_number"
                        />
                     </label>

                     <label className="flex mb-4 flex-col gap-1" htmlFor="registration_date">
                        <span className="px-5">
                           <InfoOutlined
                              fontSize="inherit"
                              titleAccess="Your organization's registration date"
                              sx={{
                                 color: "primary.main",
                                 mr: 0.5,
                                 mt: -0.3,
                                 cursor: "pointer",
                                 "&:hover": { color: "primary.light" },
                              }}
                           />{" "}
                           Registration date
                        </span>

                        <input
                           className="w-full d-block rounded-[20px] border-2 shadow px-5 py-1.5"
                           id="registration_date"
                           name="registration_date"
                           type="date"
                        />
                     </label>

                     <label className="flex mb-4 flex-col gap-1" htmlFor="number_of_employees">
                        <span className="px-5">
                           <InfoOutlined
                              fontSize="inherit"
                              titleAccess="Your the number of employees at your organization"
                              sx={{
                                 color: "primary.main",
                                 mr: 0.5,
                                 mt: -0.3,
                                 cursor: "pointer",
                                 "&:hover": { color: "primary.light" },
                              }}
                           />{" "}
                           Number of employees
                        </span>

                        <input
                           className="w-full d-block rounded-[20px] border-2 shadow px-5 py-1.5"
                           id="number_of_employees"
                           name="number_of_employees"
                           type="number"
                           min={0}
                        />
                     </label>

                     <label className="flex mb-4 flex-col gap-1" htmlFor="departments">
                        <span className="px-5">
                           <InfoOutlined
                              fontSize="inherit"
                              titleAccess="List of departments at your organization"
                              sx={{
                                 color: "primary.main",
                                 mr: 0.5,
                                 mt: -0.3,
                                 cursor: "pointer",
                                 "&:hover": { color: "primary.light" },
                              }}
                           />{" "}
                           List of departments (separated by commas)
                        </span>

                        <textarea
                           className="w-full d-block rounded-[20px] border-2 shadow px-5 py-1.5"
                           id="departments"
                           name="departments"
                           placeholder="department 1, department 2, department 3, department 4"
                           rows={2}
                        />
                     </label>
                  </Box>

                  <Box
                     component="fieldset"
                     sx={{ border: "solid 2px", borderColor: "divider", borderRadius: "10px", p: 2, mb: 3 }}
                  >
                     <legend>Employer admin details</legend>

                     <Typography variant="subtitle2" sx={{ mb: 3, maxWidth: "400px" }}>
                        <InfoOutlined fontSize="inherit" color="warning" sx={{ mt: -0.3, mr: 0.5 }} />
                        Credentials of the person administering the organization&apos;s account on the platform, to be used
                        for logging in. For the username, we recommend one thats neutral to the organization. It should also
                        be unique{" "}
                     </Typography>

                     <label className="flex mb-4 flex-col gap-1" htmlFor="username">
                        <span className="px-5">
                           <InfoOutlined
                              fontSize="inherit"
                              titleAccess="Enter the employer administrator's username"
                              sx={{
                                 color: "primary.main",
                                 mr: 0.5,
                                 mt: -0.3,
                                 cursor: "pointer",
                                 "&:hover": { color: "primary.light" },
                              }}
                           />{" "}
                           Username*
                        </span>
                        <input
                           className="w-full d-block rounded-[20px] border-2 shadow px-5 py-1.5"
                           id="username"
                           name="username"
                           placeholder="example: <org> talent admin"
                           minLength={3}
                           required
                        />
                     </label>

                     <label className="flex mb-4 flex-col gap-1" htmlFor="password">
                        <span className="px-5">
                           <InfoOutlined
                              fontSize="inherit"
                              titleAccess="Enter the employer administrator's password"
                              sx={{
                                 color: "primary.main",
                                 mr: 0.5,
                                 mt: -0.3,
                                 cursor: "pointer",
                                 "&:hover": { color: "primary.light" },
                              }}
                           />{" "}
                           Password*
                        </span>
                        <input
                           className="w-full d-block rounded-[20px] border-2 shadow px-5 py-1.5"
                           id="password"
                           name="password"
                           placeholder="Choose a strong password"
                           type="password"
                           minLength={3}
                           required
                        />
                     </label>
                  </Box>

                  <div className="text-center mt-5">
                     <Button type="submit" color="success" variant="contained">
                        Register
                     </Button>
                  </div>
               </div>
            </form>
         </div>
      </>
   );
}
