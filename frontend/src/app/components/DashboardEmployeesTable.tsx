"use client";

import * as React from "react";
import { DataGrid, GridRowModel, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertProps } from "@mui/material/Alert";
import { sampleCareerTimestamps } from "../data/sampleData";
import { UnormalizedCurrentEmployeeInterface } from "../interfaces";

export default function DashboardEmployeesTable() {
   const [loading, setLoading] = React.useState(false);

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

   const [snackbar, setSnackbar] = React.useState<Pick<AlertProps, "children" | "severity"> | null>(null);

   const handleCloseSnackbar = () => setSnackbar(null);

   const processRowUpdate = async (newRow: GridRowModel) => {
      setLoading(true);
      // Make the HTTP request to save in the backend
      const response = await mutateRow(newRow);
      setSnackbar({ children: "Employee successfully saved", severity: "success" });
      setLoading(false);
      return response;
   };

   const handleProcessRowUpdateError = (error: Error) => {
      setSnackbar({ children: error.message, severity: "error" });
   };

   return (
      <div>
         <DataGrid
            rows={rows}
            columns={columns}
            processRowUpdate={processRowUpdate}
            onProcessRowUpdateError={handleProcessRowUpdateError}
            autosizeOnMount
            disableRowSelectionOnClick
            // checkboxSelection
            disableColumnResize
            disableColumnSelector
            scrollbarSize={5}
            // density="compact"
            loading={loading}
            showCellVerticalBorder
            // hideFooter
         />
         {!!snackbar && (
            <Snackbar
               open
               anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
               onClose={handleCloseSnackbar}
               autoHideDuration={6000}
            >
               <Alert {...snackbar} onClose={handleCloseSnackbar} />
            </Snackbar>
         )}
      </div>
   );
}

const columns: GridColDef[] = [
   { field: "id", headerName: "ID", type: "string" },
   { field: "national_id", headerName: "National ID", type: "string", editable: true },
   { field: "name", headerName: "Name", type: "string", editable: true },
   // { field: "employer", headerName: "Employer", type: "string" },
   { field: "employee_id", headerName: "Employee ID", type: "string", editable: true },
   { field: "department", headerName: "Department", type: "string", editable: true },
   { field: "role", headerName: "Role", type: "string", editable: true },
   { field: "duties", headerName: "Duties", type: "string", editable: true },
   { field: "date_started", headerName: "Date Started", type: "date", editable: true },
   { field: "date_left", headerName: "Date Left", type: "date", editable: true },
];

const relevantTimestamps: UnormalizedCurrentEmployeeInterface[] = sampleCareerTimestamps.map((stamp) => ({
   id: stamp.employee.id,
   national_id: stamp.employee.national_id,
   name: stamp.employee.name,
   // employer: stamp.employee.employer?.name,
   employee_id: stamp.employee.employee_id,
   department: stamp.role.department.name,
   role: stamp.role.title,
   duties: stamp.role.duties,
   date_started: stamp.date_started ? new Date(stamp.date_started) : undefined,
   date_left: stamp.date_left ? new Date(stamp.date_left) : undefined,
}));

const rows: GridRowsProp = relevantTimestamps;
