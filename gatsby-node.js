const axios = require("axios");
const { map, nth, split, uniq, keysIn } = require("lodash");

exports.sourceNodes = async ({
  actions: { createNode },
  createNodeId,
  createContentDigest,
}) => {
  const response = await axios.get(
    "https://github.com/virtool/virtool/releases/latest/download/openapi.json",
    {
      headers: {
        accept: "application/octet-stream",
      },
    }
  );

  const paths = uniq(
    map(keysIn(response.data.paths), (path) => nth(split(path, "/"), 1))
  );

  createNode({
    APIData: JSON.stringify(response.data.paths),
    paths: paths,
    id: createNodeId(response.data.openapi),
    internal: {
      type: "APIData",
      contentDigest: createContentDigest(response),
    },
  });
  map(paths, (path) => {
    createNode({
      pathName: path,
      id: path,
      internal: {
        type: "Paths",
        contentDigest: createContentDigest(path),
      },
    });
  });
};
