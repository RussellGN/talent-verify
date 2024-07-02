import { assignIdAndFormatDates, csvToJson, excelToJson, txtToJson } from "@/lib";
import { UploadEmployee } from "@/types";
import { GridColDef } from "@mui/x-data-grid";
import { ChangeEvent, useRef, useState } from "react";
import useAddEmployees from "./useAddEmployees";

export default function useUpload() {
   const { mutate, reset, data, isPending, isSuccess, isError, error } = useAddEmployees();
   const [fileData, setFileData] = useState<UploadEmployee[]>();
   const [parseError, setParseError] = useState<string>();
   const [showGuidelinesForTxt, setShowGuidelinesForTxt] = useState(false);
   const [inputKey, setInputKey] = useState(1);
   const inputRef = useRef<HTMLInputElement>(null);

   const clickInput = () => inputRef.current?.click();

   function handleFileInputChange(e: ChangeEvent<HTMLInputElement>) {
      setFileData(undefined);
      setParseError(undefined);
      setInputKey((prev) => prev + 1);

      if (e.target.files) {
         const file = e.target.files[0];
         const words = file.name.split(".");
         const extension = words[words.length - 1];

         let parseFunction: (file: File) => Promise<UploadEmployee[]>;
         switch (extension) {
            case "txt":
               parseFunction = txtToJson;
               break;
            case "xlsx":
               parseFunction = (file: File) => excelToJson<UploadEmployee>(file);
               break;
            case "xls":
               parseFunction = (file: File) => excelToJson<UploadEmployee>(file);
               break;
            case "csv":
               parseFunction = (file: File) => csvToJson<UploadEmployee>(file);
               break;
            default:
               alert(`file uploaded '${file.name}' is not of supported types (.xlsx, .xls, .csv and .txt)`);
               return;
         }

         parseFunction(file)
            .then((json) => {
               json.forEach((emp, index) => assignIdAndFormatDates(emp, index));
               setFileData(json);
            })
            .catch((err: string) => setParseError(err));
      }
   }

   function saveEmployees() {
      console.log(`sending ${fileData?.length} employees to server`);
      if (fileData) {
         const formatedData = fileData.map((emp) => ({
            national_id: emp.national_id,
            name: emp.name,
            employee_id: emp.employee_id,
            department_name: emp.department,
            role_title: emp.role,
            role_duties: emp.duties,
            date_started: emp.date_started ? new Date(emp.date_started).toISOString().split("T")[0] : emp.date_started,
            date_left: emp.date_left ? new Date(emp.date_left).toISOString().split("T")[0] : emp.date_left,
         }));
         mutate(formatedData);
      }
   }

   const cols: GridColDef[] = [
      { field: "national_id", headerName: "National ID", type: "string" },
      { field: "name", headerName: "Name", type: "string" },
      { field: "employee_id", headerName: "Employee ID", type: "string" },
      { field: "department", headerName: "Department", type: "string" },
      { field: "role", headerName: "Role", type: "string" },
      { field: "duties", headerName: "Duties", type: "string" },
      { field: "date_started", headerName: "Date Started", type: "date" },
      { field: "date_left", headerName: "Date Left", type: "date" },
   ];

   return {
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
   };
}