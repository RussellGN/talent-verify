"use client";

import CareerTimestampCard from "@/components/CareerTimestampCard";
import useGetTalent from "@/hooks/useGetTalent";
import { CircularProgress, Grid, Typography } from "@mui/material";

type PropTypes = {
   searchParams: {
      query: string | null;
      date_started: string | null;
      date_left: string | null;
   };
};

export default function SearchPage({ searchParams: { query, date_started, date_left } }: PropTypes) {
   const q = query || date_started || date_left || "";
   const isDate = Boolean(date_started || date_left);
   const { isPending, isError, data, error } = useGetTalent(q, isDate);

   const showingRsultsFor = query
      ? query
      : date_started
      ? `date started: ${new Date(date_started).toLocaleDateString()}`
      : date_left
      ? `date left: ${new Date(date_left).toLocaleDateString()}`
      : "";

   if (isPending) {
      return (
         <div className="min-h-[72vh] pt-[4rem] text-center">
            <CircularProgress />
            <p>searching...</p>
         </div>
      );
   }

   if (isError) throw error;
   console.log(data);

   if (data.length === 0) {
      return (
         <div className="min-h-[72vh] pt-[4rem]">
            <Typography className="text-center p-4">No results found for {`'${showingRsultsFor}'`}</Typography>
         </div>
      );
   }

   return (
      <div className="min-h-[72vh]">
         <Typography className="text-center p-4">Showing Results for {`'${showingRsultsFor}'`}</Typography>
         <Grid container spacing={1}>
            {data.map((timeStamp) => (
               <Grid key={timeStamp.id} item xs={3}>
                  <CareerTimestampCard careerTimestamp={timeStamp} />
               </Grid>
            ))}
         </Grid>
      </div>
   );
}
