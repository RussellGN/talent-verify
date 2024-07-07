"use client";

import DashboardEmployeesTable from "@/components/DashboardEmployeesTable";
import useIsMobile from "@/hooks/useIsMobile";
import { Add, Remove, UploadFile } from "@mui/icons-material";
import { Button } from "@mui/material";
import Link from "next/link";

export default function EmployeesPage() {
   const isMobile = useIsMobile();

   return (
      <div>
         <div className="bg-white flex gap-3 items-center justify-center md:justify-end border shadow-md p-4 rounded-[10px]">
            <Button startIcon={<Add />} type="submit" color="success" component={Link} href="/dashboard/employees/new">
               New
            </Button>

            <Button
               startIcon={<UploadFile />}
               type="submit"
               color="success"
               component={Link}
               href="/dashboard/employees/upload"
            >
               {isMobile ? "Upload" : "Add/Update from CSV, Excel or Text file"}
            </Button>

            <Button startIcon={<Remove />} type="submit" color="error" component={Link} href="/dashboard/employees/remove">
               {isMobile ? "Remove" : "Remove an Employee"}
            </Button>
         </div>

         <div className="py-5">
            <DashboardEmployeesTable />
         </div>
      </div>
   );
}
