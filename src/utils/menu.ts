import { CollectionEntry } from "astro:content";
import { forEach } from "lodash-es";

export function getMenuSectionsFromCollection(
  collection: CollectionEntry<any>,
  sections?: string[]
) {
  const menu = collection.reduce((menu, entry) => {
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

  const flattened = [];

  if (sections) {
    forEach(sections, (section) => {
      const item = menu[section];
      if (item) {
        flattened.push(menu[section]);
      }
    });
  } else {
    forEach(menu, (section) => {
      flattened.push(section);
    });
  }

  return flattened;
}
