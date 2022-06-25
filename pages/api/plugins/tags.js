import _ from "lodash";

const plugins = require("./plugins.json");

export default function pluginByTagsHandler(req, res) {
  switch (req.method) {
    case "GET": {
      const { tags } = req.query;
      const splitTags = tags.split(",")
      if(splitTags && splitTags.length > 0){
        const matchedPlugins = _.filter(plugins, (o) =>{
            const iTags = _.intersection(o.tags,splitTags);
            return iTags.length > 0;
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
