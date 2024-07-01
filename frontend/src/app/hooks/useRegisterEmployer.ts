import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../lib/api";
import { EmployerRegistrationPayload } from "../types";
import { setCookie } from "../lib";

export default function useRegisterEmployer() {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: (data: EmployerRegistrationPayload) => API.registerEmployer(data),
      onSuccess: (data) => {
         setCookie("token", data.token, 1);
         queryClient.setQueryData(["employer", { token: data.token }], { employer: data.employer, employees: [] });
         queryClient.setQueryData(["employees"], []);
      },
   });
}
