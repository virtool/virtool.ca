import React from "react";
import { includes, map, nth, replace, split, trimEnd, uniqBy } from "lodash";
import { Main } from "./Main";
import { Nav } from "./Nav";
import { Sidebar } from "./Sidebar";
import { APISection } from "./ApiSection";

export const Api = ({ data, location }) => {
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

  const links = uniqBy(
    map(titles, (title) => ({ title: title, slug: title })),
    "title"
  );

  return (
    <Main>
      <Nav />
      <div className="lg:container mx-auto gap-2 grid grid-cols-9">
        <Sidebar path="/docs/api" links={links} />
        <div className="col-span-8 font-sans pt-10">{APIDocs}</div>
      </div>
    </Main>
  );
};
