"use client";

import { Business } from "@mui/icons-material";
import { Button } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useEmployer from "../hooks/useEmployer";
import useLogout from "../hooks/useLogout";

export default function NavbarAuthButtons() {
   const { isPending, isSuccess, data } = useEmployer();
   const { logout, logoutPending } = useLogout();
   const pathname = usePathname();

   if (isPending) return;

   if (isSuccess) {
      return (
         <>
            <Button
               variant="outlined"
               disabled={logoutPending}
               startIcon={<Business />}
               component={Link}
               href="/dashboard/employees"
            >
               {data.employer.name}
            </Button>
            <Button disabled={logoutPending} onClick={() => logout()}>
               {logoutPending ? "Logging Out..." : "Logout"}
            </Button>
         </>
      );
   }

   console.log(pathname, pathname === "/register");
   return (
      <>
         <Button component={Link} href="/login" sx={{ display: pathname === "/login" ? "none" : "inline-flex" }}>
            Login
         </Button>

         <Button
            component={Link}
            href="/register"
            sx={{ display: pathname === "/register" ? "none" : "inline-flex" }}
            color="success"
         >
            Register Employer
         </Button>
      </>
   );
}
