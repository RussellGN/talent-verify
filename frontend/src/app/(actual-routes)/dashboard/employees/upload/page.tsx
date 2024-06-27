"use client";

import { excelToJson } from "@/app/lib";
import { NewEmployee } from "@/app/types";
import { InfoOutlined, KeyboardDoubleArrowRight, Save, UploadFile, Warning } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ChangeEvent, ReactNode, useRef, useState } from "react";

export default function UploadPage() {
   const [data, setData] = useState<NewEmployee[]>();
   const [error, setError] = useState<string>();
   const [key, setKey] = useState(1);
   const inputRef = useRef<HTMLInputElement>(null);

   function clickInput() {
      inputRef.current?.click();
   }

   function onChange(e: ChangeEvent<HTMLInputElement>) {
      setData(undefined);
      setError(undefined);
      setKey((prev) => prev + 1);
      if (e.target.files) {
         const file = e.target.files[0];
         const words = file.name.split(".");
         const extension = words[words.length - 1];
         console.log(extension);

         switch (extension) {
            case "txt":
               console.log("text");
               // setData(txtToJson(file));
               break;
            case "xlsx":
               excelToJson<NewEmployee>(file)
                  .then((json) => setData(json))
                  .catch((err: string) => setError(err));
               // setData(excelToJson(file));
               break;
            case "csv":
               console.log("csv");
               // setData(csvToJson(file));
               break;
            default:
               alert(`file uploaded '${file.name}' is not of supported types (.xlsx, .txt and .csv)`);
               return;
         }
      }
   }

   function saveEmployees() {
      console.log(`sending ${data?.length} employees to server`);
   }

   let content: ReactNode = "";

   if (error) {
      content = (
         <p className="text-red-800">
            <Warning color="inherit" sx={{ mt: -0.3, mr: 0.5 }} />
            Error processing file: {error}
         </p>
      );
   } else if (!data)
      content = (
         <Box sx={{ mb: 3 }} className="text-left">
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
                        Text file data items to be delimited by a tab space with each row on a new line
                     </Typography>
                  </div>
               </li>
               <li>
                  <div className="flex items-start gap-1">
                     <KeyboardDoubleArrowRight fontSize="small" />
                     <Typography variant="subtitle2">
                        &lsquo;national_id&rsquo; and &lsquo;name&rsquo; must have values
                     </Typography>
                  </div>
               </li>
               <li>
                  <div className="flex items-start gap-1">
                     <KeyboardDoubleArrowRight fontSize="small" />

                     <Typography variant="subtitle2">
                        Date fields should be of the format &lsquo;dd/mm/yyyy&rsquo;
                     </Typography>
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
   else {
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
               rows={data}
               columns={cols}
               autosizeOnMount
               disableColumnMenu
               // disableColumnSorting
               disableRowSelectionOnClick
               disableColumnResize
               disableColumnSelector
               scrollbarSize={5}
               // density="compact"
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

   return (
      <div className="">
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
               key={"input-" + key}
               ref={inputRef}
               onChange={onChange}
               multiple={false}
               type="file"
               accept=".xlsx, .xls, .csv, .txt"
               className="hidden"
            />
         </div>

         <div className="bg-slate-50 min0h[50vh] rounded-[10px] p-5 text-center mt-5">{content} </div>
      </div>
   );
}

const cols: GridColDef[] = [
   { field: "national_id", headerName: "National ID", type: "string" },
   { field: "name", headerName: "Name", type: "string" },
   { field: "employee_id", headerName: "Employee ID", type: "string" },
   { field: "department", headerName: "Department", type: "string" },
   { field: "role", headerName: "Role", type: "string" },
   { field: "duties", headerName: "Duties", type: "string" },
   // { field: "date_started", headerName: "Date Started", type: "date" },
   // { field: "date_left", headerName: "Date Left", type: "date" },
   { field: "date_started", headerName: "Date Started", type: "string" },
   { field: "date_left", headerName: "Date Left", type: "string" },
];
