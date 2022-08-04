import React from "react";

export const Table = ({ align, children }) => (
  <table
    style={{ tableLayout: "fixed" }}
    align={align}
    className="divide-solid divide-y-2 divide-stone-700 table-auto"
  >
    {children}
  </table>
);

export const Tr = ({ align, children }) => (
  <tr align={align} className="">
    {children}
  </tr>
);
export const Td = ({ align, children }) => (
  <td align={align} className="p-3">
    {children}
  </td>
);
export const Th = ({ align, children }) => (
  <th align={align} className="font-bold p-3 text-lg">
    {children}
  </th>
);
