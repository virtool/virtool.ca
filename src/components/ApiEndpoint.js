import { includes, keysIn, map, omit } from "lodash";
import { micromark } from "micromark";
import React from "react";
import { Endpoint } from "./Endpoint";
import { H2, H3 } from "./Headings";
import { JsonContainer } from "./JsonContainer";
import { Table, Td, Th, Tr } from "./Table";

const ApiEndpoint = ({ data, endpoint, method }) => {
  const pathMethod = data;

  console.log(data);

  const successResponseCode = keysIn(pathMethod.responses)[0];

  const requestBodyPath =
    pathMethod.requestBody?.content["application/json"].schema;

  const inputValues = requestBodyPath?.properties
    ? requestBodyPath.properties
    : null;

  const inputKeys = inputValues ? keysIn(inputValues) : null;

  const requestExample = requestBodyPath
    ? JSON.stringify(requestBodyPath.example, null, 2)
    : null;

  const responsePath =
    pathMethod.responses[successResponseCode].content["application/json"]
      ?.schema;

  const response = responsePath?.items
    ? responsePath.items.example
    : responsePath?.example;

  const responseJson = JSON.stringify(response, null, 2);

  const errors = omit(pathMethod.responses, successResponseCode);

  return (
    <div
      id={(method + endpoint).replace("/", "-")}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 py-12 "
    >
      <div className="col-span-2">
        <H2>{pathMethod.summary}</H2>
      </div>

      <div className="">
        <div
          className="prose mb-16"
          dangerouslySetInnerHTML={{
            __html: micromark(pathMethod.description),
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

      <div>
        {requestExample && (
          <>
            <H3>Request</H3>
            <Endpoint method={method} path={endpoint} />
            {requestExample && <JsonContainer code={requestExample} />}
          </>
        )}

        <H3>Response</H3>

        {responseJson ? (
          <JsonContainer code={responseJson} />
        ) : (
          <span>None</span>
        )}
      </div>
    </div>
  );
};

export default ApiEndpoint;
