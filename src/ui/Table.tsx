// export default function Table() {
//   return (
//     <div className="relative overflow-x-auto shadow rounded">
//       <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//         <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//           <tr>
//             <th scope="col" className="px-6 py-3">
//               Product name
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Color
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Category
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Price
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Action
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
//             <th
//               scope="row"
//               className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//             >
//               Apple MacBook Pro 17
//             </th>
//             <td className="px-6 py-4">Silver</td>
//             <td className="px-6 py-4">Laptop</td>
//             <td className="px-6 py-4">$2999</td>
//             <td className="px-6 py-4">
//               <a
//                 href="#"
//                 className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
//               >
//                 Edit
//               </a>
//             </td>
//           </tr>
//           <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
//             <th
//               scope="row"
//               className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//             >
//               Microsoft Surface Pro
//             </th>
//             <td className="px-6 py-4">White</td>
//             <td className="px-6 py-4">Laptop PC</td>
//             <td className="px-6 py-4">$1999</td>
//             <td className="px-6 py-4">
//               <a
//                 href="#"
//                 className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
//               >
//                 Edit
//               </a>
//             </td>
//           </tr>
//           <tr className="bg-white dark:bg-gray-800">
//             <th
//               scope="row"
//               className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//             >
//               Magic Mouse 2
//             </th>
//             <td className="px-6 py-4">Black</td>
//             <td className="px-6 py-4">Accessories</td>
//             <td className="px-6 py-4">$99</td>
//             <td className="px-6 py-4">
//               <a
//                 href="#"
//                 className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
//               >
//                 Edit
//               </a>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }

function Head({
  titles,
  actions = false,
}: {
  titles: string[];
  actions?: boolean;
}) {
  return (
    <thead className="text-xs text-center text-gray-800 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 border-b dark:border-gray-700 whitespace-nowrap">
      <tr>
        {titles.map((cur) => (
          <th key={cur} scope="col" className="px-6 py-4">
            {cur}
          </th>
        ))}

        {actions === true && (
          <th scope="col" className="px-6 py-4">
            <span className="sr-only">options</span>
          </th>
        )}
      </tr>
    </thead>
  );
}

function Body<T>({
  data,
  render,
}: {
  data: T[];
  render: (cur: T, i?: number) => React.ReactNode;
}) {
  if (!data.length)
    return (
      <tbody>
        <tr>
          <td
            className="text-base text-center py-8 font-medium bg-gray-50"
            colSpan={10}
          >
            There is no data available here now.
          </td>
        </tr>
      </tbody>
    );

  return <tbody>{data.map(render)}</tbody>;
}

function Foot({ children }: { children: React.ReactNode }) {
  return <tfoot className="border-t dark:border-gray-700">{children}</tfoot>;
}

export default function Table({ children }: { children: React.ReactNode }) {
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-400">
      {children}
    </table>
  );
}

Table.Head = Head;
Table.Body = Body;
Table.Foot = Foot;
