"use client";

import useLoginEmployer from "@/hooks/useLoginEmployer";
import { Credentials } from "@/types";
import { ArrowBack, InfoOutlined, WarningOutlined } from "@mui/icons-material";
import { Button, CircularProgress, Typography } from "@mui/material";
import { redirect } from "next/navigation";
import { FormEvent } from "react";

export default function LoginPage() {
   const { isPending, isError, isSuccess, mutate, reset, error } = useLoginEmployer();

   function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const credentials: Credentials = {
         password: formData.get("password")?.toString() || "",
         username: formData.get("username")?.toString() || "",
      };
      mutate(credentials);
   }

   if (isSuccess) redirect("/dashboard/employees");

   return (
      <>
         {/* had to return everything but conditionally render content in order to not clear form */}

         {(isPending || isSuccess) && (
            <div className="min-h-[550px] flex items-center justify-center text-center">
               <div className="w-full max-w-[400px] mx-auto rounded-[20px] shadow-lg bg-white border px-5 sm:px-10 py-20">
                  <CircularProgress />
                  <p>submitting...</p>
               </div>
            </div>
         )}

         {isError && (
            <div className="min-h-[550px] flex items-center justify-center text-center">
               <div className="w-full max-w-[400px] mx-auto rounded-[20px] shadow-lg bg-white border px-5 sm:px-10 py-20">
                  <WarningOutlined color="error" fontSize="large" />
                  <p>
                     <strong>Login error</strong> <br /> {error.message}
                     <br />
                     <Button onClick={reset} type="button" startIcon={<ArrowBack />} variant="outlined" sx={{ mt: 3 }}>
                        Back to form
                     </Button>
                  </p>
               </div>
            </div>
         )}

         <div
            className={`min-h-[550px] ${isPending || isError || isSuccess ? "hidden" : "flex"} items-center justify-center`}
         >
            <form onSubmit={handleSubmit} className="w-full">
               <div className="w-full max-w-[400px] mx-auto rounded-[20px] shadow-lg bg-white border px-5 sm:px-10 py-20">
                  <Typography variant="h4" className="text-center" sx={{ mb: 4 }}>
                     Login
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
                        Username
                     </span>
                     <input
                        className="w-full d-block rounded-[20px] border-2 shadow px-5 py-1.5"
                        id="username"
                        name="username"
                        placeholder="employer admin username"
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
                        Password
                     </span>
                     <input
                        className="w-full d-block rounded-[20px] border-2 shadow px-5 py-1.5"
                        id="password"
                        name="password"
                        placeholder="employer admin password"
                        type="password"
                        minLength={3}
                        required
                     />
                  </label>

                  <div className="text-center mt-5">
                     <Button type="submit" variant="contained">
                        Login
                     </Button>
                  </div>
               </div>
            </form>
         </div>
      </>
   );
}
