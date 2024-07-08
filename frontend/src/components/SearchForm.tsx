"use client";

import { InfoOutlined, Search } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { FormEvent, useRef, useState } from "react";

export default function SearchForm() {
   const [message, setMessage] = useState<string>();
   const queryRef = useRef<HTMLInputElement>(null);
   const dateStartedRef = useRef<HTMLInputElement>(null);
   const dateLeftRef = useRef<HTMLInputElement>(null);
   const router = useRouter();

   function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const query = queryRef.current?.value;
      const date_started = dateStartedRef.current?.value;
      const date_left = dateLeftRef.current?.value;
      if (date_started) {
         router.push(`/search?date_started=${date_started}`);
      } else if (date_left) {
         router.push(`/search?date_left=${date_left}`);
      } else if (query) {
         router.push(`/search?query=${query}`);
      } else {
         setMessage("please type in a search query or select a date");
      }
   }

   function queryDisableOtherInputs(e: React.ChangeEvent<HTMLInputElement>) {
      if (!e.currentTarget.value) {
         if (dateStartedRef.current) dateStartedRef.current.disabled = false;
         if (dateLeftRef.current) dateLeftRef.current.disabled = false;
         return;
      }
      if (dateStartedRef.current) dateStartedRef.current.disabled = true;
      if (dateLeftRef.current) dateLeftRef.current.disabled = true;
   }
   function dateStartedDisableOtherInputs(e: React.ChangeEvent<HTMLInputElement>) {
      if (!e.currentTarget.value) {
         if (queryRef.current) queryRef.current.disabled = false;
         if (dateLeftRef.current) dateLeftRef.current.disabled = false;
         return;
      }
      if (queryRef.current) queryRef.current.disabled = true;
      if (dateLeftRef.current) dateLeftRef.current.disabled = true;
   }
   function dateLeftDisableOtherInputs(e: React.ChangeEvent<HTMLInputElement>) {
      if (!e.currentTarget.value) {
         if (queryRef.current) queryRef.current.disabled = false;
         if (dateStartedRef.current) dateStartedRef.current.disabled = false;
         return;
      }
      if (queryRef.current) queryRef.current.disabled = true;
      if (dateStartedRef.current) dateStartedRef.current.disabled = true;
   }

   return (
      <form onSubmit={handleSubmit}>
         {!!message && (
            <Typography variant="caption" color="firebrick" sx={{ my: 1, display: "block" }}>
               <InfoOutlined fontSize="inherit" sx={{ mr: 0.5, mt: -0.3 }} />
               {message}
            </Typography>
         )}

         <input
            onChange={queryDisableOtherInputs}
            className="d-block min-w-[80%] md:min-w-[60%] rounded-[20px] border-4 shadow-md px-5 py-1.5"
            ref={queryRef}
            name="query"
            minLength={3}
            maxLength={20}
            placeholder="Search query here..."
         />

         <Typography sx={{ my: { xs: 2, sm: 3 } }}> Or search by</Typography>

         <div className="flex items-center justify-center gap-1 md:gap-3">
            <label className="flex flex-col gap-1" htmlFor="date_left">
               <span>Date Started</span>
               <input
                  onChange={dateStartedDisableOtherInputs}
                  className="scale-90 md:scale-100 d-block w-full rounded-[20px] border-4 shadow-md px-5 py-1.5"
                  ref={dateStartedRef}
                  id="date_started"
                  name="date_started"
                  type="date"
               />
            </label>

            <label className="flex flex-col gap-1" htmlFor="date_left">
               <span>Date Left</span>
               <input
                  onChange={dateLeftDisableOtherInputs}
                  className="scale-90 md:scale-100 d-block w-full rounded-[20px] border-4 shadow-md px-5 py-1.5"
                  ref={dateLeftRef}
                  id="date_left"
                  name="date_left"
                  type="date"
               />
            </label>
         </div>

         <div className="mt-3">
            <IconButton
               type="submit"
               size="large"
               sx={{
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
