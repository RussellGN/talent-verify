"use client";

import { ArrowBack } from "@mui/icons-material";
import { Button } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

export default function GoBack() {
   const router = useRouter();
   const pathname = usePathname();

   if (pathname === "/") return;

   return (
      <Button
         sx={{ textTransform: "capitalize" }}
         variant="outlined"
         startIcon={<ArrowBack />}
         onClick={() => router.back()}
      >
         Go Back
      </Button>
   );
}
