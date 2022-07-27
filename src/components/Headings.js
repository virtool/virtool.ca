import React from "react";

export const h1 = ({ children }) => (
  <h1 className="text-4xl font-bold my-8">{children}</h1>
);
export const h2 = ({ children }) => (
  <h2 className="text-2xl font-bold my-5">{children}</h2>
);
export const h3 = ({ children }) => (
  <h3 className="text-xl font-bold my-3">{children}</h3>
);
export const p = ({ children }) => <p className="mb-4">{children}</p>;
