"use client";

import useGetEmployerWithID from "@/hooks/useGetEmployerWithID";
import { friendlyDate } from "@/lib";
import { Business, CalendarMonth, Email, LocationOff, People, Person, Phone } from "@mui/icons-material";
import { CircularProgress, Grid, Typography } from "@mui/material";

export default function EmployerDetailsPage({ params: { id } }: { params: { id: string } }) {
   const { isPending, isError, data: employer, error } = useGetEmployerWithID(id);

   if (isPending) {
      return (
         <div className="min-h-[550px] pt-[4rem] text-center">
            <CircularProgress />
            <p>Loading...</p>
         </div>
      );
   }

   if (isError) throw error;

   return (
      <div className="min-h-[550px] mt-5">
         <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
            <Business sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" /> {employer.name}
         </Typography>

         <Grid container spacing={2} justifyContent="center" alignItems="stretch">
            <Grid item xs={12} md={5}>
               <div className="h-full bg-white shadow-md border rounded-[15px] px-4 py-8">
                  <Typography sx={{ mb: 2 }}>
                     <Email sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" /> Email: {employer.email || "N/A"}
                  </Typography>
                  <Typography sx={{ mb: 2 }}>
                     <LocationOff sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" /> Address:{" "}
                     {employer.address || "N/A"}
                  </Typography>
                  <Typography sx={{ mb: 2 }}>
                     <Person sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" /> Contact person:{" "}
                     {employer.contact_person || "N/A"}
                  </Typography>
                  <Typography sx={{ mb: 2 }}>
                     <Phone sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" /> Contact phone:{" "}
                     {employer.contact_phone || "N/A"}
                  </Typography>
               </div>
            </Grid>

            <Grid item xs={12} md={5}>
               <div className="h-full bg-white shadow-md border rounded-[15px] px-4 py-8">
                  <Typography sx={{ mb: 2 }}>
                     <Business sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" /> Reg number:{" "}
                     {employer.registration_number || "N/A"}
                  </Typography>
                  <Typography sx={{ mb: 2 }}>
                     <CalendarMonth sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" /> Reg date:{" "}
                     {employer.registration_date ? friendlyDate(employer.registration_date) : "N/A"}
                  </Typography>
                  <Typography sx={{ mb: 2 }}>
                     <People sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" /> Employees:{" "}
                     {employer.number_of_employees || "N/A"}
                  </Typography>
               </div>
            </Grid>
         </Grid>
      </div>
   );
}
