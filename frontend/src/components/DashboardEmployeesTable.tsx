"use client";

import { DataGrid } from "@mui/x-data-grid";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import useDashboardEmployeesTable from "../hooks/useDashboardEmployeesTable";
import { Typography } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";

export default function DashboardEmployeesTable() {
   const { rows, columns, processRowUpdate, handleProcessRowUpdateError, loading, snackbar, handleCloseSnackbar } =
      useDashboardEmployeesTable();

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
               To update an employee&apos;s details, click in any data cell and enter a new value. You will be prompted for
               confirmation before saving.
            </Typography>
         </div>

         <div>
            <DataGrid
               rows={rows}
               columns={columns}
               processRowUpdate={processRowUpdate}
               onProcessRowUpdateError={handleProcessRowUpdateError}
               autosizeOnMount
               disableRowSelectionOnClick
               disableColumnResize
               disableColumnSelector
               scrollbarSize={5}
               loading={loading}
               showCellVerticalBorder
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
      </>
   );
}
