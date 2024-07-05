import { Verified } from "@mui/icons-material";
import { Link as MuiLink } from "@mui/material";
import Link from "next/link";
import GoBack from "./GoBack";
import NavbarAuthButtons from "./NavbarAuthButtons";

export default function Navbar() {
   return (
      <header className="sticky top-0 z-10 ">
         <div className="bg-white flex items-center justify-between border shadow-md px-2 sm:px-4 py-2 rounded-lg">
            <MuiLink
               underline="none"
               component={Link}
               href="/"
               className="flex items-center gap-1"
               variant="h5"
               color="inherit"
            >
               <Verified sx={{ color: "primary.light" }} fontSize="inherit" />
               <span className="hidden sm:inline">Talent Verify</span>
               <span className="sm:hidden">TV</span>
            </MuiLink>

            <nav className="flex items-center gap-2 sm:gap-5">
               <MuiLink component={Link} href="/" sx={{ display: { xs: "none", sm: "inline-block" } }}>
                  Home
               </MuiLink>

               <NavbarAuthButtons />
            </nav>
         </div>

         <div className="mt-1 sm:mt-3 w-fit bg-[whitesmoke]">
            <GoBack />
         </div>
      </header>
   );
}
