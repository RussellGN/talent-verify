"use client";

import { Business } from "@mui/icons-material";
import { Button } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import useEmployer from "../hooks/useEmployer";
import useLogout from "../hooks/useLogout";

export default function NavbarAuthButtons() {
   const { isPending, isSuccess, data } = useEmployer();
   const { mutate: logout, isPending: logoutPending, isSuccess: logoutSuccess, error: logoutError } = useLogout();
   const pathname = usePathname();

   if (isPending) return;

   if (logoutError) throw logoutError;

   return (
      <>
         {isSuccess ? (
            <>
               <Button startIcon={<Business />} component={Link} href="/dashboard/employees">
                  {data.employer.name}
               </Button>
               <Button
                  disabled={logoutPending}
                  className={logoutSuccess ? "hidden" : ""}
                  onClick={() => logout()}
                  sx={{ textTransform: "capitalize" }}
                  variant="contained"
               >
                  {logoutPending ? "logging out..." : "Logout"}
               </Button>
            </>
         ) : (
            <>
               <Button
                  component={Link}
                  href="/login"
                  sx={{ textTransform: "capitalize" }}
                  className={pathname === "/login" ? "hidden" : ""}
                  variant="contained"
               >
                  Employer Login
               </Button>

               <Button
                  component={Link}
                  href="/register"
                  sx={{ textTransform: "capitalize" }}
                  className={pathname === "/register" ? "hidden" : ""}
                  variant="contained"
                  color="success"
               >
                  Register Employer
               </Button>
            </>
         )}
      </>
   );
}
