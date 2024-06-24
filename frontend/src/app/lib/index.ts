export function friendlyDate(date: string | Date, format?: "second" | "third") {
   date = new Date(date);
   switch (format) {
      case "second":
         return Intl.DateTimeFormat("en-GB", { month: "short", day: "2-digit", year: "numeric" }).format(date);
      case "third":
         return Intl.DateTimeFormat("en-GB", { month: "numeric", day: "2-digit", year: "2-digit" }).format(date);
      default:
         return Intl.DateTimeFormat("en-GB", { month: "short", day: "2-digit", year: "2-digit" }).format(date);
   }
}
