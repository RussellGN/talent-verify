import { Box, Typography } from "@mui/material";
import { UnormalizedCurrentEmployeeInterface } from "../interfaces";
import { capitalizeWords, friendlyDate } from "../lib";
import Link from "next/link";
import { ArrowForward, Business, Contacts, People, AccessTime, Work } from "@mui/icons-material";

export default function CareerTimestampCard({ careerTimestamp }: { careerTimestamp: UnormalizedCurrentEmployeeInterface }) {
   return (
      <Box
         component={Link}
         href={`/search/${careerTimestamp.id}`}
         className="block border-slate-300 border-2 bg-slate-50 hover:bg-white hover:border-slate-400  shadow-md rounded-xl p-3"
      >
         <Typography className="border-b" variant="h6" sx={{ mb: 1, pb: 0.2 }}>
            {capitalizeWords(careerTimestamp.name)}
         </Typography>
         <Typography sx={{ mb: 0.5 }}>
            <Contacts sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" /> National ID:{" "}
            {careerTimestamp.national_id}
         </Typography>
         <Typography sx={{ mb: 0.5 }}>
            <Business sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" /> Employer:{" "}
            {careerTimestamp.employer || ""}
         </Typography>
         <Typography sx={{ mb: 0.5 }}>
            <People sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" /> Department:{" "}
            {careerTimestamp.department || ""}
         </Typography>
         <Typography sx={{ mb: 0.5 }}>
            <Work sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" /> Role: {careerTimestamp.role || ""}
         </Typography>

         <br />
         <Typography sx={{ mb: 0.5 }}>
            <AccessTime sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" />
            Date started: {careerTimestamp.date_started ? friendlyDate(careerTimestamp.date_started) : "N/A"}
         </Typography>
         {careerTimestamp.date_left ? (
            <Typography sx={{ mb: 0.5 }}>
               <AccessTime sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" />
               Date left:
               {friendlyDate(careerTimestamp.date_left)}
            </Typography>
         ) : (
            <Typography sx={{ mb: 0.5 }}>
               <AccessTime sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" />
               Ongoing
            </Typography>
         )}

         <Typography color="primary" sx={{ mt: 2 }} className="flex items-center justify-end text-right gap-2 px-2">
            <ArrowForward />
            View
         </Typography>
      </Box>
   );
}
