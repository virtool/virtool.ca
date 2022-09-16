import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import React from "react";
import { Link } from "../../components/Link";
import { Main } from "../../components/Main";
import { Nav } from "../../components/Nav";
import { find, replace } from "lodash";

const Legacy = ({ data, location }) => {
  const selectedTitle = location.hash ? replace(location.hash, "#", "") : "";

  const filteredData = selectedTitle
    ? [find(data.allMdx.nodes, { frontmatter: { title: selectedTitle } })]
    : data.allMdx.nodes;

  return (
    <Main>
      <Nav />
      <div className="lg:container mx-auto gap-2 grid grid-cols-9">
        <div className="col-span-1 sticky top-20 self-start">
          {data.allMdx.nodes.map((node) => (
            <div key={node.frontmatter.title}>
              <Link
                key={node.frontmatter.title}
                to={`#${node.frontmatter.title}`}
              >
                {node.frontmatter.title}
              </Link>
            </div>
          ))}
        </div>

        <div className="col-span-6 flex flex-col bg-neutral-50 font-sans relative ">
          {filteredData.map((node) => (
            <div key={node.frontmatter.title}>
              <h1 className="text-blue-700 text-5xl mb-10 mt-5">
                <a href={`#${node.frontmatter.title}`}>
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
  query MdxQuery {
    allMdx(filter: { fileAbsolutePath: { regex: "/legacy/" } }) {
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

export default Legacy;
