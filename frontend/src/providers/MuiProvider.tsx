import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import React, { PropsWithChildren } from "react";
import theme from "./theme";

export default function MuiProvider({ children }: PropsWithChildren) {
   return (
      <AppRouterCacheProvider>
         <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
         </ThemeProvider>
      </AppRouterCacheProvider>
   );
}
