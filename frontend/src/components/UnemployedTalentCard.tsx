import { Box, Typography } from "@mui/material";
import { UnemployedTalentInterface } from "../interfaces";
import { capitalizeWords } from "../lib";
import Link from "next/link";
import { ArrowForward, Business, Contacts, People, AccessTime, Work } from "@mui/icons-material";

export default function UnemployedTalentCard({ talent }: { talent: UnemployedTalentInterface }) {
   return (
      <Box
         component={Link}
         href={`/search/${talent.id}`}
         className="block border-slate-300 border-2 bg-slate-50 hover:bg-white hover:border-slate-400  shadow-md rounded-xl p-3"
      >
         <Typography className="border-b" variant="h6" sx={{ mb: 1, pb: 0.2 }}>
            {capitalizeWords(talent.name)}
         </Typography>
         <Typography sx={{ mb: 0.5 }}>
            <Contacts sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" /> National ID: {talent.national_id}
         </Typography>
         <Typography sx={{ mb: 0.5 }}>
            <Business sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" /> No employer
         </Typography>
         <Typography sx={{ mb: 0.5 }}>
            <People sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" /> Department N/A
         </Typography>
         <Typography sx={{ mb: 0.5 }}>
            <Work sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" /> Role N/A
         </Typography>

         <br />
         <Typography sx={{ mb: 0.5 }}>
            <AccessTime sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" />
            Date started N/A
         </Typography>
         <Typography sx={{ mb: 0.5 }}>
            <AccessTime sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" />
            Date left N/A
         </Typography>

         <Typography color="primary" sx={{ mt: 2 }} className="flex items-center justify-end text-right gap-2 px-2">
            <ArrowForward />
            View
         </Typography>
      </Box>
   );
}
