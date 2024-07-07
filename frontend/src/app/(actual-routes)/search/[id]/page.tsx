"use client";

import DetailedCareerTimestampCard from "@/components/DetailedCareerTimestampCard";
import DutiesExpandable from "@/components/DutiesExpandable";
import useGetTalentWithID from "@/hooks/useGetTalentWithID";
import { capitalizeWords, friendlyDate } from "@/lib";
import {
   AccessTime,
   ArrowDownward,
   Business,
   Contacts,
   InfoOutlined,
   InfoSharp,
   People,
   PermIdentity,
   SubdirectoryArrowLeft,
   SubdirectoryArrowRight,
   Work,
} from "@mui/icons-material";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";

export default function DetailedView({ params: { id } }: { params: { id: string } }) {
   const { isPending, isError, data, error } = useGetTalentWithID(id);

   if (isPending) {
      return (
         <div className="min-h-[72vh] pt-[4rem] text-center">
            <CircularProgress />
            <p>searching...</p>
         </div>
      );
   }

   if (isError) throw error;

   return (
      <div className="min-h-[72vh] relative mt-5">
         <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
               <Box
                  sx={{ position: { md: "sticky" }, top: "110px", px: { xs: 2, sm: 5 }, py: 5 }}
                  className="bg-white shadow-md border rounded-[20px]"
               >
                  <Typography className="border-b" variant="h5" sx={{ mb: 2, pb: 1 }}>
                     {capitalizeWords(data.talent.name)}
                  </Typography>
                  <Typography sx={{ mb: 0.5 }}>
                     <Contacts sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" />{" "}
                     <span style={{ fontSize: "90%" }}>National ID:</span> {data.talent.national_id}
                  </Typography>

                  <br />
                  {data.talent.employer ? (
                     <>
                        <Typography sx={{ mb: 0.5 }}>
                           <Business sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" />{" "}
                           <span style={{ fontSize: "90%" }}>Current Employer:</span> {data.talent.employer || "N/A"}
                        </Typography>
                        <Typography sx={{ mb: 0.5 }}>
                           <People sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" />{" "}
                           <span style={{ fontSize: "90%" }}>Current Department:</span> {data.talent.department || "N/A"}
                        </Typography>
                        <Typography sx={{ mb: 0.5 }}>
                           <Work sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" />{" "}
                           <span style={{ fontSize: "90%" }}>Current Role:</span> {data.talent.role || "N/A"}
                        </Typography>
                        <Typography sx={{ mb: 0.5 }}>
                           <PermIdentity sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" />{" "}
                           <span style={{ fontSize: "90%" }}>Employee ID:</span> {data.talent.employee_id || "N/A"}
                        </Typography>

                        <br />
                        <Typography sx={{ mb: 0.5 }}>
                           <AccessTime sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" />
                           <span style={{ fontSize: "90%" }}>Date started:</span>{" "}
                           {data.talent.date_started ? friendlyDate(data.talent.date_started) : "N/A"}
                        </Typography>
                        {data.talent.date_left ? (
                           <Typography sx={{ mb: 0.5 }}>
                              <AccessTime sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" />
                              <span style={{ fontSize: "90%" }}>Date left:</span> {friendlyDate(data.talent.date_left)}
                           </Typography>
                        ) : (
                           <Typography sx={{ mb: 0.5 }}>
                              <AccessTime sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" />
                              Ongoing
                           </Typography>
                        )}
                        <br />
                        <Typography sx={{ mb: 0.5 }}>
                           <InfoSharp sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" />
                           Duties
                        </Typography>
                        <Typography
                           variant="caption"
                           sx={{ wordBreak: "break-word" }}
                           className="block border bg-[whitesmoke] rounded-md px-1 py-2"
                        >
                           {data.talent.duties ? (
                              data.talent.duties.length > 70 ? (
                                 <DutiesExpandable content={data.talent.duties} />
                              ) : (
                                 data.talent.duties
                              )
                           ) : (
                              "N/A"
                           )}
                        </Typography>
                     </>
                  ) : (
                     <Typography sx={{ mb: 0.5 }}>
                        <InfoOutlined sx={{ mr: 0.5, mt: -0.4, color: "grey" }} fontSize="inherit" />{" "}
                        <span style={{ fontSize: "90%" }}>No employer at the moment</span>
                     </Typography>
                  )}
               </Box>
            </Grid>

            <Grid item xs={12} md>
               <div>
                  <Typography variant="h6" sx={{ textAlign: "center", mb: 3 }}>
                     Employment History
                  </Typography>

                  <Grid container justifyContent="center" spacing={2}>
                     {data.employment_history.map((stamp, index) => {
                        const isEven = (index + 1) % 2 === 0;
                        const isLast = index === data.employment_history.length - 1;
                        const isLastOrSecondLast = index === data.employment_history.length - 2 || isLast;

                        return (
                           <Grid key={index} item xs={10.5} md={6}>
                              <Box sx={{ pt: { md: isEven ? 8 : 0 } }}>
                                 <SubdirectoryArrowLeft
                                    sx={{
                                       fontSize: "4rem",
                                       color: "grey",
                                       display: { xs: "none", md: isEven ? "block" : "none" },
                                       transform: "rotateZ(-90deg)",
                                    }}
                                 />
                                 <DetailedCareerTimestampCard careerTimestamp={stamp} />
                                 <SubdirectoryArrowRight
                                    sx={{
                                       fontSize: "4rem",
                                       color: "grey",
                                       display: {
                                          xs: "none",
                                          md: !isEven ? (!isLastOrSecondLast ? "block" : "none") : "none",
                                       },
                                       transform: "rotateZ(90deg)",
                                       mt: 4,
                                       ml: "auto",
                                    }}
                                 />

                                 <ArrowDownward
                                    sx={{
                                       fontSize: "3rem",
                                       color: "grey",
                                       display: {
                                          xs: isLast ? "none" : "block",
                                          md: "none",
                                       },
                                       mt: 3,
                                       mx: "auto",
                                    }}
                                 />
                              </Box>
                           </Grid>
                        );
                     })}
                  </Grid>
               </div>
            </Grid>
         </Grid>
      </div>
   );
}
