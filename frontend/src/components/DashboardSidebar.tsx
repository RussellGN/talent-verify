"use client";

import { Box, Typography } from "@mui/material";
import React from "react";
import { capitalizeWords } from "../lib";
import { Business, InfoOutlined, People } from "@mui/icons-material";
import NavLink from "./NavLink";
import useEmployer from "../hooks/useEmployer";

export default function DashboardSidebar() {
   const { isPending, isError, error, data } = useEmployer();

   if (isError) throw error;

   return (
      <div className="md:sticky top-[110px] shadow-md border rounded-[20px] px-3 py-5">
         <Typography className="border-b" variant="h6" sx={{ mb: 2, pb: 1 }}>
            <Business fontSize="inherit" sx={{ mt: -0.3, mr: 0.5 }} />
            {isPending ? (
               <Box component="span" sx={{ bgcolor: "divider" }} className="rounded inline-block w-[6ch] h-[1ch]"></Box>
            ) : (
               capitalizeWords(data.employer.name)
            )}
         </Typography>

         <div className="flex flex-col items-start justify-start gap-3">
            <NavLink icon={<People />} href="/dashboard/employees">
               Employees
            </NavLink>
            <NavLink icon={<InfoOutlined />} href="/dashboard/details">
               Details
            </NavLink>
         </div>
      </div>
   );
}