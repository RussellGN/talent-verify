import { useQuery } from "@tanstack/react-query";
import API from "../lib/api";
import { getCookie } from "../lib/index";
import { redirect } from "next/navigation";

export default function useEmployer() {
   const token = getCookie("token");
   if (!token) redirect("/login");
   return useQuery({
      queryKey: ["employer", { token }],
      queryFn: () => API.getEmployer(token),
   });
}
