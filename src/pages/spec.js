import React from "react";
import { Main } from "../components/Main";
import { Nav } from "../components/Nav";
import json from "../data/openapi.json";

const Spec = () => {
  return (
    <Main>
      <Nav />
      <div className="lg:container mx-auto">
        <h1>Spec Cheatsheet</h1>
        <div>
          <pre className="font-mono text-md bg-stone-700 text-teal-300 p-3">
            {JSON.stringify(json, null, 2)}
          </pre>
        </div>
      </div>
    </Main>
  );
};

export default Spec;
