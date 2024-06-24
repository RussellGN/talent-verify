import { PropsWithChildren } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import ReactQueryProvider from "./ReactQueryProvider";
import { CssBaseline } from "@mui/material";

export default function Providers({ children }: PropsWithChildren) {
   return (
      <ReactQueryProvider>
         <AppRouterCacheProvider>
            <CssBaseline />
            {children}
         </AppRouterCacheProvider>
      </ReactQueryProvider>
   );
}
