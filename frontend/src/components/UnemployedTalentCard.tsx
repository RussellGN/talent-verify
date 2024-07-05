import { Box, Typography } from "@mui/material";
import { UnemployedTalentInterface } from "../interfaces";
import { capitalizeWords } from "../lib";
import Link from "next/link";
import { ArrowForward, Business, Contacts } from "@mui/icons-material";

import { findMatchedAttributesInStamp } from "../lib";
import { matchedStyles } from "@/lib/constants";

export default function UnemployedTalentCard({ talent, query }: { talent: UnemployedTalentInterface; query: string }) {
   const matched = findMatchedAttributesInStamp(talent, query);

   return (
      <Box
         component={Link}
         href={`/search/${talent.id}`}
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
                     {capitalizeWords(talent.name)}
                  </Box>
               </Typography>
               <Typography sx={{ mb: 0.5 }}>
                  <Contacts sx={{ mr: 0.8, mt: -0.4, color: "success.light" }} fontSize="inherit" />
                  National ID:{" "}
                  <Box component="span" sx={matched.find((item) => item === "national_id") ? matchedStyles : {}}>
                     {talent.national_id}
                  </Box>
               </Typography>
               <Typography sx={{ mb: 0.5 }}>
                  <Business sx={{ mr: 0.8, mt: -0.4, color: "success.light" }} fontSize="inherit" />
                  No employer
               </Typography>
            </div>

            {/* <>
               <Typography sx={{ mb: 0.5 }}>
                  <People sx={{ mr: 0.8, mt: -0.4, color: "success.light" }} fontSize="inherit" />
                  Department N/A{" "}
               </Typography>
               <Typography sx={{ mb: 0.5 }}>
                  <Work sx={{ mr: 0.8, mt: -0.4, color: "success.light" }} fontSize="inherit" />
                  Role N/A{" "}
               </Typography>

               <br />
               <Typography sx={{ mb: 0.5 }}>
                  <AccessTime sx={{ mr: 0.8, mt: -0.4, color: "success.light" }} fontSize="inherit" />
                  Date started N/A
               </Typography>
               <Typography sx={{ mb: 0.5 }}>
                  <AccessTime sx={{ mr: 0.8, mt: -0.4, color: "success.light" }} fontSize="inherit" />
                  Date left N/A
               </Typography>
            </> */}

            <div className="w-full">
               <Typography sx={{ mt: 2 }} color="primary" className="flex items-center justify-end text-right gap-2 px-2">
                  <ArrowForward />
                  View
               </Typography>
            </div>
         </div>
      </Box>
   );
}
