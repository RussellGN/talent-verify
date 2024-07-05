"use client";

import { ThemeOptions, createTheme } from "@mui/material";

export const themeOptions: ThemeOptions = {
   palette: {
      primary: {
         light: "rgb(79, 94, 180)",
         main: "rgb(57, 73, 163)",
         dark: "rgb(60, 68, 114)",
      },
      text: {
         primary: "rgb(90,90,90)",
      },
   },
   components: {
      MuiButton: {
         defaultProps: {
            variant: "contained",
            size: "small",
            sx: {
               px: 3,
            },
         },
         styleOverrides: {
            root: {
               borderRadius: "15px",
               textTransform: "capitalize",
            },
         },
      },
   },
};

const theme = createTheme(themeOptions);

export default theme;
