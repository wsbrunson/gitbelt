import simpleGit from "simple-git";
const git = simpleGit();

export const deleteBranches = async () => {
  const all = await git.branch(["-r"]);
  const branches = await git.branchLocal();
  console.log("list of all branches", all);
  console.log("list of branches", branches);
};
