import { useState } from "react";
import { UnormalizedCurrentEmployeeInterface } from "../interfaces";
import { AlertProps } from "@mui/material";
import { GridColDef, GridRowModel, GridRowsProp } from "@mui/x-data-grid";
import useEmployees from "./useEmployees";

export default function useDashboardEmployeesTable() {
   const { isPending, isError, error, data } = useEmployees();
   const [loading, setLoading] = useState(false);

   console.log({ isPending, isError, error, data });

   function mutateRow(employee: Partial<UnormalizedCurrentEmployeeInterface>) {
      return new Promise<Partial<UnormalizedCurrentEmployeeInterface>>((resolve, reject) => {
         setTimeout(() => {
            if (employee.name?.trim() === "") {
               reject(new Error("Error while saving employee: name cannot be empty."));
            } else {
               resolve({ ...employee, name: employee.name?.toUpperCase() });
            }
         }, 2000);
      });
   }

   async function processRowUpdate(newRow: GridRowModel, oldRow: GridRowModel) {
      console.log(oldRow);
      setLoading(true);
      // Make the HTTP request to save in the backend
      const response = await mutateRow(newRow);
      setSnackbar({ children: "Employee successfully saved", severity: "success" });
      setLoading(false);
      return response;
   }

   const handleProcessRowUpdateError = (error: Error) => {
      setSnackbar({ children: error.message, severity: "error" });
   };

   const [snackbar, setSnackbar] = useState<Pick<AlertProps, "children" | "severity"> | null>(null);

   const handleCloseSnackbar = () => setSnackbar(null);

   const dataAvailable = !(isPending || isError);

   let rows: GridRowsProp & UnormalizedCurrentEmployeeInterface[] = [];
   if (dataAvailable) {
      const properlyFormatedData = data.map((employee) => ({
         ...employee,
         date_started: employee.date_started ? new Date(employee.date_started) : undefined,
         date_left: employee.date_left ? new Date(employee.date_left) : undefined,
      }));
      rows = properlyFormatedData;
   }

   const columns: GridColDef[] = [
      { field: "id", headerName: "ID", type: "string" },
      { field: "national_id", headerName: "National ID", type: "string", editable: true },
      { field: "name", headerName: "Name", type: "string", editable: true },
      { field: "employee_id", headerName: "Employee ID", type: "string", editable: true },
      { field: "department", headerName: "Department", type: "string", editable: true },
      { field: "role", headerName: "Role", type: "string", editable: true },
      { field: "duties", headerName: "Duties", type: "string", editable: true },
      { field: "date_started", headerName: "Date Started", type: "date", editable: true },
      { field: "date_left", headerName: "Date Left", type: "date", editable: true },
   ];

   return {
      columns,
      rows,
      processRowUpdate, // not handled
      loading, // not handled
      handleProcessRowUpdateError, // not handled
      snackbar, // not handled
      handleCloseSnackbar, // not handled
   };
}
