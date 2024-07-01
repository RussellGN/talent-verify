import { PropsWithChildren } from "react";
import { Grid } from "@mui/material";
import DashboardSidebar from "@/app/components/DashboardSidebar";

export default function DashboardLayout({ children }: PropsWithChildren) {
   return (
      <div className="min-h-[72vh] relative mt-5">
         <Grid container spacing={2} wrap="nowrap">
            <Grid item xs={12} md={2}>
               <DashboardSidebar />
            </Grid>

            <Grid item xs={12} md={10}>
               <div>{children}</div>
            </Grid>
         </Grid>
      </div>
   );
}
