import { EmployerInterface } from "@/interfaces";
import { friendlyDate } from "@/lib";
import {
   Business,
   CalendarMonth,
   Email,
   KeyboardArrowDown,
   KeyboardArrowUp,
   LocationOff,
   People,
   Person,
   Phone,
} from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useState } from "react";

export default function EmployerDetailsExpandable({ employer }: { employer: EmployerInterface }) {
   const [expanded, setExpanded] = useState(false);

   return (
      <>
         <button className="p-0 border-0 bg-transparent text-[goldenrod]" onClick={() => setExpanded((prev) => !prev)}>
            {expanded ? "hide details" : "show details"}
            {expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
         </button>

         {expanded && (
            <div className="border rounded-md px-1 py-2">
               <Typography component="p" variant="caption" sx={{ mb: 0.5 }}>
                  <Email sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" /> Email: {employer.email || "N/A"}
               </Typography>
               <Typography component="p" variant="caption" sx={{ mb: 0.5 }}>
                  <LocationOff sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" /> Address:{" "}
                  {employer.address || "N/A"}
               </Typography>
               <Typography component="p" variant="caption" sx={{ mb: 0.5 }}>
                  <Person sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" /> Contact person:{" "}
                  {employer.contact_person || "N/A"}
               </Typography>
               <Typography component="p" variant="caption" sx={{ mb: 0.5 }}>
                  <Phone sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" /> Contact phone:{" "}
                  {employer.contact_phone || "N/A"}
               </Typography>
               <Typography component="p" variant="caption" sx={{ mb: 0.5 }}>
                  <Business sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" /> Reg number:{" "}
                  {employer.registration_number || "N/A"}
               </Typography>
               <Typography component="p" variant="caption" sx={{ mb: 0.5 }}>
                  <CalendarMonth sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" /> Reg date:{" "}
                  {employer.registration_date ? friendlyDate(employer.registration_date) : "N/A"}
               </Typography>
               <Typography component="p" variant="caption" sx={{ mb: 0.5 }}>
                  <People sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" /> Employees:{" "}
                  {employer.number_of_employees || "N/A"}
               </Typography>
            </div>
         )}
      </>
   );
}
