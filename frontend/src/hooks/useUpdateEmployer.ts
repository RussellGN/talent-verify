import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../lib/api";
import { EmployerUpdatePayload } from "../types";
import { getCookie } from "../lib";
import { UnormalizedCurrentEmployeeInterface } from "@/interfaces";

export default function useUpdateEmployer() {
   const queryClient = useQueryClient();
   const token = getCookie("token");

   return useMutation({
      mutationFn: (data: EmployerUpdatePayload) => API.updateEmployer(token || "", data),
      onSuccess: (data) => {
         queryClient.setQueryData(
            ["employer", { token: token }],
            (oldData: { employees: UnormalizedCurrentEmployeeInterface[] }) => ({
               employer: data.employer,
               employees: oldData.employees,
            })
         );
         queryClient.setQueryData(["employer-details", { id: String(data.employer.id) }], () => data.employer);
      },
   });
}
