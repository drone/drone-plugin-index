import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { ExampleJSON, Path, PluginData, PluginDataNoId } from "types";

const pluginsDirectory = path.join(process.cwd(), "plugins");

export const getSortedPluginsData = (): PluginData[] => {
  // Get file names under /plugins
  const fileNames = fs.readdirSync(pluginsDirectory);
  const allPluginsData = fileNames.map((fileName) => {
    // Remove ".yaml" from file name to get id
    const id = fileName.replace(/\.yaml$/, "");

    // Read file as a string
    const fullPath = path.join(pluginsDirectory, fileName, `content.yaml`);
    const fileContents = fs.readFileSync(fullPath, "utf-8");
    const jsonContents = yaml.load(fileContents) as PluginDataNoId;

    // Combine the data with the id
    return {
      id,
      ...jsonContents,
    } as PluginData;
  });
  // Sort posts by name
  return allPluginsData.sort(({ title: a }, { title: z }) => {
    if (a > z) {
      return 1;
    } else if (z > a) {
      return -1;
    } else {
      return 0;
    }
  });
};

export const getAllPluginIds = (): Path[] => {
  const fileNames = fs.readdirSync(pluginsDirectory);

  return fileNames.map((fileName) => ({
    params: { id: fileName.replace(/\.yaml$/, "") },
  }));
};

export const getPluginData = (id: string): PluginData => {
  const fullPath = path.join(pluginsDirectory, id, `content.yaml`);
  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const jsonContents = yaml.load(fileContents) as PluginDataNoId;

  const cieExample = jsonContents.example
    ? getCieExample(yaml.load(jsonContents.example) as ExampleJSON)
    : null;

  // Combine the data with the id
  return {
    id,
    ...jsonContents,
    cieExample,
  };
};

const getCieExample = (exampleJson: ExampleJSON) => {
  const { name, image, settings } = exampleJson.steps[0];
  return yaml.dump({
    pipeline: {
      stages: [
        {
          identifier: "default",
          name: "default",
          steps: [
            {
              identifier: name,
              name,
              spec: {
                connectorRef: "account.docker",
                image,
                type: "Plugin",
                settings,
              },
            },
          ],
        },
      ],
    },
  });
};
