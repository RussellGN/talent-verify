import { Box, Typography } from "@mui/material";
import { UnormalizedCurrentEmployeeInterface } from "../interfaces";
import { capitalizeWords, findMatchedAttributesInStamp, friendlyDate } from "../lib";
import Link from "next/link";
import { ArrowForward, Business, Contacts, People, AccessTime, Work } from "@mui/icons-material";
import { matchedStyles } from "@/lib/constants";

export default function CareerTimestampCard({
   careerTimestamp,
   query,
}: {
   careerTimestamp: UnormalizedCurrentEmployeeInterface;
   query: string;
}) {
   const matched = findMatchedAttributesInStamp(careerTimestamp, query);

   return (
      <Box
         component={Link}
         href={`/search/${careerTimestamp.id}`}
         className="h-full block border-slate-300 border-2 bg-white hover:bg-slate-50  hover:border-slate-400  shadow-md rounded-xl p-3"
      >
         <div className="h-full flex flex-col items-center justify-between">
            <div className="w-full">
               <Typography
                  fontWeight="bold"
                  className="border-b"
                  variant="h6"
                  sx={{ mb: 1, pb: 0.2, color: "primary.light" }}
               >
                  <Box component="span" sx={matched.find((item) => item === "name") ? matchedStyles : {}}>
                     {capitalizeWords(careerTimestamp.name)}
                  </Box>
               </Typography>
               <Typography sx={{ mb: 0.5 }}>
                  <Contacts sx={{ mr: 0.8, mt: -0.4, color: "success.light" }} fontSize="inherit" />
                  National ID:{" "}
                  <Box component="span" sx={matched.find((item) => item === "national_id") ? matchedStyles : {}}>
                     {careerTimestamp.national_id}
                  </Box>
               </Typography>
               <Typography sx={{ mb: 0.5 }}>
                  <Business sx={{ mr: 0.8, mt: -0.4, color: "success.light" }} fontSize="inherit" />
                  Employer:{" "}
                  <Box component="span" sx={matched.find((item) => item === "employer") ? matchedStyles : {}}>
                     {careerTimestamp.employer || ""}
                  </Box>
               </Typography>
               <Typography sx={{ mb: 0.5 }}>
                  <People sx={{ mr: 0.8, mt: -0.4, color: "success.light" }} fontSize="inherit" />
                  Department:{" "}
                  <Box component="span" sx={matched.find((item) => item === "department") ? matchedStyles : {}}>
                     {careerTimestamp.department || ""}
                  </Box>
               </Typography>
               <Typography sx={{ mb: 0.5 }}>
                  <Work sx={{ mr: 0.8, mt: -0.4, color: "success.light" }} fontSize="inherit" />
                  Role:{" "}
                  <Box component="span" sx={matched.find((item) => item === "role") ? matchedStyles : {}}>
                     {careerTimestamp.role || ""}
                  </Box>
               </Typography>

               <br />
               <Typography sx={{ mb: 0.5 }}>
                  <AccessTime sx={{ mr: 0.8, mt: -0.4, color: "success.light" }} fontSize="inherit" />
                  Date started:
                  <Box component="span" sx={matched.find((item) => item === "date_started") ? matchedStyles : {}}>
                     {careerTimestamp.date_started ? friendlyDate(careerTimestamp.date_started) : "N/A"}
                  </Box>
               </Typography>
               {careerTimestamp.date_left ? (
                  <Typography sx={{ mb: 0.5 }}>
                     <AccessTime sx={{ mr: 0.8, mt: -0.4, color: "success.light" }} fontSize="inherit" />
                     Date left:
                     <Box component="span" sx={matched.find((item) => item === "date_left") ? matchedStyles : {}}>
                        {friendlyDate(careerTimestamp.date_left)}
                     </Box>
                  </Typography>
               ) : (
                  <Typography sx={{ mb: 0.5 }}>
                     <AccessTime sx={{ mr: 0.8, mt: -0.4, color: "success.light" }} fontSize="inherit" />
                     Ongoing
                  </Typography>
               )}
            </div>

            <div className="w-full">
               <Typography color="primary" sx={{ mt: 2 }} className="flex items-center justify-end text-right gap-2 px-2">
                  <ArrowForward />
                  View
               </Typography>
            </div>
         </div>
      </Box>
   );
}
