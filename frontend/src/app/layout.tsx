import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers/Providers";
import Navbar from "./components/Navbar";
import { Container } from "@mui/material";

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
               <Container sx={{ my: 3 }}>
                  <Navbar />
                  {children}
               </Container>
            </body>
         </html>
      </Providers>
   );
}
