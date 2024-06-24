import type { Metadata } from "next";
import "./globals.css";

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
         <body>{children}</body>
      </html>
   );
}
