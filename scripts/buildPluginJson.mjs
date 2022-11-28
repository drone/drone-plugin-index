import fs from "fs";
import path from "path";
import filehound from "filehound";
import yaml from "js-yaml";

function main() {
  const pluginFiles = filehound
    .create()
    .paths("./plugins")
    .ignoreHiddenDirectories()
    .ignoreHiddenFiles()
    .glob(["content.yaml"])
    .findSync();
  const pluginsJSON = [];
  if (pluginFiles && pluginFiles.length > 0) {
    pluginFiles.forEach((pf) => {
      const pluginDirs = path.dirname(pf).split(path.sep);
      const pluginName = pluginDirs[pluginDirs.length - 1];
      const strYAML = fs.readFileSync(pf).toString();
      const doc = yaml.load(strYAML, "utf-8");
      //find the plugin image name
      let image = doc.image;
      const exampleYAML = doc.example;
      if (exampleYAML) {
        const exampleYamlDoc = yaml.load(exampleYAML);
        if (exampleYamlDoc) {
          image = exampleYamlDoc.steps[0].image;
        }
      }

      pluginsJSON.push({
        id: pluginName,
        name: doc.title,
        description: doc.description,
        image,
        tags: doc.tags,
        settings: doc.properties,
        example: exampleYAML,
        url: doc.repo,
      });
    });
  }
  fs.writeFileSync(
    "./pages/api/plugins/plugins.json",
    JSON.stringify(pluginsJSON)
  );
}

main();
