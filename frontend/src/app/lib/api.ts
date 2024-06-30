import { axiosClient } from ".";
import { HistoricalCareerTimestampInterface, UnormalizedCurrentEmployeeInterface } from "../interfaces";

export default abstract class API {
   static async getTalent(query: string, isDate: boolean) {
      return await axiosClient
         .get<UnormalizedCurrentEmployeeInterface[]>("/talent", {
            params: {
               query: query,
               is_date: isDate,
            },
         })
         .then((res) => res.data);
   }

   static async getTalentWithID(id: string | number) {
      type ReturnType = {
         talent: UnormalizedCurrentEmployeeInterface;
         employment_history: HistoricalCareerTimestampInterface[];
      };

      return await axiosClient.get<ReturnType>(`/talent/${id}`).then((res) => res.data);
   }
}
