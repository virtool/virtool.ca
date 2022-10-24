import React from "react";
import { Link } from "../../components/Link";
import { Main } from "../../components/Main";
import { Nav } from "../../components/Nav";

const DocsIndex = () => (
  <Main>
    <Nav />
    <div className="lg:container mt-10 mx-auto prose">
      <h1>Documentation</h1>
      <div className="grid grid-cols-2">
        <section>
          <h2>User Manual</h2>
          <p>For users of Virtool</p>
          <h3>
            <Link to="/docs/manual">Legacy Manual</Link>
          </h3>
          <p>User manual for Virtool 4.</p>
        </section>
        <section>
          <h2>Developer Docs</h2>
          <p>For API users and customizers</p>
          <div>
            <h3>
              <Link to="/docs/api/">API Reference</Link>
            </h3>
            <p>API Reference for Virtool.</p>
          </div>
          <div>
            <h3>
              <Link to="/docs/legacy_api">Legacy API Reference</Link>
            </h3>
            <p>API Reference for Virtool 4.</p>
          </div>
        </section>
      </div>
    </div>
  </Main>
);

export default DocsIndex;
