import { graphql, Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import * as React from "react";
import { Main } from "../components/Main";
import { Nav } from "../components/Nav";

const IndexPage = ({ data }) => {
  return (
    <Main>
      <Nav />
      <section className="flex gap-5 lg:container mx-auto mt-5 mb-10">
        <div>
          <h1 className="text-4xl mb-2">
            Viral infection diagnostics using high-throughput sequencing
          </h1>
          <p className="text-stone-600 text-xl">
            Powerful and tested web-based bioinformatics tools for analyzing and
            managing your data—from samples to reference genomes.
          </p>
          <div className="flex items-center gap-2 pt-5">
            <Link
              className="bg-emerald-500 text-white px-4 py-3 rounded-lg no-underline shadow-md hover:bg-emerald-600"
              to="/install"
            >
              Get Started
            </Link>
          </div>
        </div>
        <div>
          <StaticImage
            className="shadow-lg rounded-lg z-0 object-contain"
            src="../images/splash.png"
            alt="Virtool splash"
          />
        </div>
      </section>
      <section className="lg:container mx-auto mt-5 mb-10">
        {data.allFeaturesYaml.nodes.map(({ title, description, image }) => (
          <div className="border-solid rounded-md mb-5 py-2 px-7 shadow-md">
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        ))}
      </section>
    </Main>
  );
};

export const query = graphql`
  query YmlFeatures {
    allFeaturesYaml {
      nodes {
        title
        description
        image
      }
    }
  }
`;

export default IndexPage;
