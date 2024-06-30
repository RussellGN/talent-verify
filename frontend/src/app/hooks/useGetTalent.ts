import { useQuery } from "@tanstack/react-query";
import API from "../lib/api";

export default function useGetTalent(query: string, isDate: boolean) {
   return useQuery({
      queryKey: ["talent", { query, isDate }],
      queryFn: () => API.getTalent(query, isDate),
   });
}
