import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../lib/api";
import { getCookie } from "../lib";
import { NewEmployee } from "@/types";

export default function useAddEmployees() {
   const queryClient = useQueryClient();
   const token = getCookie("token");

   return useMutation({
      mutationFn: (data: NewEmployee[]) => API.addEmployees(token || "", data),
      onSuccess: async () => {
         await queryClient.invalidateQueries({ queryKey: ["employees", { token: token }] });
      },
   });
}
