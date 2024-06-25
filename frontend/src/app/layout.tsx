import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers/Providers";
import Navbar from "./components/Navbar";
import { Container, Typography } from "@mui/material";

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
      <Providers>
         <html lang="en">
            <body>
               <Container sx={{ my: 2 }}>
                  <Navbar />
                  <main>{children}</main>
                  <footer className="mt-5 border-t-2 px-10 pt-4 flex items-center justify-between">
                     <Typography variant="caption">Talent Verify</Typography>
                     <Typography variant="caption">By Russell Gundani</Typography>
                  </footer>
               </Container>
            </body>
         </html>
      </Providers>
   );
}
