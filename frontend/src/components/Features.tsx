import { Button, Typography } from "@mui/material";
import Link from "next/link";

export default function Features() {
   return (
      <div className="border-t-8 mt-10 py-10 min-h-[550px]: flex flex-col items-center justify-center gap-3 text-center">
         <Typography variant="h6"> For Employers</Typography>
         <Typography className="max-w-md" sx={{ mb: 2, px: 2 }}>
            Talent-verify provides you a means to keep track of your organization&apos;s employees. Register for an account
            and manage your employees&apos;s details in one place.
         </Typography>

         <div>
            <Button color="success" component={Link} href="/register">
               Register as an employer
            </Button>
         </div>
      </div>
   );
}
