import * as XLSX from "xlsx";

export function capitalizeWords(str: string) {
   let finalString = "";
   const words = str
      .trim()
      .split(" ")
      .filter((wrd) => wrd.trim() !== "");

   words.forEach((word) => (finalString += word[0].toUpperCase() + word.slice(1) + " "));

   return finalString;
}

export async function wait(seconds: number, log?: boolean) {
   if (log) console.log("waiting");
   await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
   if (log) console.log("done waiting");
}

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

export function arraysHaveSameElements<T>(arr1: T[], arr2: T[]): boolean {
   const set1 = new Set(arr1);
   const set2 = new Set(arr2);

   if (set1.size !== set2.size) {
      return false;
   }

   set1.forEach((item) => {
      if (!set2.has(item)) {
         return false;
      }
   });

   return true;
}

export function excelToJson<T extends { id?: number | string }>(file: File): Promise<T[]> {
   return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = function (e) {
         try {
            const workbook = XLSX.read(e.target?.result, { type: "array" });

            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];

            const json = XLSX.utils.sheet_to_json<T>(worksheet);
            const keys = Object.keys(json[0]);

            const expectedKeys = [
               "national_id",
               "name",
               "employee_id",
               "department",
               "role",
               "duties",
               "date_started",
               "date_left",
            ];

            if (!arraysHaveSameElements<string>(keys, expectedKeys)) reject("Excel sheet has incorrect field structure");

            console.log(json[0]);
            json.forEach((emp, index) => {
               emp.id = index;
            });
            resolve(json);
         } catch (error) {
            reject("Error reading Excel file: " + String(error));
         }
      };

      reader.onerror = function (error) {
         reject("FileReader error: " + String(error));
      };

      reader.readAsArrayBuffer(file);
   });
}

export function csvToJson(file: File) {
   console.log(file);
   return "";
}

export function txtToJson(file: File) {
   console.log(file);
   return "";
}
