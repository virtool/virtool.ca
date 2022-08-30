import { includes, keysIn, map, omit } from "lodash";
import Highlight, { defaultProps } from "prism-react-renderer";
import github from "prism-react-renderer/themes/github";

import React from "react";
import { Endpoint } from "../../components/Endpoint";
import { H2, H3 } from "../../components/Headings";
import { Table, Td, Th, Tr } from "../../components/Table";
import json from "../../data/oas.json";

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

  const responseJson = JSON.stringify(response, null, 2);

  const errors = omit(pathMethod.responses, successResponseCode);

  return (
    <div>
      <H2>{pathMethod.summary}</H2>
      <Endpoint method={method} path={endpoint} />
      {inputKeys && (
        <>
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
                    {includes(requestBodyPath.required, key) ? "true" : "false"}
                  </Td>
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
          {responseJson && (
            <Highlight
              {...defaultProps}
              code={requestExample}
              language="json"
              theme={github}
            >
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className} style={{ ...style }}>
                  {tokens.map((line, index) => {
                    const lineProps = getLineProps({ line, key: index });
                    return (
                      <div key={index} {...lineProps}>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token, key })} />
                        ))}
                      </div>
                    );
                  })}
                </pre>
              )}
            </Highlight>
          )}
        </>
      )}

      <H3>Response</H3>

      {responseJson && (
        <Highlight
          {...defaultProps}
          code={responseJson}
          language="json"
          theme={github}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className} style={{ ...style }}>
              {tokens.map((line, index) => {
                const lineProps = getLineProps({ line, key: index });
                return (
                  <div key={index} {...lineProps}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                );
              })}
            </pre>
          )}
        </Highlight>
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
  );
};

export default GenerateApi;
