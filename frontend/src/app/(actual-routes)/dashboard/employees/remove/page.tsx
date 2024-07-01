"use client";

import { sampleEmployees } from "@/data/sampleData";
import { EmployeeAutocompleteOption } from "@/types";
import { InfoOutlined } from "@mui/icons-material";
import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import { FormEvent, SyntheticEvent, useState } from "react";

export default function RemovePage() {
   const [selectedValue, setSelectedValue] = useState<EmployeeAutocompleteOption>();

   function onChange(e: SyntheticEvent<Element, Event>, value: EmployeeAutocompleteOption) {
      setSelectedValue(value);
   }

   function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      console.log("removing ", selectedValue?.label);
   }

   return (
      <form onSubmit={handleSubmit} className="p-5">
         <Typography variant="subtitle2" sx={{ mb: 3 }} className="max-w-[100ch]">
            <InfoOutlined fontSize="inherit" color="warning" sx={{ mt: -0.3, mr: 0.5 }} />
            If you remove an employee, they will be excluded from your list of employees and assigned to no employer. Their
            details and employment history will still be discoverable on the platform however. They will remain unassigned
            until an employer adds them to their list of employees via single entry or file upload.
         </Typography>

         <label className="flex mb-4 flex-col gap-1" htmlFor="employee_query">
            <span className="p-2">
               <InfoOutlined
                  fontSize="inherit"
                  titleAccess="Search for the employee you wish to remove"
                  sx={{
                     color: "primary.main",
                     mr: 0.5,
                     mt: -0.3,
                     cursor: "pointer",
                     "&:hover": { color: "primary.light" },
                  }}
               />{" "}
               Employee to remove*
            </span>
            <Autocomplete
               // value={selectedValue}
               onChange={onChange}
               disablePortal
               id="combo-box-employee"
               options={employeeOptions}
               sx={{ width: 500 }}
               renderInput={(params) => <TextField {...params} label="Search employees" name="employee" />}
            />
         </label>

         <div className="mt-5">
            <Button
               sx={{ textTransform: "capitalize" }}
               disabled={!selectedValue}
               type="submit"
               color="error"
               variant="contained"
            >
               Remove {selectedValue ? selectedValue.label : ""}
            </Button>
         </div>
      </form>
   );
}

const employeeOptions = sampleEmployees.map((emp) => ({
   label: `${emp.name} - ${emp.national_id}`,
   national_id: emp.national_id,
   id: emp.id,
}));
