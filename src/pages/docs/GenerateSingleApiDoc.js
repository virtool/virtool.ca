import React from "react";
import { Table, Tr, Td, Th } from "../../components/Table";
import { keysIn, map, omit, includes } from "lodash";
import { H2, H3 } from "../../components/Headings";
import json from "../../data/oas.json";
import { Request } from "../../components/Request";
import { Endpoint } from "../../components/Endpoint";
import { Response } from "../../components/Response";

const GenerateApi = ({ endpoint, method }) => {
  const pathMethod = json.paths[endpoint][method];

  const successResponseCode = keysIn(pathMethod.responses)[0];
  const successResponseDescription =
    pathMethod.responses[successResponseCode].description;

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

  const jsonResponse = JSON.stringify(response, null, 2);
  const errors = omit(pathMethod.responses, successResponseCode);

  return (
    <div>
      <H2>{pathMethod.summary}</H2>
      <Endpoint method={method} path={endpoint} />
      {inputKeys && (
        <>
          <H3>Input</H3>

          <Table>
            <thead>
              <Tr>
                <Th>Name</Th>
                <Th>Type</Th>
                {requestBodyPath.required && <Th>Required</Th>}
                <Th>Description</Th>
              </Tr>
            </thead>
            <tbody>
              {map(inputKeys, (key) => (
                <Tr key={key}>
                  <Td>{key}</Td>
                  <Td>{inputValues[key].type}</Td>
                  {requestBodyPath.required && (
                    <Td>
                      {includes(requestBodyPath.required, key)
                        ? "true"
                        : "false"}
                    </Td>
                  )}
                  <Td>{inputValues[key].description}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </>
      )}

      {requestExample && (
        <>
          <H3>Example</H3>
          <Request>
            <pre>{requestExample}</pre>
          </Request>
        </>
      )}

      <H3>Response</H3>
      <Response status={successResponseCode + " " + successResponseDescription}>
        <pre className="overflow-hidden text-ellipsis mr-5">{jsonResponse}</pre>
      </Response>
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
  );
};

export default GenerateApi;
