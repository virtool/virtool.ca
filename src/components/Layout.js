import React from "react";
import { Main } from "./Main";
import { Nav } from "./Nav";

export const PrimaryLayout = ({ children }) => (
  <Main>
    <Nav />
    <div className="lg:container mx-auto">{children}</div>
  </Main>
);
