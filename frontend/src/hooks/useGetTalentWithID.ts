import { useQuery } from "@tanstack/react-query";
import API from "../lib/api";

export default function useGetTalentWithID(id: string | number) {
   return useQuery({
      queryKey: ["talent", { id }],
      queryFn: () => API.getTalentWithID(id),
   });
}
