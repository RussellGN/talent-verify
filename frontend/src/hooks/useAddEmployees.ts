import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../lib/api";
import { getCookie } from "../lib";
import { UnormalizedCurrentEmployeeInterface } from "@/interfaces";

export default function useAddEmployees() {
   const queryClient = useQueryClient();
   const token = getCookie("token");

   return useMutation({
      mutationFn: (data: UnormalizedCurrentEmployeeInterface[]) => API.addEmployees(token || "", data),
      onSuccess: async () => {
         await queryClient.invalidateQueries({ queryKey: ["employees", { token: token }] });
      },
   });
}
