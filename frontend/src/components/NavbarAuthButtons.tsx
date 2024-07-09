"use client";

import { Business } from "@mui/icons-material";
import { Button, Skeleton } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useEmployer from "../hooks/useEmployer";
import useLogout from "../hooks/useLogout";

export default function NavbarAuthButtons() {
   const { isPending, isSuccess, data } = useEmployer();
   const { logout, logoutPending } = useLogout();
   const pathname = usePathname();

   if (isPending)
      return (
         <span className="inline-flex gap-1.5">
            <Skeleton variant="rectangular" sx={{ borderRadius: "5px" }} animation="wave" width="8ch" height="3ch" />
            <Skeleton variant="rectangular" sx={{ borderRadius: "5px" }} animation="wave" width="10ch" height="3ch" />
         </span>
      );

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
