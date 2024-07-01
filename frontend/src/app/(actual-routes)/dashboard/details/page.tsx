import { sampleEmployers } from "@/data/sampleData";
import { InfoOutlined } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";

export default function DetailsPage() {
   const employer = sampleEmployers[0];

   return (
      <form>
         <Box component="fieldset" sx={{ border: "solid 2px", borderColor: "divider", borderRadius: "10px", p: 2, mb: 3 }}>
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
                  defaultValue={employer.name}
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
                  defaultValue={employer.email || undefined}
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
                  defaultValue={employer.address || undefined}
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
                  defaultValue={employer.contact_person || undefined}
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
                  defaultValue={employer.contact_phone || undefined}
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
                  defaultValue={employer.registration_number || undefined}
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
                  defaultValue={employer.registration_date || undefined}
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
                  defaultValue={employer.number_of_employees || undefined}
               />
            </label>
         </Box>

         <Box component="fieldset" sx={{ border: "solid 2px", borderColor: "divider", borderRadius: "10px", p: 2, mb: 3 }}>
            <legend>Employer admin details</legend>

            <Typography variant="subtitle2" sx={{ mb: 3 }}>
               <InfoOutlined fontSize="inherit" color="warning" sx={{ mt: -0.3, mr: 0.5 }} />
               Credentials of the person administering the organization&apos;s account on the platform, to be used for
               logging in. For the username, we recommend one thats neutral to the organization. It should also be unique{" "}
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
                  defaultValue={employer.administrator.username}
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
                  defaultValue={employer.administrator.password}
                  required
               />
            </label>
         </Box>

         <div className="text-center mt-5">
            <Button type="submit" color="success" variant="contained">
               Save Changes
            </Button>
         </div>
      </form>
   );
}
