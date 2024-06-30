"use client";

import { Warning } from "@mui/icons-material";
import { Typography } from "@mui/material";

export default function error({ error: { message } }: { error: { message: string } }) {
   return (
      <div className="min-h-[65vh] flex items-center justify-center">
         <Typography className="text-center p-4">
            <Warning fontSize="small" sx={{ mr: 0.5, mt: -0.3 }} />
            Error: {message}
         </Typography>
      </div>
   );
}
