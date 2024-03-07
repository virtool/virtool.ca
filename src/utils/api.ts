import { Cache } from "./cache";

type ApiSpecification = {
  openapi: string;
  sections: ApiSpecificationDomain[];
  sectionTitles: string[];
  version: string;
};

type ApiSpecificationDomain = {
  title: string;
  description: string;
};

type ApiSpecificationEndpoint = {
  method: ApiSpecificationMethod;
  path: string;
};

type ApiSpecificationErrors = {
  description: string;
  status: number;
};

type ApiSpecificationParameter = {
  description: string;
  name: string;
  required: boolean;
  title: string;
  type: string;
};

type ApiSpecificationRequest = {
  description: string;
  example: object;
  parameters: ApiSpecificationParameter[];
};

type ApiSpecificationResponse = {
  example: object;
  status: number;
};

type ApiSpecificationSection = {
  title: string;
  endpoints: ApiSpecificationEndpoint[];
};

type ApiSpecificationType = "string" | "number" | "boolean" | "object";

type ApiSpecificationMethod = "get" | "post" | "put" | "delete";

const apiCachePath = "./public/.cache/oas.json";

async function fetchOasJson() {
  const cache = new Cache();
  await cache.load();

  const date = Date.now();

  const cached = await cache.get("oas");

  // Update the cache if it doesn't exist or it's older than an hour.
  if (!cached || date - cached.timestamp > 100 * 60 * 60) {
    const response = await fetch(
      "https://github.com/virtool/virtool/releases/latest/download/openapi.json"
    );

    const data = await response.json();

    await cache.set("oas", {
      data,
      timestamp: date,
    });

    return data;
  }

  return cached.data;
}

export async function getApiSpecification(): Promise<ApiSpecification> {
  const raw = await fetchOasJson();

  const sections = formatSections(raw);

  return {
    openapi: raw.openapi,
    sections,
    sectionTitles: formatSectionTitles(raw),
    version: raw.info.version,
  };
}

function trimSectionTitle(path: string) {
  return path.split("/")[1];
}

function formatSectionTitles(oas): string[] {
  const set = new Set(
    Object.keys(oas.paths).map((path) => {
      return trimSectionTitle(path);
    })
  );

  return [...set];
}

function formatSections(oas): ApiSpecificationSection[] {
  const titles = formatSectionTitles(oas);

  const sections = Object.fromEntries(
    titles.map((title) => [title, { title, endpoints: [] }])
  );

  Object.entries(oas.paths).forEach(([path, value]) => {
    const sectionTitle = trimSectionTitle(path);

    Object.entries(value).map(([method, endpoint]) => {
      sections[sectionTitle].endpoints.push({
        description: endpoint.description,
        example: formatExample(endpoint),
        method,
        parameters: formatEndpointParameters(endpoint),
        path,
        title: endpoint.summary,
        ...formatResponses(endpoint),
      });
    });
  });

  return Object.entries(sections).map(([title, section]) => ({
    title,
    ...section,
  }));
}

function formatEndpointParameters(endpoint) {
  const schema = getSchemaFromEndpoint(endpoint);

  if (!schema) {
    return [];
  }

  const parameters = Object.entries(schema.properties).map(
    ([name, property]) => {
      return {
        ...property,
        name,
        required: Boolean(schema?.required?.includes(name)),
      };
    }
  );

  return parameters;
}

function formatExample(endpoint) {
  return endpoint.requestBody?.content?.["application/json"]?.schema?.example;
}

interface FormatResponsesReturn {
  errors: ApiSpecificationErrors[];
  response: ApiSpecificationResponse;
}

function formatResponses(endpoint): FormatResponsesReturn {
  let errors = [];
  let response;

  if (!endpoint.responses) {
    return { errors, response };
  }

  Object.entries(endpoint.responses).forEach(([status, details]) => {
    if (status.startsWith("2")) {
      const example = details.content?.["application/json"]?.schema?.example;

      response = {
        example,
        status,
      };
    } else {
      errors.push({ status: status, description: details.description || "" });
    }
  });

  return { errors, response };
}

function getSchemaFromEndpoint(endpoint) {
  return endpoint?.requestBody?.content?.["application/json"]?.schema;
}

export function transformTitle(title) {
  switch (title) {
    case "admin":
      return "Administration";
    case "instance_message":
      return "Instance Message";
    case "refs":
      return "References";
    case "hmms":
      return "HMMs";
    case "ml":
      return "ML";
    case "otus":
      return "OTUs";
    default:
      return title;
  }
}
