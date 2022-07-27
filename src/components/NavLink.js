import { Link as GatsbyLink } from "gatsby";
import React from "react";

export const NavLink = ({ children, to }) => (
  <GatsbyLink
    className="font-medium py-3 text-lg text-stone-600 no-underline hover:text-stone-900 mr-3"
    to={to}
  >
    {children}
  </GatsbyLink>
);
