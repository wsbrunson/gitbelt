import inquirer from "inquirer";
import { git } from "./git";
import { logger } from "./logger";

export const deleteBranches = async () => {
  const remoteBranches = (await git.branch(["-r"])).all.map((branchName) =>
    branchName.replace("origin/", "")
  );
  const { all: localBranches, current } = await git.branchLocal();

  const branchesToDelete = localBranches
    .filter(
      (branchName) =>
        !remoteBranches.includes(branchName) && current !== branchName
    )
    .map((branchName) => ({ name: branchName, checked: true }));

  const { branches } = await inquirer.prompt([
    {
      type: "checkbox",
      choices: branchesToDelete,
      name: "branches",
      message: "Which branches would you like to delete?",
    },
  ]);

  logger.info(`Deleting the following branches: ${branches.join(", ")}`);

  git.deleteLocalBranches(branches);
};
