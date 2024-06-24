import { Typography } from "@mui/material";
import SearchForm from "../components/SearchForm";

export default function Home() {
   return (
      <main className="min-h-[75vh] text-center flex items-center justify-center p-5">
         <div>
            <Typography variant="h4" sx={{ mb: 2 }}>
               Search and verify talent&apos;s employment history
            </Typography>

            <Typography className="max-w-prose" sx={{ px: 4, mb: 3, mx: "auto" }}>
               You can search by name, employer, position, department, year-started or year-left and even national ID for
               exact matches
            </Typography>
            <SearchForm />
         </div>
      </main>
   );
}
