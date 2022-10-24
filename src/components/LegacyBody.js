import { MDXRenderer } from "gatsby-plugin-mdx";
import React from "react";
import { H1 } from "./Headings";
import { Link } from "./Link";

export const LegacyBody = ({ node }) => (
  <div key={node.frontmatter.title}>
    <H1>
      <Link to={`/docs/legacy_api/${node.frontmatter.slug}`}>
        {node.frontmatter.title}
      </Link>
    </H1>
    <MDXRenderer>{node.body}</MDXRenderer>
  </div>
);
