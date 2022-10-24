import { Link as GatsbyLink } from "gatsby";
import React from "react";

export const SidebarLink = ({ children, to }) => (
  <GatsbyLink
    className="block font-medium no-underline text-blue-500 hover:text-blue-700 pt-1"
    to={to}
  >
    {children}
  </GatsbyLink>
);
