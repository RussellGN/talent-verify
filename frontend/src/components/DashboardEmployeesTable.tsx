"use client";

import { DataGrid } from "@mui/x-data-grid";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import useDashboardEmployeesTable from "../hooks/useDashboardEmployeesTable";
import { Typography } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";

export default function DashboardEmployeesTable() {
   const {
      rows,
      columns,
      processRowUpdate,
      updateData,
      isUpdating,
      isUpdateSuccess,
      isUpdateError,
      updateError,
      resetUpdate,
   } = useDashboardEmployeesTable();

   if (rows.length === 0) {
      return (
         <div className="text-center bg-slate-50 p-5">
            <Typography variant="h6">No employees</Typography>
            <Typography>table of employees will appear after you&apos;ve added or uploaded some</Typography>
         </div>
      );
   }

   return (
      <>
         <div className="p-5 ">
            <Typography variant="subtitle2">
               <InfoOutlined color="warning" fontSize="inherit" sx={{ mt: -0.3, mr: 0.5 }} />
               To update an employee&apos;s details, click in any data cell and enter a new value.
            </Typography>
         </div>

         <div className="bg-white">
            <DataGrid
               rows={rows}
               columns={columns}
               processRowUpdate={processRowUpdate}
               // autosizeOnMount
               // disableColumnResize
               disableRowSelectionOnClick
               density="compact"
               disableColumnSelector
               scrollbarSize={5}
               loading={isUpdating}
               showCellVerticalBorder
               initialState={{
                  sorting: {
                     sortModel: [{ field: "id", sort: "desc" }],
                  },
               }}
            />
            <Snackbar
               open={isUpdating || isUpdateError || isUpdateSuccess}
               anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
               onClose={resetUpdate}
               // autoHideDuration={6000}
            >
               <Alert
                  variant="filled"
                  severity={isUpdateError ? "error" : isUpdateSuccess ? "success" : "info"}
                  onClose={resetUpdate}
               >
                  {isUpdateError
                     ? `Error saving changes: ${updateError?.message}`
                     : isUpdateSuccess
                     ? `${updateData?.employees_updated[0].name || "Employee"} was updated successfully`
                     : isUpdating
                     ? "Saving changes..."
                     : "No changes made"}
               </Alert>
            </Snackbar>
         </div>
      </>
   );
}
