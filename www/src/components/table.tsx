import React from "react";

export const Table = ({
  headers,
  items,
}: {
  headers: string[];
  items: string[];
}) => (
  <div className="flex flex-col">
    <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
        <table className="min-w-full">
          <thead>
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50 leading-4"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            <tr>
              {items.map((item) => (
                <td
                  key={item}
                  className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-no-wrap border-b border-gray-200 leading-5"
                >
                  {item}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
