import Highlight, { defaultProps } from "prism-react-renderer";
import github from "prism-react-renderer/themes/github";

import React from "react";

export const JsonContainer = ({ code }) => (
  <div className="overflow-auto max-h-96">
    <Highlight {...defaultProps} code={code} language="json" theme={github}>
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
  </div>
);
