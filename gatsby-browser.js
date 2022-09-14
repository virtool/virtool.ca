import "prismjs/plugins/command-line/prism-command-line.css";
import "prismjs/themes/prism.css";
import "./src/styles/global.css";

import { MDXProvider } from "@mdx-js/react";
import { Link } from "gatsby";
import React from "react";
import { Administrator } from "./src/components/Administrator";
import { AdministratorOrOwner } from "./src/components/AdministratorOrOwner";
import { Endpoint } from "./src/components/Endpoint";
import { H1, H2, H3, P } from "./src/components/Headings";
import { PrimaryLayout } from "./src/components/Layout";
import { Permission } from "./src/components/Permission";
import { Recommended } from "./src/components/Recommended";
import { Request } from "./src/components/Request";
import { Response } from "./src/components/Response";
import { Status } from "./src/components/Status";
import { Table, Td, Th, Tr } from "./src/components/Table";
import { Warning } from "./src/components/Warning";

const components = {
  Link,
  Request,
  Administrator,
  AdministratorOrOwner,
  Endpoint,
  h1: H1,
  h2: H2,
  h3: H3,
  Response,
  Warning,
  Recommended,
  p: P,
  Permission,
  PrimaryLayout,
  Status,
  table: Table,
  td: Td,
  th: Th,
  tr: Tr,
};

export const wrapRootElement = ({ element }) => (
  <MDXProvider components={components}>{element}</MDXProvider>
);
