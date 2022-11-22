const fs = require("fs");
const https = require("https");
const path = require("path");
const yaml = require("js-yaml");

const pluginsDirectory = path.join(process.cwd(), "plugins");

const getPullCounts = async (plugin) => {
  const fileNames = fs.readdirSync(pluginsDirectory);
  const output = fileNames.reduce(
    async (acc, fileName) => {
      // Read file as a string
      const fullPath = path.join(pluginsDirectory, fileName, "content.yaml");
      const fileContents = fs.readFileSync(fullPath);
      const jsonContents = yaml.load(fileContents);
      // console.log(jsonContents.image);
      if (jsonContents.image.startsWith("https://hub.docker.com")) {
        // // console.log("bazinga");
        // const lastTwo = jsonContents.image.split("/").slice(-2);
        // // console.log(lastTwo);
        // try {
        //   const response = await fetch(
        //     `https://hub.docker.com/v2/repositories/${lastTwo[0]}/${lastTwo[1]}`
        //   );
        //   const json = await response.json();
        //   // console.log(json);
        //   return { ...acc, [`${lastTwo[0]}/${lastTwo[1]}`]: json.pull_count };
        // } catch (error) {
        //   console.log(error);
        //   return acc;
        // }
        const lastTwo = jsonContents.image.split("/").slice(-2);
        https.get(
          `https://hub.docker.com/v2/repositories/${lastTwo[0]}/${lastTwo[1]}`,
          (res) => {
            let data = "";
            res.on("data", (chunk) => {
              data += chunk;
            });
            res.on("end", () => {
              const json = JSON.parse(data);
              // console.log(json);
            });
          }
        );
        return acc;
      } else {
        console.log("not bazinga");
        return acc;
      }
    },
    { lastUpdated: new Date() }
  );
  console.log(output);
};

getPullCounts();
