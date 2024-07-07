import { Box, Typography } from "@mui/material";
import { HistoricalCareerTimestampInterface } from "../interfaces";
import { friendlyDate } from "../lib";
import { Business, People, AccessTime, Work, InfoSharp } from "@mui/icons-material";
import DutiesExpandable from "./DutiesExpandable";

export default function DetailedCareerTimestampCard({
   careerTimestamp,
}: {
   careerTimestamp: HistoricalCareerTimestampInterface;
}) {
   return (
      <Box className="block border-slate-300 border-2 bg-white   shadow-md rounded-xl p-3">
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
         <br />
         <Typography sx={{ mb: 0.5 }}>
            <InfoSharp sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" />
            Duties
         </Typography>
         <Typography
            variant="caption"
            sx={{ wordBreak: "break-word" }}
            className="block border bg-[whitesmoke] rounded-md px-1 py-2"
         >
            {careerTimestamp.duties ? (
               careerTimestamp.duties.length > 70 ? (
                  <DutiesExpandable content={careerTimestamp.duties} />
               ) : (
                  careerTimestamp.duties
               )
            ) : (
               "N/A"
            )}
         </Typography>
      </Box>
   );
}
