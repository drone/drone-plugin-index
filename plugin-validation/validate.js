const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const ajv = require("ajv");

const validationDirectory = path.join(process.cwd(), "plugin-validation");
const pluginsDirectory = path.join(process.cwd(), "plugins");

const pluginSchemaPath = path.join(validationDirectory, `plugin-schema.json`);
const exampleSchemaPath = path.join(validationDirectory, `example-schema.json`);
const pluginSchemaFileContents = JSON.parse(
  fs.readFileSync(pluginSchemaPath).toString()
);
const exampleSchemaFileContents = JSON.parse(
  fs.readFileSync(exampleSchemaPath).toString()
);

const validator = new ajv({ allErrors: true, allowUnionTypes: true });

const pluginValidate = validator.compile(pluginSchemaFileContents);
const exampleValidate = validator.compile(exampleSchemaFileContents);

let scriptPass = true;

const fileNames = fs.readdirSync(pluginsDirectory);
const output = fileNames.reduce((acc, fileName) => {
  // Read file as a string
  const fullPath = path.join(pluginsDirectory, fileName, "content.yaml");
  const fileContents = fs.readFileSync(fullPath);
  const jsonContents = yaml.load(fileContents);

  const pluginValid = pluginValidate(jsonContents);
  const exampleValid =
    !jsonContents.example || exampleValidate(yaml.load(jsonContents.example));

  const pluginReport = {
    path: fullPath,
  };

  if (!pluginValid || !exampleValid) {
    scriptPass = false;
    pluginReport.valid = false;
    pluginReport.pluginErrors =
      pluginValidate?.errors?.map(({ instancePath, message }) => {
        return instancePath ? `${instancePath} - ${message}` : message;
      }) || [];
    pluginReport.exampleErrors =
      exampleValidate?.errors?.map(({ instancePath, message }) => {
        return `${instancePath} - ${message}`;
      }) || [];
  } else {
    pluginReport.valid = true;
    pluginReport.pluginErrors = [];
    pluginReport.exampleErrors = [];
  }

  return [...acc, pluginReport];
}, []);

output.forEach(({ path, valid, pluginErrors, exampleErrors }) => {
  if(valid) {
    console.log("\x1b[32m", `VALID - ${path}`)
  } else {
    console.log("\x1b[31m", `INVALID - ${path}`);
    pluginErrors.forEach((err) => {
      console.log("\x1b[31m", `\t${err}`);
    });
    exampleErrors.forEach((err) => {
      console.log("\x1b[31m", `\t${err}`);
    });
  }
});

if(!scriptPass) {
  console.log("\x1b[31m", `PLUGIN VALIDATION FAIL`);
  process.exit(1);
} else {
  console.log("\x1b[32m", `PLUGIN VALIDATION SUCCESS`);
  process.exit(0);
}
