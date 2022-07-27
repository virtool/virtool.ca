import { get, includes, map, sortBy } from "lodash";

function getRequestInputFromMethod(method) {
  const requestSchema = get(method, [
    "requestBody",
    "content",
    "application/json",
    "schema",
  ]);

  if (requestSchema) {
    if (requestSchema.type !== "object") {
      throw `Unexpected request schema type: ${requestSchema.type}`;
    }

    const required = get(requestSchema, "required", []);

    return sortBy(
      map(
        requestSchema.properties,
        ({ description, title, type }, propertyName) => ({
          description,
          name: propertyName,
          required: includes(required, propertyName),
          title,
          type,
        })
      ),
      "name"
    );
  }

  return null;
}

export function normalizeSpec(spec) {
  const paths = spec.paths;

  if (paths === undefined) {
    throw "No paths found in OpenAPI spec";
  }

  const inter = map(paths, (group, path) => {
    const { summary, description, ...rest } = group;

    const methods = map(rest, (method, name) => {
      const responses = map(method.responses, (response, code) => {
        const responseSchema = get(response, [
          "content",
          "application/json",
          "schema",
        ]);

        return {
          ...response,
          code: Number(code),
          schema: responseSchema,
        };
      });

      return {
        method: name,
        responses,
        request: { properties: getRequestInputFromMethod(method) },
      };
    });

    return { summary, description, methods, path };
  });

  return sortBy(inter, "path");
}
