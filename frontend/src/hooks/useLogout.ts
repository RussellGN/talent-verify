import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../lib/api";
import { useRouter } from "next/navigation";
import { deleteCookie, getCookie } from "../lib";

export default function useLogout() {
   const router = useRouter();
   const queryClient = useQueryClient();
   const token = getCookie("token");

   const { mutate: logout, isPending: logoutPending } = useMutation({
      mutationFn: () => API.logoutEmployer(token || ""),
      onSuccess: async (data) => {
         console.log(data);
         deleteCookie("token");
         await queryClient.invalidateQueries({ queryKey: ["employer", "employees", { token }] });
         router.push("/");
      },
   });

   return { logout, logoutPending };
}
