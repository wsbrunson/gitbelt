const path = require("path");
const fs = require("fs");

module.exports = function commandLoader(program) {
  const commands = {};
  const loadPath = path.dirname(__filename);

  // Loop though command files
  fs.readdirSync(loadPath)
    .filter(function(filename) {
      return /\.js$/.test(filename) && filename !== "index.js";
    })
    .forEach(function(filename) {
      const name = filename.substr(0, filename.lastIndexOf("."));

      // Require command
      const command = require(path.join(loadPath, filename));

      // Initialize command
      commands[name] = command(program);
    });

  return commands;
};
