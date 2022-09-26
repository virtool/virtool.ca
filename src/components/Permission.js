import React from "react";

export const Permission = ({ name, resource }) => (
  <div className="mb-5">
    <span className="border-rose-800 border-2 bg-rose-100 border-solid text-rose-700 py-1 px-2 rounded-md">
      Requires <strong>{name}</strong> permission
      {resource ? <strong> on {resource}</strong> : ""}
    </span>
  </div>
);
