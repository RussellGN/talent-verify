import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../lib/api";
import { Credentials } from "../types";
import { setCookie } from "../lib";

export default function useLoginEmployer() {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: (credentials: Credentials) => API.loginEmployer(credentials),
      onSuccess: (data) => {
         setCookie("token", data.token, 1);
         queryClient.setQueryData(["employer", { token: data.token }], {
            employer: data.employer,
            employees: data.employees,
         });
         queryClient.setQueryData(["employees"], data.employees);
      },
   });
}
