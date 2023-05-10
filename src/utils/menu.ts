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

  menu.get("start").items.sort((a, b) => a.order - b.order);
  menu.get("guide").items.sort((a, b) => a.order - b.order);
  menu.get("science").items.sort((a, b) => a.order - b.order);

  return [menu.get("start"), menu.get("guide"), menu.get("science")];
}
