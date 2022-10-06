import React from "react";
import { map, uniq, nth, split, trimEnd, replace, includes } from "lodash";
import { Link } from "./Link";
import { ApiEndpoint } from "./ApiEndpoint";
import { Main } from "./Main";
import { Nav } from "./Nav";

const APISideBar = ({ titles }) => (
  <div className="col-span-1 sticky top-20 self-start">
    {map(uniq(titles), (title) => (
      <div key={title} className="capitalize">
        <Link to={`/docs/api/${title}`}>{title}</Link>
      </div>
    ))}
  </div>
);

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

export const API = ({ data, location }) => {
  const urlEnding = trimEnd(replace(location.pathname, "/docs/api/", ""), "/");

  const APIData = JSON.parse(data.allApiData.edges[0].node.APIData);
  let titles = [];

  const APIDocs = map(APIData, (endpoints, path) => {
    const title = nth(split(path, "/"), 1);
    const show = !includes(titles, title);

    titles.push(title);
    if (urlEnding === "" || title === urlEnding) {
      return (
        <div key={path}>
          {show && (
            <h1
              id={title}
              className="capitalize col-span-2 font-bold mb-5 scroll-mt-24 text-4xl"
            >
              {title}
            </h1>
          )}
          <APISection key={path} path={path} endpoints={endpoints} />
        </div>
      );
    }
  });

  return (
    <Main>
      <Nav />
      <div className="lg:container mx-auto gap-2 grid grid-cols-9">
        <APISideBar titles={titles} />
        <div className="col-span-8 bg-neutral-50 font-sans pt-10">
          {APIDocs}
        </div>
      </div>
    </Main>
  );
};
