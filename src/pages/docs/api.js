import React from "react";
import { Main } from "../../components/Main";
import { Nav } from "../../components/Nav";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Link } from "../../components/Link";

const API = ({ data }) => {
  return (
    <Main>
      <Nav />
      <div className="lg:container mx-auto gap-2 grid grid-cols-9">
        <div className="col-span-1">
          {data.allMdx.nodes.map((node) => (
            <div>
              <Link
                key={node.frontmatter.title}
                to={`/docs/api#${node.slug.replace("api/", "")}`}
              >
                {node.frontmatter.title}
              </Link>
            </div>
          ))}
        </div>
        <div className="col-span-6 flex flex-col bg-neutral-50 font-sans relative ">
          {data.allMdx.nodes.map((node) => (
            <div>
              <h1 className="text-blue-700 text-5xl mb-10 mt-5">
                <a href={`#${node.slug.replace("api/", "")}`}>
                  {node.frontmatter.title}
                </a>
              </h1>
              <MDXRenderer>{node.body}</MDXRenderer>
            </div>
          ))}
        </div>
      </div>
    </Main>
  );
};

export const query = graphql`
  query apiQuery {
    allMdx(filter: { fileAbsolutePath: { regex: "/api/" } }) {
      nodes {
        body
        slug
        frontmatter {
          title
        }
        fileAbsolutePath
      }
    }
  }
`;

export default API;
