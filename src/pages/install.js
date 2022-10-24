import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import React from "react";
import { Main } from "../components/Main";
import { Nav } from "../components/Nav";

const Install = ({ data }) => (
  <Main>
    <Nav />
    <div className="lg:container mt-5 mx-auto prose">
      <MDXRenderer>{data.mdx.body}</MDXRenderer>
    </div>
  </Main>
);

export const query = graphql`
  query InstallMd {
    mdx(frontmatter: { title: { eq: "Install" } }) {
      frontmatter {
        title
      }
      body
    }
  }
`;

export default Install;
