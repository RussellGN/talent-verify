import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "../lib";
import { UnormalizedCurrentEmployeeInterface } from "../interfaces";

export default function useGetTalent(query: string, isDate: boolean) {
   return useQuery({
      queryKey: ["talent", { query, isDate }],
      queryFn: async () => {
         return await axiosClient
            .get<UnormalizedCurrentEmployeeInterface[]>("/talent", {
               params: {
                  query: query,
                  is_date: isDate,
               },
            })
            .then((res) => res.data);
      },
   });
}
