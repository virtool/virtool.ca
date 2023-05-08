import { readFile } from "node:fs/promises";

export async function get() {
  const references = await readFile("./public/legacy-releases.json", {
    encoding: "utf-8",
  });

  return {
    body: references,
  };
}
