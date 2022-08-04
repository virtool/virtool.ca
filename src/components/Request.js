import React from "react";

export const Request = ({ children, method, path }) => {
  return (
    <div className="border-2 border-solid border-slate-700">
      {method && path && (
        <h3 className="p-4 font-mono">
          {method} {path}
        </h3>
      )}
      {children || (
        <div className="bg-stone-200  p-4 font-bold text-slate-700">
          No request body
        </div>
      )}
    </div>
  );
};
