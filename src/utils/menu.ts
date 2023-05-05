import { getCollection } from "astro:content";

export async function getMenu() {
  const entries = await getCollection(
    "manual",
    ({ id }) => id.endsWith("mdx") || id.endsWith("md")
  );

  const menu = entries.reduce((menu, entry) => {
    const key = entry.slug.split("/")[0];

    if (menu.has(key)) {
      const section = menu.get(key);

      section.items.push({
        slug: entry.slug,
        title: entry.data.title,
        order: entry.data.order,
      });
    } else {
      menu.set(key, {
        title: key,
        items: [
          {
            slug: entry.slug,
            title: entry.data.title,
            order: entry.data.order,
          },
        ],
      });
    }

    return menu;
  }, new Map());

  const flattened = [menu.get("start")];

  if (menu.has("tutorials")) {
    flattened.push(menu.get("tutorials"));
  }

  flattened.push(menu.get("guide"));
  flattened.push(menu.get("science"));

  return flattened;
}
