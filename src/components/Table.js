import React from "react";

export const table = ({ align, children }) => (
  <table
    align={align}
    className="divide-solid divide-y-2 divide-stone-700 divide- table-auto"
  >
    {children}
  </table>
);

export const tr = ({ align, children }) => (
  <tr align={align} className="">
    {children}
  </tr>
);
export const td = ({ align, children }) => (
  <td align={align} className="p-3">
    {children}
  </td>
);
export const th = ({ align, children }) => (
  <th align={align} className="font-bold p-3 text-lg">
    {children}
  </th>
);
