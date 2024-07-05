import * as XLSX from "xlsx";
import { UploadEmployee } from "../types";
import axios, { isAxiosError } from "axios";

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

export function findMissingFields<T>(expectedArray: T[], actualArray: T[]): string {
   const expectedSet = new Set(expectedArray);
   const actualSet = new Set(actualArray);

   let missingFields = "";
   expectedSet.forEach((item) => {
      if (!actualSet.has(item)) {
         missingFields += missingFields ? ", " + item : item;
      }
   });

   return missingFields;
}

export function assignIdAndFormatDates(emp: UploadEmployee, index: number) {
   emp.id = index;
   if (emp.date_started && emp.date_started.toString().trim() !== "") {
      console.log("date-started " + String(emp.date_started));
      emp.date_started = new Date(emp.date_started);
   } else emp.date_started = undefined;
   if (emp.date_left && emp.date_left.toString().trim() !== "") {
      console.log("date-left " + String(emp.date_left));
      emp.date_left = new Date(emp.date_left);
   } else emp.date_left = undefined;
}

export function excelToJson<T extends object>(file: File): Promise<T[]> {
   return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = function (e) {
         try {
            const workbook = XLSX.read(e.target?.result, { type: "array" });

            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];

            const json = XLSX.utils.sheet_to_json<T>(worksheet, { raw: false });
            if (!json.length) reject("Excel   file has no data");
            const actualKeys = Object.keys(json[0]);

            // check for compulsory fields only
            const expectedKeys = [
               "national_id",
               "name",
               "role",
               // "employee_id",
               // "department",
               // "duties",
               // "date_started",
               // "date_left",
            ];

            const missingFields = findMissingFields<string>(expectedKeys, actualKeys);
            if (missingFields !== "") reject("Excel sheet is missing compulsory field(s): " + missingFields);

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

export function csvToJson<T extends object>(file: File): Promise<T[]> {
   return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = function (e) {
         try {
            const workbook = XLSX.read(e.target?.result, { type: "string" });

            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];

            const json = XLSX.utils.sheet_to_json<T>(worksheet, { raw: false });

            if (!json.length) reject("CSV file has no data");
            const actualKeys = Object.keys(json[0]);
            console.log(json);

            // check for compulsory fields only
            const expectedKeys = [
               "national_id",
               "name",
               "role",
               // "employee_id",
               // "department",
               // "duties",
               // "date_started",
               // "date_left",
            ];

            const missingFields = findMissingFields<string>(expectedKeys, actualKeys);
            if (missingFields !== "") reject("CSV data is missing compulsory field(s): " + missingFields);

            resolve(json);
         } catch (error) {
            reject("Error reading CSV file: " + String(error));
         }
      };

      reader.onerror = function (error) {
         reject("FileReader error: " + String(error));
      };

      reader.readAsText(file);
   });
}

export function txtToJson(file: File): Promise<UploadEmployee[]> {
   return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
         try {
            /* 
               text file records are assumed to be in the format:

               national_id: 123456d 
               name: russell gundani 
               
               national_id: 233456d 
               name: david moyo 
               ...
            */

            const data = e.target?.result as string;
            const lines = data.split("\n");
            type JsonObj = { [key: string]: string | undefined } & UploadEmployee;
            const json: JsonObj[] = [];

            let employee: JsonObj = { national_id: undefined, name: undefined, role: undefined };
            lines.some((line) => {
               if (line.trim() === "") {
                  // found a delimiter
                  if (Boolean(employee.national_id) && Boolean(employee.name) && Boolean(employee.role)) {
                     json.push(employee);
                     employee = { national_id: undefined, name: undefined, role: undefined };
                  } else {
                     throw new Error(
                        "Employee records must have at least 'national_id', 'name', and 'role' key:value pairs"
                     );
                  }
               } else {
                  const [key, value] = line.split(":").map((item) => item.trim());
                  employee[key.toLowerCase()] = value !== "" ? value : undefined;
               }
            });

            if (Object.keys(employee).length > 0) {
               if (Boolean(employee.national_id) && Boolean(employee.name) && Boolean(employee.role)) {
                  json.push(employee);
                  employee = { national_id: undefined, name: undefined, role: undefined };
               } else
                  throw new Error("Employee records must have at least 'national_id', 'name', and 'role' key:value pairs");
            }

            resolve(json);
         } catch (error) {
            reject("Error reading Text file: " + String(error));
         }
      };

      reader.onerror = function (error) {
         reject("FileReader error: " + String(error));
      };

      reader.readAsText(file);
   });
}

export const axiosClient = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

axiosClient.interceptors.response.use(
   (res) => res,
   (error) => {
      if (isAxiosError(error) && error.response?.data) {
         return Promise.reject(new Error(JSON.stringify(error.response.data)));
      } else return Promise.reject(error);
   }
);

export function setCookie(cname: string, cvalue: string, exdays: number) {
   try {
      const d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      const expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
   } catch (error) {
      console.log("error getting cookie:", error);
   }
}

export function deleteCookie(cname: string) {
   try {
      document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
   } catch (error) {
      console.log("error deleting cookie:", error);
   }
}

export function getCookie(cname: string) {
   try {
      const name = cname + "=";
      const decodedCookie = decodeURIComponent(document.cookie);
      const ca = decodedCookie.split(";");
      for (let i = 0; i < ca.length; i++) {
         let c = ca[i];
         while (c.charAt(0) == " ") {
            c = c.substring(1);
         }
         if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
         }
      }
      return null;
   } catch (error) {
      console.log("error getting cookie:", error);
      return null;
   }
}

export function generateAvatarLetters(string: string): string {
   string = string.trim();
   const words = string.split(" ");
   const letters = words.map((word) => word[0]);

   const finalLetters = letters.join("").toUpperCase();

   if (finalLetters.length > 1) return finalLetters.slice(0, 2);
   else return finalLetters;
}
