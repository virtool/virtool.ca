import { getResourceReleases } from "../../utils/releases";

enum Resources {
  references = "ref-plant-viruses",
  hmms = "virtool-hmm",
}

export async function get({ params }): Promise<object> {
  const repo = Resources[params.id];
  const data = await getResourceReleases(repo);

  return {
    body: JSON.stringify({ [repo]: data }),
  };
}

export function getStaticPaths() {
  return [{ params: { id: "references" } }, { params: { id: "hmms" } }];
}
