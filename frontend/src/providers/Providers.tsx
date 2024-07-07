import { PropsWithChildren } from "react";
import ReactQueryProvider from "./ReactQueryProvider";
import MuiProvider from "./MuiProvider";

export default function Providers({ children }: PropsWithChildren) {
   return (
      <ReactQueryProvider>
         <MuiProvider>{children}</MuiProvider>
      </ReactQueryProvider>
   );
}
