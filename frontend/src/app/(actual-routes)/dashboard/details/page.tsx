"use client";

import useEmployer from "@/hooks/useEmployer";
import useUpdateEmployer from "@/hooks/useUpdateEmployer";
import { EmployerUpdatePayload } from "@/types";
import { ArrowBack, CheckCircle, InfoOutlined, WarningOutlined } from "@mui/icons-material";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { FormEvent } from "react";

export default function DetailsPage() {
   const {
      data: defaultData,
      isPending: loadingDetails,
      isError: errorLoadingDetails,
      error: detailsError,
   } = useEmployer();
   const {
      mutate,
      reset,
      isPending: isSubmitting,
      isSuccess: isSubmitSuccess,
      isError: isSubmitError,
      error: submitError,
   } = useUpdateEmployer();

   function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data: EmployerUpdatePayload = {
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

      // only add password if password value changed
      if (formData.get("password")) data["employer-admin"].password = formData.get("password")?.toString();

      console.log(data);
      mutate(data);
   }

   if (loadingDetails) {
      return (
         <div className="p-5 text-center">
            <CircularProgress />
         </div>
      );
   }

   if (errorLoadingDetails) throw detailsError;

   if (isSubmitSuccess) {
      return (
         <div className="text-center max-w-prose mx-auto py-20">
            <CheckCircle fontSize="large" color="success" className="mb-3" />
            <p>
               Details updated successfully!
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

         {isSubmitting && (
            <div className="text-center px-10 py-20">
               <CircularProgress />
               <p>submitting...</p>
            </div>
         )}

         {isSubmitError && (
            <div className="text-center px-10 py-20">
               <WarningOutlined color="error" fontSize="large" />
               <p>
                  <strong>Update error</strong> <br /> {submitError.message}
                  <br />
                  <Button onClick={reset} type="button" startIcon={<ArrowBack />} variant="outlined" sx={{ mt: 3 }}>
                     Back to form
                  </Button>
               </p>
            </div>
         )}

         <div className={`min-h-[72vh] ${isSubmitting || isSubmitError ? "hidden" : "flex"} items-center justify-center`}>
            <form onSubmit={handleSubmit}>
               <Box
                  component="fieldset"
                  sx={{ border: "solid 2px", borderColor: "divider", borderRadius: "10px", p: 2, mb: 3 }}
               >
                  <legend>Employer details</legend>

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
                        className="min-w-[300px] d-block rounded-[20px] border-2 shadow px-5 py-1.5"
                        id="name"
                        name="name"
                        minLength={3}
                        defaultValue={defaultData.employer.name}
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
                        className="min-w-[300px] d-block rounded-[20px] border-2 shadow px-5 py-1.5"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="enquiries@example.com"
                        defaultValue={defaultData.employer.email || undefined}
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
                        className="min-w-[300px] d-block rounded-[20px] border-2 shadow px-5 py-1.5"
                        id="address"
                        name="address"
                        placeholder="physical address"
                        defaultValue={defaultData.employer.address || undefined}
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
                        className="min-w-[300px] d-block rounded-[20px] border-2 shadow px-5 py-1.5"
                        id="contact_person"
                        name="contact_person"
                        placeholder="full name of contact person"
                        defaultValue={defaultData.employer.contact_person || undefined}
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
                        className="min-w-[300px] d-block rounded-[20px] border-2 shadow px-5 py-1.5"
                        id="contact_phone"
                        name="contact_phone"
                        defaultValue={defaultData.employer.contact_phone || undefined}
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
                        className="min-w-[300px] d-block rounded-[20px] border-2 shadow px-5 py-1.5"
                        id="registration_number"
                        name="registration_number"
                        defaultValue={defaultData.employer.registration_number || undefined}
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
                        className="min-w-[300px] d-block rounded-[20px] border-2 shadow px-5 py-1.5"
                        id="registration_date"
                        name="registration_date"
                        type="date"
                        defaultValue={defaultData.employer.registration_date || undefined}
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
                        className="min-w-[300px] d-block rounded-[20px] border-2 shadow px-5 py-1.5"
                        id="number_of_employees"
                        name="number_of_employees"
                        type="number"
                        min={0}
                        defaultValue={defaultData.employer.number_of_employees || undefined}
                     />
                  </label>
               </Box>

               <Box
                  component="fieldset"
                  sx={{ border: "solid 2px", borderColor: "divider", borderRadius: "10px", p: 2, mb: 3 }}
               >
                  <legend>Employer admin details</legend>

                  <Typography variant="subtitle2" sx={{ mb: 3 }}>
                     <InfoOutlined fontSize="inherit" color="warning" sx={{ mt: -0.3, mr: 0.5 }} />
                     Credentials of the person administering the organization&apos;s account on the platform, to be used for
                     logging in. For the username, we recommend one thats neutral to the organization. It should also be
                     unique{" "}
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
                        className="min-w-[300px] d-block rounded-[20px] border-2 shadow px-5 py-1.5"
                        id="username"
                        name="username"
                        placeholder="example: <org> talent admin"
                        minLength={3}
                        defaultValue={defaultData.employer.administrator.username}
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
                        className="min-w-[300px] d-block rounded-[20px] border-2 shadow px-5 py-1.5"
                        id="password"
                        name="password"
                        placeholder="Choose a strong password"
                        type="password"
                        minLength={3}
                        defaultValue={defaultData.employer.administrator.password}
                     />
                  </label>
               </Box>

               <div className="text-center mt-5">
                  <Button type="submit" color="success" variant="contained">
                     Save Changes
                  </Button>
               </div>
            </form>
         </div>
      </>
   );
}
