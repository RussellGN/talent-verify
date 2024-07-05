import { CircularProgress } from "@mui/material";

export default function error() {
   return (
      <div className="min-h-[72vh] flex items-center justify-center p-4">
         <CircularProgress />
      </div>
   );
}
