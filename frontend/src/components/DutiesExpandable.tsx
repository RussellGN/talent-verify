import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { useState } from "react";

export default function DutiesExpandable({ content }: { content: string }) {
   const [expanded, setExpanded] = useState(false);

   return (
      <>
         {expanded ? content : content.slice(0, 70) + "..."}
         <br />
         <button className="p-0 border-0 bg-transparent text-[goldenrod]" onClick={() => setExpanded((prev) => !prev)}>
            {expanded ? "show less" : "expand"}
            {expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
         </button>
      </>
   );
}
