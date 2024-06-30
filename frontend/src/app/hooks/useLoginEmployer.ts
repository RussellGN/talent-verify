import { useMutation } from "@tanstack/react-query";
import API from "../lib/api";
import { Credentials } from "../types";
import { setCookie } from "../lib";

export default function useLoginEmployer() {
   return useMutation({
      mutationFn: (credentials: Credentials) => API.loginEmployer(credentials),
      onSuccess: (data) => setCookie("token", data.token, 1),
   });
}
