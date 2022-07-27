import React from "react";

export const Warning = ({ title, message }) => (
  <div className="border-solid border-amber-500 border-2 p-4 rounded-md bg-amber-100 ">
    {message}
  </div>
);
