"use client";

import { Button } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function NavLink({ href, icon, children }: { href: string; icon: ReactNode; children: ReactNode }) {
   const pathname = usePathname();

   return (
      <Button size="small" variant={pathname === href ? "outlined" : "text"} startIcon={icon} component={Link} href={href}>
         {children}
      </Button>
   );
}
