import { Cache } from "./cache";

export async function fetchReleases() {
  const cache = new Cache();

  await cache.load();

  const date = Date.now();

  const cached = await cache.get("releases");

  console.log("c", cached);

  // Update the cache if it doesn't exist or it's older than an hour.
  if (!cached || date - Date.parse(cached.timestamp) > 1000 * 60 * 60) {
    const response = await fetch("https://www.virtool.ca/releases");

    const data = await response.json();

    await cache.set("oas", {
      data: await response.json(),
      timestamp: date,
    });

    return data;
  }

  return cached.data;
}
