const plugins = require('./plugins.json')

export default async function handler(req, res) {
	return res.status(200).json(plugins);
}