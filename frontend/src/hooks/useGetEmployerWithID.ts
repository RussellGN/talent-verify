import { useQuery } from "@tanstack/react-query";
import API from "../lib/api";

export default function useGetEmployerWithID(id: string | number) {
   return useQuery({
      queryKey: ["employer-details", { id }],
      queryFn: () => API.getEmployerWithID(String(id)),
   });
}
