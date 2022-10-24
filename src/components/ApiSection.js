import { map } from "lodash";
import React from "react";
import ApiEndpoint from "./ApiEndpoint";

export const APISection = ({ endpoints, path }) => (
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
