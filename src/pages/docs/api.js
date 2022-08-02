import React from "react";
import { Main } from "../../components/Main";
import { Nav } from "../../components/Nav";
import json from "../../data/oas.json";

const API = () => {
  return (
    <Main>
      <Nav />
      <div className="lg:container mx-auto">
        <pre className="font-mono text-md bg-stone-700 text-teal-300 p-3">
          {JSON.stringify(json, null, 2)}
        </pre>
        <div>Docs based on OpenAPI spec go here.</div>
      </div>
    </Main>
  );
};

export default API;
