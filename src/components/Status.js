import React from "react";

const codes = {
  200: "OK",
  201: "Created",
  204: "No content",
  400: "Bad request",
  401: "Unauthorized",
  403: "Forbidden",
  409: "Conflict",
  422: "Unprocessable Entity",
};

export const Status = ({ code }) => {
  const description = codes[code];

  if (description) {
    return (
      <span
        className={
          code > 399
            ? "bg-red-200 text-red-900 py-1 px-1.5 rounded-md"
            : "bg-green-200 text-green-900 py-1 px-1.5 rounded-md"
        }
      >
        {code} {description}
      </span>
    );
  }

  throw Error(`Unknown status code: ${code}`);
};
