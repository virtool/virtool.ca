import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import React from "react";
import { Link } from "../../components/Link";
import { Main } from "../../components/Main";
import { Nav } from "../../components/Nav";

const Deployment = ({ data }) => {
  return (
    <Main>
      <Nav />
      <div className="lg:container mx-auto gap-2 grid grid-cols-9">
        <div className="col-span-2">
          {data.allMdx.nodes.map((node) => (
            <span>
              <Link to={`/docs/${node.slug}`}>{node.frontmatter.title}</Link>
            </span>
          ))}
        </div>
        <div className="col-span-7 flex flex-col font-sans relative ">
          {data.allMdx.nodes.map((node) => (
            <div>
              <h1>{node.frontmatter.title}</h1>
              <MDXRenderer>{node.body}</MDXRenderer>
            </div>
          ))}
        </div>
      </div>
    </Main>
  );
};

export const query = graphql`
  query deploymentQuery {
    allMdx(filter: { fileAbsolutePath: { regex: "/deployment/" } }) {
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

export default Deployment;
