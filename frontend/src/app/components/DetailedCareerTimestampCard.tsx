import { Box, Typography } from "@mui/material";
import { HistoricalCareerTimestampInterface } from "../interfaces";
import { friendlyDate } from "../lib";
import { Business, People, AccessTime, Work, InfoSharp } from "@mui/icons-material";

export default function DetailedCareerTimestampCard({
   careerTimestamp,
}: {
   careerTimestamp: HistoricalCareerTimestampInterface;
}) {
   return (
      <Box className="block border-slate-300 border-2 bg-slate-50   shadow-md rounded-xl p-3">
         <Typography sx={{ mb: 0.5 }}>
            <Business sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" /> Employer:{" "}
            {careerTimestamp.employer || "N/A"}
         </Typography>
         <Typography sx={{ mb: 0.5 }}>
            <People sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" /> Department:{" "}
            {careerTimestamp.department || "N/A"}
         </Typography>
         <Typography sx={{ mb: 0.5 }}>
            <Work sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" /> Role: {careerTimestamp.role || "N/A"}
         </Typography>

         <br />
         <Typography sx={{ mb: 0.5 }}>
            <AccessTime sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" />
            Date started: {careerTimestamp.date_started ? friendlyDate(careerTimestamp.date_started) : "N/A"}
         </Typography>
         <Typography sx={{ mb: 0.5 }}>
            <AccessTime sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" />
            Date left: {careerTimestamp.date_left ? friendlyDate(careerTimestamp.date_left) : "_"}
         </Typography>
         {/* {careerTimestamp.date_left ? (
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
         )} */}
         <br />
         <Typography sx={{ mb: 0.5 }}>
            <InfoSharp sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" />
            Duties: {careerTimestamp.duties || "N/A"}
         </Typography>
      </Box>
   );
}
