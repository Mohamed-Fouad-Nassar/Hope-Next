// "use client";

// import { DocumentIcon, LinkIcon } from "@heroicons/react/24/outline";

// type Resource = {
//   id: number;
//   type: "document" | "link";
//   title: string;
//   url: string;
// };

// export default function EventResources({
//   resources,
// }: {
//   resources: Resource[];
// }) {
//   return (
//     <div className="py-6 px-4 w-full">
//       <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Resources</h2>
//       {resources.length === 0 ? (
//         <p className="text-gray-500">No resources available for this event.</p>
//       ) : (
//         <ul className="space-y-4">
//           {resources.map((resource) => (
//             <li
//               key={resource.id}
//               className="flex items-center p-4 bg-gray-100 rounded-lg shadow hover:bg-gray-200"
//             >
//               <span className="mr-4">
//                 {resource.type === "document" ? (
//                   <DocumentIcon className="w-6 h-6 text-blue-500" />
//                 ) : (
//                   <LinkIcon className="w-6 h-6 text-green-500" />
//                 )}
//               </span>
//               <a
//                 href={resource.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-lg font-semibold text-main-600 hover:underline"
//               >
//                 {resource.title}
//               </a>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

"use client";

import { DocumentIcon, LinkIcon } from "@heroicons/react/24/outline";

type Resource = {
  id: number;
  type: "document" | "link";
  title: string;
  url: string;
};

export default function EventResources({
  resources,
}: {
  resources: Resource[];
}) {
  return (
    <div className="pb-6 px-2 w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Resources</h2>
      {resources.length === 0 ? (
        <p className="text-gray-500">No resources available for this event.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <a
              key={resource.id}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded transition hover:border-main-500"
            >
              {resource.type === "document" ? (
                <DocumentIcon className="size-8 text-blue-500" />
              ) : (
                <LinkIcon className="size-8 text-green-500" />
              )}
              <div>
                <h3 className="font-semibold text-gray-800 hover:text-main-600">
                  {resource.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {resource.type === "document"
                    ? "Download File"
                    : "Visit Link"}
                </p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
