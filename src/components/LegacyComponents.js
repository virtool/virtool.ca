import React from "react";
import { Link } from "./Link";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { sortBy } from "lodash";

export const LegacySideBar = ({ data }) => {
  const sortedData = sortBy(data.allMdx.nodes, "frontmatter.slug");

  return (
    <div className="col-span-1 sticky top-20 self-start">
      {sortedData.map((node) => (
        <div key={node.frontmatter.title}>
          <Link to={`/docs/legacy_API/${node.frontmatter.slug}`}>
            {node.frontmatter.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export const LegacyBody = ({ node }) => {
  return (
    <div key={node.frontmatter.title}>
      <h1 className="text-blue-700 text-5xl mb-10 mt-5">
        <a href={`/docs/legacy_API/${node.frontmatter.slug}`}>
          {node.frontmatter.title}
        </a>
      </h1>
      <MDXRenderer>{node.body}</MDXRenderer>
    </div>
  );
};
