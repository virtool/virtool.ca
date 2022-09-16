import GatsbyLink from "gatsby-link";
import React from "react";
import { Link } from "../../components/Link";
import { Main } from "../../components/Main";
import { Nav } from "../../components/Nav";

const DocsIndex = () => (
  <Main>
    <Nav />
    <div className="lg:container mx-auto">
      <h1>Documentation</h1>
      <div className="grid grid-cols-3">
        <section>
          <h2>User Manual</h2>
          <p>For users of Virtool</p>
        </section>
        <section>
          <h2>
            <GatsbyLink to="/docs/deployment">Deployment Guide</GatsbyLink>
          </h2>
          <p>For deploying and maintaining an instance</p>
        </section>
        <section>
          <h2>Developer Docs</h2>
          <p>For API users and customizers</p>
          <div>
            <h3>
              <Link to="/docs/api">API Reference</Link>
            </h3>
            <p>API Reference for cloud-native Virtool releases after 5.0.0.</p>
          </div>
          <div>
            <h3>
              <Link to="/docs/manual">Legacy API Reference</Link>
            </h3>
            <p>API Reference for legacy Virtool releases prior to 5.0.0.</p>
          </div>
        </section>
      </div>
    </div>
  </Main>
);

export default DocsIndex;
