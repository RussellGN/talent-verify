import { UnormalizedCurrentEmployeeInterface } from "../interfaces";
import { GridColDef, GridRowModel, GridRowsProp } from "@mui/x-data-grid";
import useEmployees from "./useEmployees";
import useUpdateEmployees from "./useUpdateEmployees";
import { UpdatedEmployee } from "@/types";

export default function useDashboardEmployeesTable() {
   const { data } = useEmployees();
   const {
      mutate,
      reset: resetUpdate,
      data: updateData,
      isPending: isUpdating,
      isSuccess: isUpdateSuccess,
      isError: isUpdateError,
      error: updateError,
   } = useUpdateEmployees();

   function processRowUpdate(
      newRow: GridRowModel & UnormalizedCurrentEmployeeInterface,
      oldRow: GridRowModel & UnormalizedCurrentEmployeeInterface
   ) {
      resetUpdate();
      console.log(oldRow, newRow);

      let changesWereMade = false;
      Object.keys(oldRow).forEach((key) => {
         if (oldRow[key] !== newRow[key]) {
            changesWereMade = true;
         }
      });

      if (changesWereMade) {
         const formatedData = [newRow].map((emp) => ({
            id: Number(emp.id),
            national_id: emp.national_id,
            name: emp.name,
            employee_id: emp.employee_id,
            department_name: emp.department,
            role_title: emp.role,
            role_duties: emp.duties,
            date_started: emp.date_started ? new Date(emp.date_started).toISOString().split("T")[0] : emp.date_started,
            date_left: emp.date_left ? new Date(emp.date_left).toISOString().split("T")[0] : emp.date_left,
         }));
         mutate(formatedData as UpdatedEmployee[]);
      }

      return oldRow;
   }

   let rows: GridRowsProp & UnormalizedCurrentEmployeeInterface[] = [];
   if (data?.length) {
      const properlyFormatedData = data.map((employee) => ({
         ...employee,
         date_started: employee.date_started ? new Date(employee.date_started) : undefined,
         date_left: employee.date_left ? new Date(employee.date_left) : undefined,
      }));
      rows = properlyFormatedData;
   }

   const columns: GridColDef[] = [
      { field: "id", headerName: "ID", type: "string", width: 65 },
      { field: "name", headerName: "Name", type: "string", editable: true, width: 120 },
      { field: "national_id", headerName: "National ID", type: "string", editable: true, width: 120 },
      { field: "employee_id", headerName: "Employee ID", type: "string", editable: true, width: 100 },
      { field: "department", headerName: "Department", type: "string", editable: true, width: 120 },
      { field: "role", headerName: "Role", type: "string", editable: true, width: 120 },
      { field: "duties", headerName: "Duties", type: "string", editable: true, width: 130 },
      { field: "date_started", headerName: "Date Started", type: "date", editable: true, width: 100 },
      { field: "date_left", headerName: "Date Left", type: "date", editable: true, width: 100 },
   ];

   return {
      columns,
      rows,
      processRowUpdate,
      updateData,
      isUpdating,
      isUpdateSuccess,
      isUpdateError,
      updateError,
      resetUpdate,
   };
}
