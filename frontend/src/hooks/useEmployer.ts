import { useQuery } from "@tanstack/react-query";
import API from "../lib/api";
import { getCookie } from "../lib";

export default function useEmployer() {
   const token = getCookie("token");
   return useQuery({
      queryKey: ["employer", { token }],
      queryFn: () => API.getEmployer(token || ""),
   });
}
