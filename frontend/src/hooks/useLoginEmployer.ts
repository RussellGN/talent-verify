import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../lib/api";
import { Credentials } from "../types";
import { getCookie, setCookie } from "../lib";
import { redirect } from "next/navigation";

export default function useLoginEmployer() {
   const queryClient = useQueryClient();
   const token = getCookie("token");
   if (token) redirect("/dashboard/employees");

   return useMutation({
      mutationFn: (credentials: Credentials) => API.loginEmployer(credentials),
      onSuccess: (data) => {
         setCookie("token", data.token, 1);
         queryClient.setQueryData(["employer", { token: data.token }], {
            employer: data.employer,
            employees: data.employees,
         });
         queryClient.setQueryData(["employees", { token: data.token }], data.employees);
      },
   });
}
