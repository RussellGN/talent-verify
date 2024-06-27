import DashboardEmployeesTable from "@/app/components/DashboardEmployeesTable";
import { Add, InfoOutlined, Remove, UploadFile } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import Link from "next/link";

export default function EmployeesPage() {
   return (
      <div>
         <div className="flex gap-3 items-center justify-end border shadow-md p-4 rounded-[10px]">
            <Button
               sx={{ textTransform: "capitalize" }}
               startIcon={<Add />}
               type="submit"
               color="success"
               variant="contained"
               component={Link}
               href="/dashboard/employees/new"
            >
               New
            </Button>

            <Button
               sx={{ textTransform: "capitalize" }}
               startIcon={<UploadFile />}
               type="submit"
               color="success"
               variant="contained"
               component={Link}
               href="/dashboard/employees/upload"
            >
               Add/Update from CSV, Excel or Text file
            </Button>

            <Button
               sx={{ textTransform: "capitalize" }}
               startIcon={<Remove />}
               type="submit"
               color="error"
               variant="contained"
               component={Link}
               href="/dashboard/employees/remove"
            >
               Remove an Employee
            </Button>
         </div>

         <div className="p-5 ">
            <Typography variant="subtitle2">
               <InfoOutlined color="warning" fontSize="inherit" sx={{ mt: -0.3, mr: 0.5 }} />
               To update an employee&apos;s details, click in any (editable) data cell and enter a new value. You will be
               prompted for confirmation before saving.
            </Typography>
         </div>

         <div className="py-5">
            <DashboardEmployeesTable />
         </div>
      </div>
   );
}
