"use client";

import { Search } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { FormEvent, useRef } from "react";

export default function SearchForm() {
   const queryRef = useRef<HTMLInputElement>(null);
   const dateStartedRef = useRef<HTMLInputElement>(null);
   const dateLeftRef = useRef<HTMLInputElement>(null);
   const router = useRouter();

   function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const query = queryRef.current?.value;
      const date_started = dateStartedRef.current?.value;
      const date_left = dateLeftRef.current?.value;
      if (query || date_started || date_left) {
         router.push(`/search?query=${query},date_started=${date_started},date_left=${date_left}`);
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
         <input
            onChange={queryDisableOtherInputs}
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
                  onChange={dateStartedDisableOtherInputs}
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
                  onChange={dateLeftDisableOtherInputs}
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
               type="submit"
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
