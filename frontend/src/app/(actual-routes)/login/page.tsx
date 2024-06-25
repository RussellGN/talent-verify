import { InfoOutlined } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";

export default function LoginPage() {
   return (
      <div className="min-h-[75vh] flex items-center justify-center">
         <form>
            <div className="w-full min-w-[400px] rounded-[20px] shadow-lg bg-slate-50 border px-10 py-20">
               <Typography variant="h4" className="text-center" sx={{ mb: 4 }}>
                  Login
               </Typography>
               <label className="flex mb-4 flex-col gap-1" htmlFor="username">
                  <span className="px-5">
                     <InfoOutlined
                        fontSize="inherit"
                        titleAccess="Enter the employer administrator's username"
                        sx={{
                           color: "primary.main",
                           mr: 0.5,
                           mt: -0.3,
                           cursor: "pointer",
                           "&:hover": { color: "primary.light" },
                        }}
                     />{" "}
                     Username
                  </span>
                  <input
                     className="min-w-[300px] d-block rounded-[20px] border-4 shadow-md px-5 py-1.5"
                     id="username"
                     name="username"
                     placeholder="Admin Username"
                     minLength={3}
                     required
                  />
               </label>

               <label className="flex mb-4 flex-col gap-1" htmlFor="username">
                  <span className="px-5">
                     <InfoOutlined
                        fontSize="inherit"
                        titleAccess="Enter the employer administrator's password"
                        sx={{
                           color: "primary.main",
                           mr: 0.5,
                           mt: -0.3,
                           cursor: "pointer",
                           "&:hover": { color: "primary.light" },
                        }}
                     />{" "}
                     Password
                  </span>
                  <input
                     className="min-w-[300px] d-block rounded-[20px] border-4 shadow-md px-5 py-1.5"
                     id="password"
                     name="password"
                     placeholder="Admin Username"
                     type="password"
                     minLength={3}
                     required
                  />
               </label>

               <div className="text-center mt-5">
                  <Button type="submit" variant="contained">
                     Login
                  </Button>
               </div>
            </div>
         </form>
      </div>
   );
}
