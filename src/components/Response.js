import React from "react";

export const Response = ({ children, status }) => (
  <div className="border-solid border-2 border-stone-700">
    <p className="p-4 text-md">Status: {status}</p>
    <pre id="json">{children}</pre>
  </div>
);
