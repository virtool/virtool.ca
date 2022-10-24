import { map } from "lodash";
import React from "react";
import { SidebarLink } from "./SidebarLink";

export const Sidebar = ({ path, links }) => (
  <div className="col-span-1 self-start sticky top-20 ">
    {map(links, ({ title, slug }) => (
      <SidebarLink to={`${path}/${slug}`}>{title}</SidebarLink>
    ))}
  </div>
);
