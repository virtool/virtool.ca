import React from "react";

export const Endpoint = ({ method, path }) => (
  <div className="border-purple-700 border-solid border-2 flex items-center gap-4 text-lg font-mono my-4">
    <div className="py-2 px-5 bg-purple-700 text-white font-bold">{method}</div>
    <div className="">{path}</div>
  </div>
);
