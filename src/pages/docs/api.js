import { graphql } from "gatsby";
import React from "react";
import { Main } from "../../components/Main";
import { Nav } from "../../components/Nav";
import json from "../../data/oas.json";
import { normalizeSpec } from "../../utils";

const API = ({ data }) => {
  const spec = normalizeSpec(json);

  return (
    <Main>
      <Nav />
      <div className="lg:container mx-auto">
        <pre className="font-mono text-md bg-stone-700 text-teal-300 p-3">
          {JSON.stringify(spec, null, 2)}
        </pre>
        <div>Docs based on OpenAPI spec go here.</div>
      </div>
    </Main>
  );
};

export const query = graphql`
  query ApiJsonQuery {
    allFile(filter: { absolutePath: { regex: "/oas/" } }) {
      nodes {
        absolutePath
        internal {
          content
        }
      }
    }
  }
`;

export default API;
