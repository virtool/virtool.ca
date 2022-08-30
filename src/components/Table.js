import React from "react";

export const Table = ({ children }) => (
  <table className="divide-solid divide-y-2 divide-stone-700 table-auto w-full">
    {children}
  </table>
);

export const Tr = ({ children }) => <tr className="">{children}</tr>;

export const Td = ({ children }) => (
  <td className="text-left px-2 py-3">{children}</td>
);

export const Th = ({ children }) => (
  <th className="font-bold p-2 text-left text-lg">{children}</th>
);
