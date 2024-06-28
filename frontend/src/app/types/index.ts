export type NewEmployee = {
   id?: number | string;
   national_id: string | undefined;
   name: string | undefined;
   employee_id?: string | number | undefined;
   department?: string | undefined;
   role?: string | undefined;
   duties?: string | undefined;
   date_started?: Date | string | undefined;
   date_left?: Date | string | undefined;
};

export type EmployeeAutocompleteOption = {
   label: string;
   national_id: string;
   id: string | number;
} | null;
