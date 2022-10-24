import { graphql } from "gatsby";
import React from "react";
import { Main } from "../../../components/Main";
import { Nav } from "../../../components/Nav";
import { LegacyBody } from "../../../components/LegacyBody";
import { sortBy } from "lodash";
import { Sidebar } from "../../../components/Sidebar";

const Legacy = ({ data }) => {
  const sortedData = sortBy(data.allMdx.nodes, "frontmatter.slug");

  const links = sortedData.map((node) => ({
    title: node.frontmatter.title,
    slug: node.frontmatter.slug,
  }));

  return (
    <Main>
      <Nav />
      <div className="lg:container mx-auto gap-2 grid grid-cols-9">
        <Sidebar path="/docs/legacy_api" links={links} />
        <div className="col-span-6 flex flex-col font-sans relative ">
          {data.allMdx.nodes.map((node) => (
            <LegacyBody key={node.frontmatter.title} node={node} />
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
        frontmatter {
          slug
          title
        }
        fileAbsolutePath
      }
    }
  }
`;

export default Legacy;
