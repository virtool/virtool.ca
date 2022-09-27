import { graphql } from "gatsby";
import React from "react";
import { Main } from "../../../components/Main";
import { Nav } from "../../../components/Nav";
import {
  LegacySideBar,
  LegacyBody,
} from "../../../components/LegacyComponents";

const Legacy = ({ data }) => (
  <Main>
    <Nav />
    <div className="lg:container mx-auto gap-2 grid grid-cols-9">
      <LegacySideBar data={data} />

      <div className="col-span-6 flex flex-col bg-neutral-50 font-sans relative ">
        {data.allMdx.nodes.map((node) => (
          <LegacyBody key={node.frontmatter.title} node={node} />
        ))}
      </div>
    </div>
  </Main>
);

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
