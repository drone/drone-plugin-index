const plugins = require("./plugins.json");

export default function pluginByIdHandler(req, res) {
  switch (req.method) {
    case "GET": {
      const { id } = req.query;
      const plugin = plugins.find((i) => i.id === id);
      if (plugin) {
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
