"use client";

import { Search } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import React, { useRef } from "react";

export default function SearchForm() {
   const queryRef = useRef<HTMLInputElement>(null);
   const dateStartedRef = useRef<HTMLInputElement>(null);
   const dateLeftRef = useRef<HTMLInputElement>(null);
   return (
      <form>
         <input
            className="d-block min-w-[70%] md:min-w-[60%] rounded-[20px] border-4 shadow-md px-5 py-1.5"
            ref={queryRef}
            name="query"
            placeholder="Search query here..."
         />

         <Typography sx={{ my: 3 }}> Or search by</Typography>

         <div className="flex items-center justify-center gap-3">
            <label className="flex flex-col gap-1" htmlFor="date_left">
               <span>Date Started</span>
               <input
                  className="d-block rounded-[20px] border-4 shadow-md px-5 py-1.5"
                  ref={dateStartedRef}
                  id="date_started"
                  name="date_started"
                  type="date"
               />
            </label>

            <label className="flex flex-col gap-1" htmlFor="date_left">
               <span>Date Left</span>
               <input
                  className="d-block rounded-[20px] border-4 shadow-md px-5 py-1.5"
                  ref={dateLeftRef}
                  id="date_left"
                  name="date_left"
                  type="date"
               />
            </label>
         </div>

         <div className="mt-3">
            <IconButton
               size="large"
               sx={{
                  boxShadow: "2px 2px 10px grey",
                  backgroundColor: "primary.main",
                  color: "white",
                  "&:hover": { backgroundColor: "primary.light", color: "white" },
               }}
            >
               <Search />
            </IconButton>
         </div>
      </form>
   );
}
