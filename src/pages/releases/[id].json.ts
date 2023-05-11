import { getRepoReleases } from "../../utils/releases";

enum Repos {
  hmms = "virtool-hmm",
  references = "ref-plant-viruses",
  virtool = "virtool",
}

export async function get({ params }): Promise<object> {
  const repo = Repos[params.id];

  const data = await getRepoReleases(repo);

  return {
    body: JSON.stringify({ [repo]: data }),
  };
}

export function getStaticPaths() {
  return [
    { params: { id: "hmms" } },
    { params: { id: "virtool" } },
    { params: { id: "references" } },
  ];
}
