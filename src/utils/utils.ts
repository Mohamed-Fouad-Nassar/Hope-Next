import { format } from "date-fns";

export function extractTextFromHTML(html: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return doc.body.textContent?.trim() || "";
}

export function formateDateTime(date: string | Date) {
  return format(new Date(date), "MMM dd, yyyy - h:mm a");
}

// export const formatCurrency = (amount: number) => {
//   return (amount / 100).toLocaleString("en-US", {
//     style: "currency",
//     currency: "USD",
//   });
// };

// export const formatDateToLocal = (
//   dateStr: string,
//   locale: string = "en-US"
// ) => {
//   const date = new Date(dateStr);
//   const options: Intl.DateTimeFormatOptions = {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//   };
//   const formatter = new Intl.DateTimeFormat(locale, options);
//   return formatter.format(date);
// };

// export function replaceElementInArray<T>(
//   array: T[],
//   oldElement: T,
//   newElement: T
// ) {
//   const index = array.indexOf(oldElement);
//   if (index !== -1) {
//     array[index] = newElement;
//   } else {
//     console.log("Element not found in the array");
//   }
// }
