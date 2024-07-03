import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../lib/api";
import { getCookie } from "../lib";

export default function useRemoveEmployee() {
   const queryClient = useQueryClient();
   const token = getCookie("token");

   return useMutation({
      mutationFn: (id: number | string) => API.removeEmployee(token || "", id),
      onSuccess: async () => {
         await queryClient.invalidateQueries({ queryKey: ["employees", { token: token }] });
      },
   });
}
