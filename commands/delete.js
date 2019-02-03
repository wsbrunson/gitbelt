const inquirer = require("inquirer");
const {
  getLocalBranchNames,
  deleteSelectedBranches
} = require("../libs/branches");

const askForBranches = branches =>
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
    // eslint-disable-next-line no-console
    .catch(console.error);

module.exports = function deleteProgram(program) {
  program
    .command("delete")
    .description("Lists branches available to delete")
    .action(() => {
      getLocalBranchNames().then(askForBranches);
    });
};
