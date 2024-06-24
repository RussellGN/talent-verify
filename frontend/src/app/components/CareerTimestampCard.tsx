import { Typography } from "@mui/material";
import { CareerTimestampInterface } from "../interfaces";
import { friendlyDate } from "../lib";

export default function CareerTimestampCard({ careerTimestamp }: { careerTimestamp: CareerTimestampInterface }) {
   return (
      <div className="p-2">
         <div className="border shadow-md rounded-xl p-3">
            <Typography>Name: {careerTimestamp.employee.name}</Typography>
            <Typography>National ID: {careerTimestamp.employee.national_id}</Typography>
            <Typography>Employer: {careerTimestamp.employee.employer?.name}</Typography>
            <Typography>Role: {careerTimestamp.role.title}</Typography>
            <Typography>Department: {careerTimestamp.role.department.name}</Typography>

            <br />
            <Typography>
               Date started: {careerTimestamp.date_started ? friendlyDate(careerTimestamp.date_started) : "N/A"}
            </Typography>
            {careerTimestamp.date_left ? (
               <Typography>
                  Date left:
                  {friendlyDate(careerTimestamp.date_left)}
               </Typography>
            ) : (
               <Typography>Ongoing</Typography>
            )}
         </div>
      </div>
   );
}
