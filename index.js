#!/usr/bin/env node
const inquirer = require("inquirer");
const { getLocalBranchNames, deleteSelectedBranches } = require("./app.js");

const run = async () => {
  const branches = await getLocalBranchNames();

  inquirer
    .prompt([
      {
        type: "checkbox",
        choices: branches,
        name: "deleteLocal",
        message: "Branches to delete"
      }
    ])
    .then(deleteSelectedBranches)
    .catch(console.error);
};

run();
