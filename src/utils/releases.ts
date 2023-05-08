import { Cache } from "./cache";
import { assign, each, map, union } from "lodash";

const RELEASE_KEYS = [
  "id",
  "name",
  "body",
  "prerelease",
  "published_at",
  "html_url",
];
function format_releases(release) {
  const formatted = {};

  each(RELEASE_KEYS, (value) => {
    formatted[value] = release[value];
  });

  formatted["asset_error"] = false;

  try {
    const asset = release["assets"][0];

    assign(formatted, {
      filename: asset["name"],
      content_type: asset["content_type"],
      size: asset["size"],
      download_url: asset["browser_download_url"],
    });
  } catch (error) {
    formatted["asset_error"] = true;
    if (!(error instanceof TypeError)) throw error;
  }

  return formatted;
}

const filterReleases = (releases: Array<object>): Array<object> => {
  return releases.filter((release) => {
    return release["assets"] && !release["draft"];
  });
};

export async function getResourceReleases(
  repo: string
): Promise<Array<object>> {
  const cache = new Cache();
  await cache.load();

  const date = Date.now();

  const cached = await cache.get(repo);

  if (cached && date - cached.timestamp < 1000 * 60 * 60) return cached.data;

  let releases = await getReleases(repo);

  releases = filterReleases(releases);

  const data = map(releases, format_releases);

  await cache.set(repo, {
    data,
    timestamp: date,
  });

  return data;
}

async function getReleases(repo: string): Promise<Array<object>> {
  let allReleases = [];
  let page = 1;

  while (true) {
    const response = await fetch(
      `https://api.github.com/repos/virtool/${repo}/releases?per_page=100&page=${page}`
    );

    const releases = await response.json();

    if (releases.length == 0) break;

    allReleases = union(releases, releases, "id");
    page++;
  }

  return allReleases;
}
