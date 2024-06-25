import DetailedCareerTimestampCard from "@/app/components/DetailedCareerTimestampCard";
import { sampleCareerTimestamps, sampleEmployees } from "@/app/data/sampleData";
import { capitalizeWords, friendlyDate } from "@/app/lib";
import {
   AccessTime,
   Business,
   Contacts,
   People,
   SubdirectoryArrowLeft,
   SubdirectoryArrowRight,
   Work,
} from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";

export default function DetailedView({ params: { id } }: { params: { id: string } }) {
   const employee = sampleEmployees.find((emp) => emp.id === Number(id));

   if (!employee) throw new Error(`Talent with id=${id} not found`);

   // let careerTimestamps = sampleCareerTimestamps.filter((stamp) => stamp.employee.id === employee.id);
   let careerTimestamps = sampleCareerTimestamps;
   careerTimestamps = [...careerTimestamps, ...careerTimestamps, ...careerTimestamps];
   const latestCareerTimestamp = careerTimestamps[0];

   return (
      <div className="min-h-[75vh] relative mt-5">
         <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
               <div className="md:sticky top-[110px] shadow-md border rounded-[20px] p-8">
                  <Typography className="border-b" variant="h5" sx={{ mb: 2, pb: 1 }}>
                     {capitalizeWords(employee.name)}
                  </Typography>
                  <Typography sx={{ mb: 0.5 }}>
                     <Contacts sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" />{" "}
                     <span style={{ fontSize: "90%" }}>National ID:</span> {employee.national_id}
                  </Typography>
                  <br />
                  <Typography sx={{ mb: 0.5 }}>
                     <Business sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" />{" "}
                     <span style={{ fontSize: "90%" }}>Current Employer:</span> {employee.employer?.name || "None"}
                  </Typography>
                  <Typography sx={{ mb: 0.5 }}>
                     <People sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" />{" "}
                     <span style={{ fontSize: "90%" }}>Current Department:</span>{" "}
                     {latestCareerTimestamp.role.department.name}
                  </Typography>
                  <Typography sx={{ mb: 0.5 }}>
                     <Work sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" />{" "}
                     <span style={{ fontSize: "90%" }}>Current Role:</span> {latestCareerTimestamp.role.title}
                  </Typography>

                  <br />
                  <Typography sx={{ mb: 0.5 }}>
                     <AccessTime sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" />
                     <span style={{ fontSize: "90%" }}>Date started:</span>{" "}
                     {latestCareerTimestamp.date_started ? friendlyDate(latestCareerTimestamp.date_started) : "N/A"}
                  </Typography>
                  {latestCareerTimestamp.date_left ? (
                     <Typography sx={{ mb: 0.5 }}>
                        <AccessTime sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" />
                        <span style={{ fontSize: "90%" }}>Date left:</span> {friendlyDate(latestCareerTimestamp.date_left)}
                     </Typography>
                  ) : (
                     <Typography sx={{ mb: 0.5 }}>
                        <AccessTime sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" />
                        Ongoing
                     </Typography>
                  )}
               </div>
            </Grid>

            <Grid item xs={12} md>
               <div>
                  <Typography variant="h6" sx={{ textAlign: "center", mb: 3 }}>
                     Employment History
                  </Typography>

                  <div className="bg-white">
                     <Grid container justifyContent="center" spacing={2}>
                        {careerTimestamps.map((stamp, index) => {
                           const isEven = (index + 1) % 2 === 0;
                           const isSecondLast = index === careerTimestamps.length - 2;
                           return (
                              <Grid key={index} item xs={6} md={5}>
                                 <Box sx={{ pt: isEven ? 8 : 0 }}>
                                    <SubdirectoryArrowLeft
                                       sx={{
                                          fontSize: "4rem",
                                          color: "grey",
                                          display: isEven ? "block" : "none",
                                          transform: "rotateZ(-90deg)",
                                       }}
                                    />
                                    <DetailedCareerTimestampCard careerTimestamp={stamp} />
                                    <SubdirectoryArrowRight
                                       sx={{
                                          fontSize: "4rem",
                                          color: "grey",
                                          display: !isEven ? (!isSecondLast ? "block" : "none") : "none",
                                          transform: "rotateZ(90deg)",
                                          mt: 4,
                                          ml: "auto",
                                       }}
                                    />
                                 </Box>
                              </Grid>
                           );
                        })}
                     </Grid>
                  </div>
               </div>
            </Grid>
         </Grid>
      </div>
   );
}
