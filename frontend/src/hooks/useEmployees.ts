import { useQuery } from "@tanstack/react-query";
import API from "../lib/api";
import { getCookie } from "../lib";

export default function useEmployees() {
   const token = getCookie("token");
   return useQuery({
      queryKey: ["employees", { token }],
      queryFn: () => API.getEmployees(token || ""),
   });
}
