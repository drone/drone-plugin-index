import fs from "fs";
import path from "path";
import yaml from "js-yaml";

const pluginsDirectory = path.join(process.cwd(), "plugins");

export const getSortedPluginsData = () => {
  // Get file names under /plugins
  const fileNames = fs.readdirSync(pluginsDirectory);
  const allPluginsData = fileNames.map((fileName) => {
    // Remove ".yaml" from file name to get id
    const id = fileName.replace(/\.yaml$/, "");

    // Read file as a string
    const fullPath = path.join(pluginsDirectory, fileName, `content.yaml`);
    const fileContents = fs.readFileSync(fullPath);
    const jsonContents = yaml.load(fileContents);

    // Combine the data with the id
    return {
      id,
      ...jsonContents,
    };
  });
  // Sort posts by name
  return allPluginsData.sort(({ title: a }, { title: b }) => {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    }
  });
};

export const getAllPluginIds = () => {
  const fileNames = fs.readdirSync(pluginsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.yaml$/, ""),
      },
    };
  });
};

export const getPluginData = (id) => {
  const fullPath = path.join(pluginsDirectory, id, `content.yaml`);
  const fileContents = fs.readFileSync(fullPath);
  const jsonContents = yaml.load(fileContents);

  // Combine the data with the id
  return {
    id,
    ...jsonContents,
  };
};
