import React from "react";
import { Link } from "./Link";
import { MDXRenderer } from "gatsby-plugin-mdx";

export const LegacySideBar = ({ data }) => (
  <div className="col-span-1 sticky top-20 self-start">
    {data.allMdx.nodes.map((node) => (
      <div key={node.frontmatter.title}>
        <Link to={`/docs/manual/${node.frontmatter.slug}`}>
          {node.frontmatter.title}
        </Link>
      </div>
    ))}
  </div>
);

export const LegacyBody = ({ node }) => (
  <div key={node.frontmatter.title}>
    <h1 className="text-blue-700 text-5xl mb-10 mt-5">
      <a href={`/docs/manual/${node.frontmatter.slug}`}>
        {node.frontmatter.title}
      </a>
    </h1>
    <MDXRenderer>{node.body}</MDXRenderer>
  </div>
);
