import { map, nth, split, uniq } from "lodash";
import React from "react";
import ApiEndpoint from "../../components/ApiEndpoint";
import { Link } from "../../components/Link";
import { Main } from "../../components/Main";
import { Nav } from "../../components/Nav";
import json from "../../data/openapi.json";

const APISection = ({ endpoints, path }) => (
  <div>
    <div className="divide-y-2 divide-dashed divide-slate-300">
      {map(endpoints, (endpoint, method) => {
        return (
          <ApiEndpoint
            key={method + path}
            method={method}
            path={path}
            endpoint={endpoint}
          />
        );
      })}
    </div>
  </div>
);

const API = () => {
  let titles = [];

  const apiDocs = map(json.paths, (endpoints, path) => {
    const title = nth(split(path, "/"), 1);
    const show = !titles.includes(title);

    titles.push(title);

    return (
      <>
        {show && (
          <h1
            id={title}
            className="capitalize col-span-2 font-bold mb-5 scroll-mt-24 text-4xl"
          >
            {title}
          </h1>
        )}
        <APISection key={path} path={path} endpoints={endpoints} />
      </>
    );
  });

  return (
    <Main>
      <Nav />
      <div className="lg:container mx-auto gap-2 grid grid-cols-9">
        <div className="col-span-1 sticky top-20 self-start">
          {map(uniq(titles), (title) => (
            <div key={title} className="capitalize">
              <Link to={`#${title}`}>{title}</Link>
            </div>
          ))}
        </div>
        <div className="col-span-8 bg-neutral-50 font-sans pt-10">
          {apiDocs}
        </div>
      </div>
    </Main>
  );
};

export default API;
