import "prismjs/plugins/command-line/prism-command-line.css";
import "prismjs/themes/prism.css";
import "./src/styles/global.css";

import { MDXProvider } from "@mdx-js/react";
import { Link } from "gatsby";
import React from "react";
import { Administrator } from "./src/components/Administrator";
import { AdministratorOrOwner } from "./src/components/AdministratorOrOwner";
import { Endpoint } from "./src/components/Endpoint";
import * as Headings from "./src/components/Headings";
import { PrimaryLayout } from "./src/components/Layout";
import { Permission } from "./src/components/Permission";
import { Recommended } from "./src/components/Recommended";
import { Request } from "./src/components/Request";
import { Response } from "./src/components/Response";
import { Status } from "./src/components/Status";
import * as Table from "./src/components/Table";
import { Warning } from "./src/components/Warning";

const components = {
  Link,
  Request,
  Administrator,
  AdministratorOrOwner,
  Endpoint,
  Response,
  Warning,
  Recommended,
  Permission,
  PrimaryLayout,
  Status,
  ...Headings,
  ...Table,
};

export const wrapRootElement = ({ element }) => (
  <MDXProvider components={components}>{element}</MDXProvider>
);
