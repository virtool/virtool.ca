import { CollectionEntry } from "astro:content";
import { forEach, pick, map } from "lodash-es";

export function getMenuSectionsFromCollection(
  collection: CollectionEntry<any>,
  sections?: string[]
) {
  let menu = collection.reduce((menu, entry) => {
    const key = entry.slug.split("/")[0];

    let section = menu[key];

    if (!section) {
      section = {
        title: key,
        items: [],
      };
      menu[key] = section;
    }

    section.items.push({
      title: entry.data.title,
      slug: entry.slug,
      order: entry.data.order,
    });

    return menu;
  }, {});

  if (sections) {
    menu = pick(menu, sections);
  }

  const flattened = map(menu, (section) => section);

  forEach(flattened, (section) => {
    section.items.sort((a, b) => a.order - b.order);
  });

  return flattened;
}
