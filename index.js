#!/usr/bin/env node
const inquirer = require("inquirer");
const { getLocalBranchNames } = require("./app.js");

getLocalBranchNames().then(branches => {
  inquirer
    .prompt([
      { type: "checkbox", choices: branches, name: "Branches available" }
    ])
    .then(console.log)
    .catch(console.error);
});
