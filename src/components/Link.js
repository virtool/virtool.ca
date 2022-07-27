import { Link as GatsbyLink } from "gatsby";
import React from "react";

export const Link = ({ children, to }) => (
  <GatsbyLink className="font-medium text-blue-500 hover:text-blue-700" to={to}>
    {children}
  </GatsbyLink>
);
