import { get, includes, keysIn, map, omit } from "lodash";
import { micromark } from "micromark";
import React from "react";
import { Endpoint } from "./Endpoint";
import { H2, H3 } from "./Headings";
import { JsonContainer } from "./JsonContainer";
import { Table, Td, Th, Tr } from "./Table";

const ApiEndpointErrors = ({ responses }) => {
  const errors = omit(responses, 200, 201, 204);

  return (
    <div>
      {keysIn(errors).length ? (
        <Table>
          <thead>
            <Tr>
              <Th>Status</Th>
              <Th>Message</Th>
            </Tr>
          </thead>
          <tbody>
            {map(keysIn(errors), (error) => (
              <Tr key={error}>
                <Td>{error}</Td>
                <Td>{errors[error].description}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      ) : (
        "None"
      )}
    </div>
  );
};

const ApiEndpointRequest = ({ body }) => {
  const example = get(body, [
    "content",
    "application/json",
    "schema",
    "example",
  ]);

  if (example) {
    return <JsonContainer code={JSON.stringify(example, null, 2)} />;
  }

  return null;
};

const ApiEndpointResponse = ({ responses }) => {
  if (responses === undefined) {
    return <span>No response defined</span>;
  }

  if (responses.length === 0) {
    return <span>None</span>;
  }

  const successCode = keysIn(responses)[0];

  const example = get(responses, [
    successCode,
    "content",
    "application/json",
    "schema",
    "example",
  ]);

  /**
  const response = path?.items
    ? path.items.example
    : path?.example;
   **/

  if (example) {
    return <JsonContainer code={JSON.stringify(example, null, 2)} />;
  }

  return <span>None</span>;
};

export const ApiEndpoint = ({ endpoint, path, method }) => {
  const requestBodyPath =
    endpoint.requestBody?.content["application/json"].schema;

  const inputValues = requestBodyPath?.properties
    ? requestBodyPath.properties
    : null;

  const inputKeys = inputValues ? keysIn(inputValues) : null;

  return (
    <div
      id={(method + path).replace("/", "-")}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 py-12"
    >
      <div className="col-span-2">
        <H2>{endpoint.summary}</H2>
      </div>

      <div>
        <div
          className="prose mb-16"
          dangerouslySetInnerHTML={{
            __html: micromark(endpoint.description),
          }}
        />

        {inputKeys && (
          <div className="mb-16">
            <H3>Parameters</H3>
            <Table>
              <thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Type</Th>
                  <Th>Required</Th>
                  <Th>Description</Th>
                </Tr>
              </thead>
              <tbody>
                {map(inputKeys, (key) => (
                  <Tr key={key}>
                    <Td>
                      <span className="font-mono font-bold">{key}</span>
                    </Td>
                    <Td>{inputValues[key].type}</Td>
                    <Td>
                      {includes(requestBodyPath.required, key)
                        ? "true"
                        : "false"}
                    </Td>
                    <Td>{inputValues[key].description}</Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}

        <H3>Errors</H3>
        <ApiEndpointErrors responses={endpoint.responses} />
      </div>

      <div>
        <>
          <H3>Request</H3>
          <Endpoint method={method} path={path} />
          <ApiEndpointRequest body={endpoint.requestBody} />
        </>

        <H3>Response</H3>
        <ApiEndpointResponse responses={endpoint.responses} />
      </div>
    </div>
  );
};

export default ApiEndpoint;
