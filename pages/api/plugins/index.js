const plugins = require("./plugins.json");

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      res.status(200).json(plugins);
      break;
    default:
      res.status(405).end();
      break;
  }
}
