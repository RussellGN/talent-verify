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
               setParseError(`file uploaded '${file.name}' is not of supported types (.xlsx, .xls, .csv and .txt)`);
               return;
         }

         parseFunction(file)
            .then((json) => {
               json.forEach((emp, index) => assignIdAndFormatDates(emp, index));
               if (json.length > 100) {
                  alert(
                     "File uploaded has more than 100 employee records. Employees after the first 100 will be discarded"
                  );
                  console.log(json.length);
                  setFileData(json.splice(0, 100));
               } else {
                  setFileData(json);
               }
            })
            .catch((err: string) => setParseError(err));
      }
   }

   function saveEmployees() {
      if (fileData) {
         const formatedData = fileData.map((emp) => {
            let date_started = undefined;
            try {
               if (emp.date_started) {
                  date_started = new Date(emp.date_started).toISOString().split("T")[0];
               }
            } catch {
               console.log(`invalid date_started ${date_started}`);
            }

            return {
               national_id: emp.national_id,
               name: emp.name,
               employee_id: emp.employee_id,
               department_name: emp.department,
               role_title: emp.role,
               role_duties: emp.duties,
               date_started: date_started,
               // date_left: emp.date_left ? new Date(emp.date_left).toISOString().split("T")[0] : emp.date_left,
               date_left: undefined,
            };
         });
         mutate(formatedData);
      }
   }

   const cols: GridColDef[] = [
      // { field: "id", headerName: "ID", type: "string", width: 65 },
      { field: "name", headerName: "Name", type: "string", width: 150 },
      { field: "national_id", headerName: "National ID", type: "string", width: 120 },
      { field: "employee_id", headerName: "Employee ID", type: "string", width: 100 },
      { field: "department", headerName: "Department", type: "string", width: 130 },
      { field: "role", headerName: "Role", type: "string", width: 150 },
      { field: "duties", headerName: "Duties", type: "string", width: 200 },
      { field: "date_started", headerName: "Date Started", type: "date", width: 100 },
      // { field: "date_left", headerName: "Date Left", type: "date", width: 100 },
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
