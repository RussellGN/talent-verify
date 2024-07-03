import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../lib/api";
import { getCookie } from "../lib";
import { UpdatedEmployee } from "@/types";

export default function useUpdateEmployees() {
   const queryClient = useQueryClient();
   const token = getCookie("token");

   return useMutation({
      mutationFn: (data: UpdatedEmployee[]) => API.updateEmployees(token || "", data),
      onSuccess: async () => {
         await queryClient.invalidateQueries({ queryKey: ["employees", { token: token }] });
      },
   });
}
