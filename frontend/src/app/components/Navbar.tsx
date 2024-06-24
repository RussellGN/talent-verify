import { Business, Verified } from "@mui/icons-material";
import { Button, Link as MuiLink } from "@mui/material";
import Link from "next/link";
import GoBack from "./GoBack";

export default function Navbar() {
   return (
      <header>
         <div className="flex items-center justify-between border shadow-md px-4 py-2 rounded-lg">
            <MuiLink
               underline="none"
               component={Link}
               href="/"
               className="flex items-center gap-1"
               variant="h5"
               color="inherit"
            >
               <Verified color="primary" fontSize="inherit" />
               <span>Talent Verify</span>
            </MuiLink>

            <nav className="flex items-center gap-5">
               <MuiLink component={Link} href="/">
                  Home
               </MuiLink>

               <Button component={Link} href="/login" sx={{ textTransform: "capitalize" }} variant="contained">
                  Employer Login
               </Button>

               <Button
                  component={Link}
                  href="/signup"
                  sx={{ textTransform: "capitalize" }}
                  variant="contained"
                  color="success"
               >
                  Employer Signup
               </Button>

               <>
                  <Button startIcon={<Business />} component={Link} href="/dashboard/details">
                     Econet
                  </Button>
                  <Button sx={{ textTransform: "capitalize" }} variant="contained">
                     Logout
                  </Button>
               </>
            </nav>
         </div>

         <div className="mt-3">
            <GoBack />
         </div>
      </header>
   );
}