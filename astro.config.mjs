import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import rehypeRewrite from "rehype-rewrite";
import { getLatestLegacyVersion, getRepoReleases } from "./src/utils/releases";

const releases = await getRepoReleases("virtool");
const version = getLatestLegacyVersion(releases);

export default defineConfig({
  integrations: [mdx({}), sitemap(), tailwind()],
  markdown: {
    rehypePlugins: [
      [
        rehypeRewrite,
        {
          // Rewrites all occurences of LEGACY_VERSION to the latest legacy version in
          // MDX-generated HTML.
          rewrite: async (node) => {
            if (node.type == "text" && node.value.includes("LEGACY_VERSION")) {
              node.value = node.value.replace("LEGACY_VERSION", version);
            }
          },
        },
      ],
    ],
  },
  prefetch: true,
  site: "https://www.virtool.ca",
});
