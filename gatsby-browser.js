import "prismjs/plugins/command-line/prism-command-line.css";
import "prismjs/themes/prism.css";
import "./src/styles/global.css";

import { MDXProvider } from "@mdx-js/react";
import { Link } from "gatsby";
import React from "react";
import { Endpoint } from "./src/components/Endpoint";
import * as Headings from "./src/components/Headings";
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
  Endpoint,
  Response,
  Warning,
  Recommended,
  Permission,
  Status,
  ...Headings,
  ...Table,
};

export const wrapRootElement = ({ element }) => (
  <MDXProvider components={components}>{element}</MDXProvider>
);
