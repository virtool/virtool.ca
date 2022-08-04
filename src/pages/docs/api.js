import React from "react";
import { Main } from "../../components/Main";
import { Nav } from "../../components/Nav";
import { Link } from "../../components/Link";
import json from "../../data/oas.json";
import {
  keysIn,
  map,
  split,
  capitalize,
  unionWith,
  isEqual,
  nth,
} from "lodash";
import { H1 } from "../../components/Headings";
import GenerateApi from "./GenerateSingleApiDoc";

const API = () => {
  let apiLinkTitles = [];
  map(keysIn(json.paths), (endpoint) => {
    const formattedApiTitle = capitalize(nth(split(endpoint, "/"), 1));
    apiLinkTitles = unionWith(apiLinkTitles, [formattedApiTitle], isEqual);
  });

  const apiTitles = [...apiLinkTitles];

  const apiDocs = map(keysIn(json.paths), (endpoint) => {
    const formattedEndpoint = capitalize(nth(split(endpoint, "/"), 1));
    return map(keysIn(json.paths[endpoint]), (method) => {
      return (
        <section key={method} id={formattedEndpoint} className="pt-10">
          {formattedEndpoint === apiTitles[0] ? (
            <H1>{apiTitles.shift()}</H1>
          ) : null}

          <GenerateApi endpoint={endpoint} method={method} />
        </section>
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
        <div className="col-span-6 flex flex-col bg-neutral-50 font-sans">
          {apiDocs}
        </div>
      </div>
    </Main>
  );
};

export default API;
