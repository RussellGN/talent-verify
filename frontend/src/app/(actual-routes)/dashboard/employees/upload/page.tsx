"use client";

import useUpload from "@/hooks/useUpload";
import {
   ArrowBack,
   CheckCircle,
   InfoOutlined,
   KeyboardArrowDown,
   KeyboardArrowUp,
   KeyboardDoubleArrowRight,
   Save,
   UploadFile,
   Warning,
   WarningOutlined,
} from "@mui/icons-material";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { ReactNode } from "react";

export default function UploadPage() {
   const {
      fileData,
      cols,
      parseError,
      inputKey,
      inputRef,
      showGuidelinesForTxt,
      setShowGuidelinesForTxt,
      clickInput,
      handleFileInputChange,
      saveEmployees,
      submission: { reset, data, isPending, isSuccess, isError, error },
   } = useUpload();

   let content: ReactNode = "";
   if (parseError) {
      content = (
         <p className="text-red-800">
            <Warning color="inherit" sx={{ mt: -0.3, mr: 0.5 }} />
            Error processing file: {parseError}
         </p>
      );
   } else if (!fileData) {
      content = (
         <Box sx={{ mb: 3 }} className="text-left">
            <Typography variant="h6" textAlign="center" sx={{ mb: 4 }}>
               No data uploaded
            </Typography>
            <Typography sx={{ mb: 3 }}>
               <InfoOutlined fontSize="inherit" sx={{ mr: 0.5, mt: -0.3 }} />
               Before uploading, please take note of the following
            </Typography>
            <ul>
               <li>
                  <div className="flex items-start gap-1">
                     <KeyboardDoubleArrowRight fontSize="small" />
                     <Typography variant="subtitle2">
                        Expected fields (in order): national_id, name, employee_id, department, role, duties, date_started,
                        date_left
                     </Typography>
                  </div>
               </li>
               <li>
                  <div className="flex items-start gap-1">
                     <KeyboardDoubleArrowRight fontSize="small" />
                     <Typography variant="subtitle2">
                        Any fields not listed above but present in data will be completely ignored
                     </Typography>
                  </div>
               </li>
               <li>
                  <div className="flex items-start gap-1">
                     <KeyboardDoubleArrowRight fontSize="small" />
                     <Typography variant="subtitle2">
                        &lsquo;national_id&rsquo;, &lsquo;name&rsquo;, and &lsquo;role&rsquo; must have values
                     </Typography>
                  </div>
               </li>
               <li>
                  <div className="flex items-start gap-1">
                     <KeyboardDoubleArrowRight fontSize="small" />

                     <Typography variant="subtitle2">
                        Date fields should be of the format &lsquo;mm/dd/yyyy&rsquo;
                     </Typography>
                  </div>
               </li>
               <li>
                  <div className="flex items-start gap-1">
                     <KeyboardDoubleArrowRight fontSize="small" />
                     <div>
                        <Typography variant="subtitle2">
                           Text files should have the following format{" "}
                           <Button
                              size="small"
                              sx={{ textTransform: "capitalize" }}
                              onClick={() => setShowGuidelinesForTxt((prev) => !prev)}
                              endIcon={showGuidelinesForTxt ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                           >
                              {showGuidelinesForTxt ? "Hide" : "Show"}
                           </Button>
                        </Typography>

                        <Typography
                           sx={{ display: showGuidelinesForTxt ? "block" : "none", mb: 2 }}
                           variant="caption"
                           className="bg-slate-50 rounded-lg p-3"
                        >
                           Each record should contain key-value pairs. Key and value must be separated by a colon (:). Each
                           key-value pair should be on a new line. Records should be separated by a blank line. For example:
                           <br />
                           <br />
                           <span className="border-t border-b text-green-600">
                              national_id: 1233f29 <br />
                              name: John Doe <br />
                              department: IT Systems <br />
                              role: Software Engineer
                              <br />
                              <br />
                              national_id: 1233f34 <br />
                              name: Jane Smith <br />
                              department: Management <br />
                              role: COO <br />
                              duties: Management and oversight of operations... <br />
                              date_started: 02/23/2019
                           </span>
                           <br />
                           <br />
                           - Ensure there are no extra spaces around colons or at the end of lines. <br />
                           - Each record must be separated by exactly one blank line. <br />- Ensure consistent formatting
                           to avoid errors in processing.
                        </Typography>
                     </div>
                  </div>
               </li>

               <br />
               <li>
                  <div className="flex items-start gap-1 text-red-700">
                     <KeyboardDoubleArrowRight fontSize="small" />
                     <Typography variant="subtitle2">
                        If any of the uploaded employees&apos; national_id matches an already saved employee&apos;s
                        national_id, an update will occur
                     </Typography>
                  </div>
               </li>
            </ul>
         </Box>
      );
   } else {
      content = (
         <>
            <Box sx={{ mb: 3 }} className="text-left max-w-prose flex items-start gap-1">
               <div className="pt-[1px]">
                  <InfoOutlined fontSize="inherit" />
               </div>
               <p>
                  Verify employee details and press &ldquo;Save&rdquo; to proceed. If the details appearing are not correct
                  please edit the file and upload again.
               </p>
            </Box>
            <DataGrid
               columns={cols}
               rows={fileData}
               autosizeOnMount
               disableColumnMenu
               disableRowSelectionOnClick
               disableColumnResize
               disableColumnSelector
               scrollbarSize={5}
               showCellVerticalBorder
            />
            <div className="text-right mt-5">
               <Button onClick={saveEmployees} color="success" variant="contained" endIcon={<Save />}>
                  Save
               </Button>
            </div>
         </>
      );
   }

   if (isSuccess && data) {
      console.log(data);
      const message = (
         <>
            {data.employees_added.length
               ? `${data.employees_added.length} ${
                    data.employees_added.length === 1 ? "employee was" : "employees were"
                 } added`
               : ""}
            <hr
               className="my-1.5"
               style={{ display: data.employees_added.length && data.existing_employees_updated.length ? "block" : "none" }}
            />
            {data.existing_employees_updated.length
               ? `${data.existing_employees_updated.length} ${
                    data.existing_employees_updated.length === 1
                       ? "employee's national ID matched an existing employee's"
                       : "employees' national IDs found matches"
                 } and an update was made instead`
               : ""}
         </>
      );

      return (
         <div className="text-center max-w-prose mx-auto py-20">
            <CheckCircle fontSize="large" color="success" className="mb-3" />
            <div>{message}</div>
         </div>
      );
   }

   if (isPending) {
      return (
         <div className="text-center px-10 py-20">
            <CircularProgress />
            <p>submitting...</p>
         </div>
      );
   }

   if (isError && error) {
      return (
         <div className="text-center px-10 py-20">
            <WarningOutlined color="error" fontSize="large" />
            <p>
               <strong>Error saving employees</strong> <br /> {error.message}
               <br />
               <Button
                  onClick={reset}
                  type="button"
                  startIcon={<ArrowBack />}
                  variant="outlined"
                  sx={{ mt: 3, textTransform: "capitalize" }}
               >
                  Back to upload
               </Button>
            </p>
         </div>
      );
   }

   return (
      <>
         <div className="text-center">
            <Button
               variant="outlined"
               color="success"
               size="large"
               onClick={clickInput}
               sx={{ textTransform: "capitalize" }}
               endIcon={<UploadFile />}
            >
               Click to Upload File <span className="lowercase">(xlsx, xls, csv, txt)</span>
            </Button>

            <input
               key={inputKey}
               ref={inputRef}
               onChange={handleFileInputChange}
               type="file"
               accept=".xlsx,.xls,.csv,.txt"
               className="hidden"
            />
         </div>

         <div className="bg-slate-50 rounded-[10px] p-5 text-center mt-5">{content} </div>
      </>
   );
}
