import mdx from "@astrojs/mdx";
import prefetch from "@astrojs/prefetch";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import rehypeRewrite from "rehype-rewrite";
import { getLatestLegacyVersion, getRepoReleases } from "./src/utils/releases";

const releases = await getRepoReleases("virtool");
const version = getLatestLegacyVersion(releases);

export default defineConfig({
  aliases: {
    "@images/*": ["src/assets/images/*"],
  },
  integrations: [mdx({}), prefetch(), sitemap(), tailwind()],
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
  site: "https://www.virtool.ca",
});
