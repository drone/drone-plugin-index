import YAML from "yaml";
import fsex from "fs-extra";
import path from "path";
import filehound from "filehound";
import _ from "lodash";

function main() {
  console.log("Jai Guru");
  const pluginFiles = filehound
    .create()
    .paths("./plugins")
    .ignoreHiddenDirectories()
    .ignoreHiddenFiles()
    .glob(["content.yaml"])
    .findSync();
  //console.log(pluginFiles)
  const pluginsJSON = [];
  if (pluginFiles && pluginFiles.length > 0) {
    pluginFiles.forEach((pf) => {
      const pluginDirs = path.dirname(pf).split(path.sep);
      const pluginName = pluginDirs[pluginDirs.length - 1];
      const strYAML = fsex.readFileSync(pf).toString();
      const doc = YAML.parse(strYAML, "utf-8");

      //find the plugin image name
      let image;
      const exampleYAML = doc.example;
      if (exampleYAML) {
        const exampleYamlDoc = YAML.parse(exampleYAML);
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
  fsex.writeJsonSync("./pages/api/plugins/plugins.json", pluginsJSON);
}

main();
