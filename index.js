const program = require("commander");
const packageJson = require("./package.json");

// setup commands
require("./commands")(program);

program
  .version(packageJson.version)
  .on("--help", () => {})
  .parse(process.argv);
