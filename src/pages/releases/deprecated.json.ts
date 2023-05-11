import { readFile } from "node:fs/promises";
import { APIRoute } from "astro";

export async function get(): APIRoute {
  const references = await readFile("./public/legacy-releases.json", {
    encoding: "utf-8",
  });

  return {
    body: references,
  };
}
