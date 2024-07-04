"use client";

import useEmployees from "@/hooks/useEmployees";
import useRemoveEmployee from "@/hooks/useRemoveEmployee";
import { EmployeeAutocompleteOption } from "@/types";
import { ArrowBack, CheckCircle, InfoOutlined, WarningOutlined } from "@mui/icons-material";
import { Autocomplete, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { FormEvent, SyntheticEvent, useMemo, useState } from "react";

export default function RemovePage() {
   const [selectedValue, setSelectedValue] = useState<EmployeeAutocompleteOption>();
   const { mutate, reset, data, isPending, isSuccess, isError, error } = useRemoveEmployee();
   const { data: employees } = useEmployees();
   const [key, setKey] = useState(1);

   function onChange(e: SyntheticEvent<Element, Event>, value: EmployeeAutocompleteOption) {
      setSelectedValue(value);
   }

   function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      console.log(selectedValue);
      console.log(employeeOptions);
      if (selectedValue) {
         console.log("removing ", selectedValue?.label);
         mutate(selectedValue.id);
      }
      setSelectedValue(undefined);
      setKey((prev) => prev + 1);
   }

   const employeeOptions: EmployeeAutocompleteOption[] =
      useMemo(
         () =>
            employees?.map((emp) => ({
               label: `${emp.name} - ${emp.national_id}`,
               national_id: emp.national_id,
               id: emp.id,
            })),
         [employees]
      ) || [];

   return (
      <>
         {/* had to return everything but conditionally render content in order to not clear form */}

         {isPending && (
            <div className="text-center px-10 py-20">
               <CircularProgress />
               <p>Removing...</p>
            </div>
         )}

         {isError && (
            <div className="text-center px-10 py-20">
               <WarningOutlined color="error" fontSize="large" />
               <p>
                  <strong>Removal error</strong> <br /> {error.message}
                  <br />
                  <Button
                     onClick={reset}
                     type="button"
                     startIcon={<ArrowBack />}
                     variant="outlined"
                     sx={{ mt: 3, textTransform: "capitalize" }}
                  >
                     Back to form
                  </Button>
               </p>
            </div>
         )}

         {isSuccess && (
            <div className="text-center px-10 py-20">
               <CheckCircle color="success" fontSize="large" />
               <p>
                  {data}
                  <br />
                  <Button
                     onClick={reset}
                     type="button"
                     startIcon={<ArrowBack />}
                     variant="outlined"
                     sx={{ mt: 3, textTransform: "capitalize" }}
                  >
                     Back to form
                  </Button>
               </p>
            </div>
         )}

         <div className={`${isPending || isError || isSuccess ? "hidden" : "block"}`}>
            <form key={key} onSubmit={handleSubmit} className="p-5">
               <Typography variant="subtitle2" sx={{ mb: 3 }} className="max-w-[100ch]">
                  <InfoOutlined fontSize="inherit" color="warning" sx={{ mt: -0.3, mr: 0.5 }} />
                  If you remove an employee, they will be excluded from your list of employees and assigned to no employer.
                  Their details and employment history will still be discoverable on the platform however. They will remain
                  unassigned until an employer adds them to their list of employees via single entry or file upload.
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
                     // clearOnBlur
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
         </div>
      </>
   );
}
