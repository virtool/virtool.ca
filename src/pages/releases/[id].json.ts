import { getRepoReleases } from "@utils/releases";

const repoMap = {
  hmms: ["virtool-hmm"],
  ml: ["ml-plant-viruses"],
  references: ["ref-plant-viruses"],
  virtool: ["virtool"],
};

export async function get({ params }): Promise<object> {
  const repoNames = repoMap[params.id];

  const data = {};

  for (const name of repoNames) {
    data[name] = await getRepoReleases(name);
  }

  return {
    body: JSON.stringify(data),
  };
}

export function getStaticPaths() {
  return [
    { params: { id: "hmms" } },
    { params: { id: "ml" } },
    { params: { id: "references" } },
    { params: { id: "virtool" } },
  ];
}
