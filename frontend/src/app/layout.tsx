import type { Metadata } from "next";
import "./globals.css";
import Providers from "../providers/Providers";
import Navbar from "../components/Navbar";
import { Container, Typography } from "@mui/material";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const metadata: Metadata = {
   title: "Talent Verify",
   description: "Talent Verify is an online talent verification service",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <Providers>
            <body>
               <Container sx={{ my: 1 }}>
                  <Navbar />
                  <main>{children}</main>
                  <footer className="mt-5 border-t-2 p-3 sm:px-10 sm:pt-4 flex items-center justify-between">
                     <Typography variant="caption">Talent Verify</Typography>
                     <Typography variant="caption">By Russell Gundani</Typography>
                  </footer>
               </Container>
               <ReactQueryDevtools initialIsOpen={false} />
            </body>
         </Providers>
      </html>
   );
}
