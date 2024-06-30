import { PropsWithChildren } from "react";

import { sampleEmployers } from "@/app/data/sampleData";
import { capitalizeWords } from "@/app/lib";
import { Grid, Typography } from "@mui/material";
import { Business, InfoOutlined, People } from "@mui/icons-material";
import NavLink from "@/app/components/NavLink";

export default function DashboardLayout({ children }: PropsWithChildren) {
   const employer = sampleEmployers[0];

   return (
      <div className="min-h-[72vh] relative mt-5">
         <Grid container spacing={2} wrap="nowrap">
            <Grid item xs={12} md={2}>
               <div className="md:sticky top-[110px] shadow-md border rounded-[20px] px-3 py-5">
                  <Typography className="border-b" variant="h6" sx={{ mb: 2, pb: 1 }}>
                     <Business fontSize="inherit" sx={{ mt: -0.3, mr: 0.5 }} />
                     {capitalizeWords(employer.name)}
                  </Typography>

                  <div className="flex flex-col items-start justify-start gap-3">
                     <NavLink icon={<People />} href="/dashboard/employees">
                        Employees
                     </NavLink>
                     <NavLink icon={<InfoOutlined />} href="/dashboard/details">
                        Details
                     </NavLink>
                  </div>
               </div>
            </Grid>

            <Grid item xs={12} md={10}>
               <div>{children}</div>
            </Grid>
         </Grid>
      </div>
   );
}
