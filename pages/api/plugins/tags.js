const plugins = require("./plugins.json");

export default function pluginByTagsHandler(req, res) {
  switch (req.method) {
    case "GET": {
      const { tags } = req.query;
      const splitTags = tags.split(",");
      if (splitTags && splitTags.length > 0) {
        const matchedPlugins = plugins.filter((p) => {
          return p.tags.some((pTag) => splitTags.some((sTag) => sTag === pTag));
        });
        if (matchedPlugins) {
          return res.status(200).json(matchedPlugins);
        } else {
          res.status(404).json({ message: `No plugins has tags ${tags}` });
        }
        break;
      }
    }

    default:
      res.status(405).end();
      break;
  }
}
