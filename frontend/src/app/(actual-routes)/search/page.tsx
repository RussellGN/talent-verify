import CareerTimestampCard from "@/app/components/CareerTimestampCard";
import { sampleCareerTimestamps } from "@/app/data/sampleData";
import { Grid, Typography } from "@mui/material";

type PropTypes = {
   searchParams: {
      query: string | null;
      date_started: string | null;
      date_left: string | null;
   };
};

export default function SearchPage({ searchParams: { query, date_started, date_left } }: PropTypes) {
   const resultsFor = query
      ? query
      : date_started
      ? `date started: ${new Date(date_started).toLocaleDateString()}`
      : date_left
      ? `date left: ${new Date(date_left).toLocaleDateString()}`
      : "";

   return (
      <div className="min-h-[75vh]">
         <Typography className="text-center p-4">Showing Results for {`'${resultsFor}'`}</Typography>
         <Grid container spacing={1}>
            {sampleCareerTimestamps.map((timeStamp) => (
               <Grid key={timeStamp.employee.id} item xs={3}>
                  <CareerTimestampCard careerTimestamp={timeStamp} />
               </Grid>
            ))}
         </Grid>
      </div>
   );
}
