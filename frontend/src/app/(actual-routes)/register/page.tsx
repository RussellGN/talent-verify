import { InfoOutlined } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";

export default function LoginPage() {
   return (
      <div className="min-h-[65vh] flex items-center justify-center">
         <form>
            <div className="w-full min-w-[400px] rounded-[20px] shadow-lg bg-slate-50 border px-10 py-20">
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
                        className="min-w-[300px] d-block rounded-[20px] border-2 shadow px-5 py-1.5"
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
                        className="min-w-[300px] d-block rounded-[20px] border-2 shadow px-5 py-1.5"
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
                        className="min-w-[300px] d-block rounded-[20px] border-2 shadow px-5 py-1.5"
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
                        className="min-w-[300px] d-block rounded-[20px] border-2 shadow px-5 py-1.5"
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
                        className="min-w-[300px] d-block rounded-[20px] border-2 shadow px-5 py-1.5"
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
                        className="min-w-[300px] d-block rounded-[20px] border-2 shadow px-5 py-1.5"
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
                        className="min-w-[300px] d-block rounded-[20px] border-2 shadow px-5 py-1.5"
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
                        className="min-w-[300px] d-block rounded-[20px] border-2 shadow px-5 py-1.5"
                        id="number_of_employees"
                        name="number_of_employees"
                        type="number"
                        min={0}
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
   );
}
