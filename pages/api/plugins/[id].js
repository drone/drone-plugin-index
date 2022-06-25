import _ from "lodash";

const plugins = require("./plugins.json");

export default function pluginByIdHandler(req, res) {
  switch (req.method) {
    case "GET": {
      const { id } = req.query;
      const plugin = _.find(plugins, { id });
      if (plugin) {
        console.log("ID %s", plugin);
        return res.status(200).json(plugin);
      } else {
        res.status(404).json({ message: `Plugin with id: ${id} not found.` });
      }
      break;
    }

    default:
	  res.status(405).end();
      break;
  }
}
