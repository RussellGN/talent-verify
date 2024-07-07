"use client";

import CareerTimestampCard from "@/components/CareerTimestampCard";
import UnemployedTalentCard from "@/components/UnemployedTalentCard";
import useGetTalent from "@/hooks/useGetTalent";
import { matchedStyles } from "@/lib/constants";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";

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

   if (data.employed.length === 0 && data.unemployed.length === 0) {
      return (
         <div className="min-h-[72vh] pt-[4rem]">
            <Typography className="text-center p-4">No results found for {`'${showingRsultsFor}'`}</Typography>
         </div>
      );
   }

   return (
      <div className="min-h-[72vh]">
         <Typography variant="h6" sx={{ mb: 2 }} className="text-center p-4">
            Showing Results for{" "}
            <Box component="span" sx={matchedStyles}>
               {`'${showingRsultsFor}'`}
            </Box>
         </Typography>
         <Grid container spacing={1}>
            {data.employed.map((timeStamp) => (
               <Grid key={timeStamp.id} item xs={12} sm={6} md={4} lg={3}>
                  <CareerTimestampCard careerTimestamp={timeStamp} query={q} />
               </Grid>
            ))}

            <hr />

            {data.unemployed.map((talent) => (
               <Grid key={talent.id} item xs={12} sm={6} md={4} lg={3}>
                  <UnemployedTalentCard talent={talent} query={q} />
               </Grid>
            ))}
         </Grid>
      </div>
   );
}
