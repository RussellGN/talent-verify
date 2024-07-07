import { Typography } from "@mui/material";
import SearchForm from "../../components/SearchForm";

export default function HomePage() {
   return (
      <div className="min-h-[72vh] text-center flex items-center justify-center p-5">
         <div>
            <Typography variant="h4" sx={{ mb: 2 }}>
               Search and{" "}
               <Typography fontWeight="bold" fontSize="inherit" component="span" sx={{ color: "success.light", mb: 2 }}>
                  verify
               </Typography>{" "}
               people&apos;s employment history
            </Typography>

            <Typography variant="subtitle1" className="max-w-prose" sx={{ px: 4, mb: 3, mx: "auto" }}>
               Search by name, employer, role, department, year-started or year-left and even national ID for exact matches
            </Typography>
            <SearchForm />
         </div>
      </div>
   );
}
