"use client";

import useUpload from "@/hooks/useUpload";
import {
   ArrowBack,
   ArrowForward,
   CheckCircle,
   InfoOutlined,
   KeyboardArrowDown,
   KeyboardArrowUp,
   KeyboardDoubleArrowRight,
   Save,
   UploadFile,
   WarningRounded,
} from "@mui/icons-material";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";
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
         <Typography className="text-red-800">
            <WarningRounded color="inherit" sx={{ mt: -0.3, mr: 0.5 }} />
            Error processing file: {parseError}
         </Typography>
      );
   } else if (!fileData) {
      content = (
         <Box sx={{ mb: 3 }} className="text-left">
            <Typography variant="h6" textAlign="center" sx={{ mb: 3 }}>
               No data uploaded
            </Typography>
            <Typography sx={{ mb: 3 }}>
               <InfoOutlined color="warning" fontSize="inherit" sx={{ mr: 0.5, mt: -0.3 }} />
               Before uploading, please take note of the following
            </Typography>
            <ul>
               <li>
                  <div className="flex items-start gap-1">
                     <KeyboardDoubleArrowRight fontSize="small" />
                     <Typography variant="subtitle2">
                        Expected fields (in order): national_id, name, employee_id, department, role, duties, date_started
                        {/* , date_left */}
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
                        &lsquo;national_id&rsquo; and &lsquo;name&rsquo; must have values
                        {/* &lsquo;national_id&rsquo;, &lsquo;name&rsquo;, and &lsquo;role&rsquo; must have values */}
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
                           <button
                              onClick={() => setShowGuidelinesForTxt((prev) => !prev)}
                              className="text-[goldenrod] border-0 p-0 m-0 bg-transparent"
                           >
                              {showGuidelinesForTxt ? "Hide" : "Show"}
                              {showGuidelinesForTxt ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                           </button>
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
               <li>
                  <div className="flex items-start gap-1 ">
                     <KeyboardDoubleArrowRight fontSize="small" />
                     <Typography variant="subtitle2">
                        If you would like to perform a bulk update, ensure the updated detail rows in your file contain the
                        national_id numbers of the employees you wish to update
                     </Typography>
                  </div>
               </li>
            </ul>
         </Box>
      );
   } else {
      content = (
         <>
            <Typography sx={{ mb: 3 }} className="text-left max-w-prose">
               Verify employee details and press &ldquo;Save&rdquo; to proceed. If the details appearing are not correct
               please edit the file and upload again.
            </Typography>
            <DataGrid
               columns={cols}
               rows={fileData}
               disableColumnMenu
               disableRowSelectionOnClick
               disableColumnSelector
               scrollbarSize={5}
               showCellVerticalBorder
               // autosizeOnMount
               // disableColumnResize
               density="compact"
               initialState={{
                  sorting: {
                     sortModel: [{ field: "name", sort: "asc" }],
                  },
               }}
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
                 } and an update was made`
               : ""}
         </>
      );

      return (
         <div className="text-center max-w-prose mx-auto py-20">
            <CheckCircle fontSize="large" color="success" className="mb-3" />
            <div>{message}</div>
            <div>
               <Button
                  href="/dashboard/employees"
                  component={Link}
                  endIcon={<ArrowForward />}
                  variant="outlined"
                  sx={{ mt: 3 }}
               >
                  View employees
               </Button>
            </div>
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
            <WarningRounded color="error" fontSize="large" />
            <p>
               <strong>Error saving employees</strong> <br /> {error.message}
               <br />
               <Button onClick={reset} type="button" startIcon={<ArrowBack />} variant="outlined" sx={{ mt: 3 }}>
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
               sx={{ my: 2 }}
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

         <div className="bg-white rounded-[10px] py-5 px-3 text-center mt-5">{content} </div>
      </>
   );
}
