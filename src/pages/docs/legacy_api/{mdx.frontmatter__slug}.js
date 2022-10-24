import { graphql } from "gatsby";
import React from "react";
import { Main } from "../../../components/Main";
import { Nav } from "../../../components/Nav";
import { find, replace, sortBy, trimEnd } from "lodash";
import { LegacyBody } from "../../../components/LegacyBody";
import { Sidebar } from "../../../components/Sidebar";

const LegacySection = ({ data, location }) => {
  const urlEnding = trimEnd(
    replace(location.pathname, "/docs/legacy_api/", ""),
    "/"
  );

  const filteredData = find(data.allMdx.nodes, {
    frontmatter: { slug: urlEnding },
  });

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
        {urlEnding !== "null" && (
          <div className="col-span-6 flex flex-col font-sans relative ">
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
