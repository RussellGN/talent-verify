import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../lib/api";
import { EmployerRegistrationPayload } from "../types";
import { getCookie, setCookie } from "../lib";
import { redirect } from "next/navigation";

export default function useRegisterEmployer() {
   const queryClient = useQueryClient();
   const token = getCookie("token");
   if (token) redirect("/dashboard/employees");

   return useMutation({
      mutationFn: (data: EmployerRegistrationPayload) => API.registerEmployer(data),
      onSuccess: (data) => {
         setCookie("token", data.token, 1);
         queryClient.setQueryData(["employer", { token: data.token }], { employer: data.employer, employees: [] });
         queryClient.setQueryData(["employees", { token: data.token }], []);
      },
   });
}
