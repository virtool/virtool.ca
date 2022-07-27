import { Link as GatsbyLink } from "gatsby";
import React from "react";
import { Logo } from "./Logo";
import { NavLink } from "./NavLink";

export const Nav = () => (
  <nav className="bg-white shadow-md py-1 fixed top-0 left-0 right-0 z-20">
    <div className="lg:container mx-auto flex items-center lg z-10">
      <GatsbyLink
        className="inline-flex font-medium items-center no-underline text-stone-600 hover:text-stone-900 fill-stone-600 hover:fill-stone-900 text-xl mr-7"
        to="/"
      >
        <Logo />
        Virtool
      </GatsbyLink>
      <NavLink to="/install">Install</NavLink>
      <NavLink to="/docs">Docs</NavLink>
      <NavLink to="/spec">Spec</NavLink>
    </div>
  </nav>
);
