import { graphql } from "gatsby";
import React from "react";
import { Main } from "../../../components/Main";
import { Nav } from "../../../components/Nav";
import { replace, find, trimEnd } from "lodash";
import {
  LegacySideBar,
  LegacyBody,
} from "../../../components/LegacyComponents";

const LegacySection = ({ data, location }) => {
  const ending = trimEnd(replace(location.pathname, "/docs/manual/", ""), "/");

  const filteredData = find(data.allMdx.nodes, {
    frontmatter: { slug: ending },
  });

  return (
    <Main>
      <Nav />
      <div className="lg:container mx-auto gap-2 grid grid-cols-9">
        <LegacySideBar data={data} />
        {ending !== "null" && (
          <div className="col-span-6 flex flex-col bg-neutral-50 font-sans relative ">
            <LegacyBody node={filteredData} />
          </div>
        )}
      </div>
    </Main>
  );
};

export const query = graphql`
  {
    allMdx(filter: { fileAbsolutePath: { regex: "/legacy/" } }) {
      nodes {
        body
        frontmatter {
          slug
          title
        }
      }
    }
  }
`;

export default LegacySection;
