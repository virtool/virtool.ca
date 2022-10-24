import React from "react";

export const Endpoint = ({ method, path }) => (
  <div className="bg-indigo-200 flex font-mono gap-4 items-center my-4 text-lg overflow-hidden rounded">
    <div className="py-2 px-5 bg-indigo-600 font-bold text-white uppercase">
      {method}
    </div>
    <div className="font-bold text-indigo-900">{path}</div>
  </div>
);
