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
      console.log(credentials);
      mutate(credentials);
   }

   if (isSuccess) redirect("/dashboard/employees");

   return (
      <>
         {/* had to return everything but conditionally render content in order to not clear form */}

         {(isPending || isSuccess) && (
            <div className="min-h-[72vh] flex items-center justify-center">
               <div className="w-full text-center max-w-[500px] min-w-[400px] rounded-[20px] shadow-lg bg-slate-50 border px-10 py-20">
                  <CircularProgress />
                  <p>submitting...</p>
               </div>
            </div>
         )}

         {isError && (
            <div className="min-h-[72vh] flex items-center justify-center">
               <div className="w-full max-w-[500px] text-center min-w-[400px] rounded-[20px] shadow-lg bg-slate-50 border px-10 py-20">
                  <WarningOutlined color="error" fontSize="large" />
                  <p>
                     <strong>Login error</strong> <br /> {error.message}
                     <br />
                     <Button
                        onClick={reset}
                        type="button"
                        startIcon={<ArrowBack />}
                        variant="outlined"
                        sx={{ mt: 3, textTransform: "capitalize" }}
                     >
                        Back to form
                     </Button>
                  </p>
               </div>
            </div>
         )}

         <div
            className={`min-h-[72vh] ${isPending || isError || isSuccess ? "hidden" : "flex"} items-center justify-center`}
         >
            <form onSubmit={handleSubmit}>
               <div className="w-full min-w-[400px] rounded-[20px] shadow-lg bg-slate-50 border px-10 py-20">
                  <Typography variant="h4" className="text-center" sx={{ mb: 4 }}>
                     Login
                  </Typography>
                  <label className="flex mb-4 flex-col gap-1" htmlFor="password">
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
                        className="min-w-[300px] d-block rounded-[20px] border-2 shadow px-5 py-1.5"
                        id="username"
                        name="username"
                        placeholder="Admin password"
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
                        className="min-w-[300px] d-block rounded-[20px] border-2 shadow px-5 py-1.5"
                        id="password"
                        name="password"
                        placeholder="Admin password"
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
