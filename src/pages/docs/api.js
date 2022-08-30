import {
  capitalize,
  isEqual,
  keysIn,
  map,
  nth,
  split,
  unionWith,
} from "lodash";
import React from "react";
import ApiEndpoint from "../../components/ApiEndpoint";
import { Link } from "../../components/Link";
import { Main } from "../../components/Main";
import { Nav } from "../../components/Nav";
import json from "../../data/openapi.json";

const API = () => {
  let apiLinkTitles = [];

  map(keysIn(json.paths), (endpoint) => {
    const formattedApiTitle = capitalize(nth(split(endpoint, "/"), 1));
    apiLinkTitles = unionWith(apiLinkTitles, [formattedApiTitle], isEqual);
  });

  const apiTitles = [...apiLinkTitles];

  const apiDocs = map(keysIn(json.paths), (endpoint) => {
    console.log("endpoint", endpoint);

    const formattedEndpoint = capitalize(nth(split(endpoint, "/"), 1));

    return map(keysIn(json.paths[endpoint]), (method) => {
      return (
        <div>
          {formattedEndpoint === apiTitles[0] ? (
            <h1 className="col-span-2 text-4xl font-bold mb-5">
              {apiTitles.shift()}
            </h1>
          ) : null}
          <ApiEndpoint
            key={method + endpoint}
            endpoint={endpoint}
            method={method}
            data={json.paths[endpoint][method]}
          />
        </div>
      );
    });
  });

  return (
    <Main>
      <Nav />
      <div className="lg:container mx-auto gap-2 grid grid-cols-9">
        <div className="col-span-1 sticky top-20 self-start">
          {map(apiLinkTitles, (title) => (
            <div key={title}>
              <Link to={`#${title}`}>{title}</Link>
            </div>
          ))}
        </div>
        <div className="col-span-8 bg-neutral-50 font-sans pt-10 divide-y-2 divide-dashed divide-slate-300">
          {apiDocs}
        </div>
      </div>
    </Main>
  );
};

export default API;
