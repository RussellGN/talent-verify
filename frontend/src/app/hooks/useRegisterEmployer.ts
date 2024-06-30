import { useMutation } from "@tanstack/react-query";
import API from "../lib/api";
import { EmployerRegistrationPayload } from "../types";
import { setCookie } from "../lib";

export default function useRegisterEmployer() {
   return useMutation({
      mutationFn: (data: EmployerRegistrationPayload) => API.registerEmployer(data),
      onSuccess: (data) => setCookie("token", data.token, 1),
   });
}
