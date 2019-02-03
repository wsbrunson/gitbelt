const repoPath = require("path").resolve("./.git");
const NodeGit = require("nodegit");
const { getAsync } = require("./utils.js");

const getRepo = async () => getAsync(() => NodeGit.Repository.open(repoPath));
const getBranches = async repo =>
  getAsync(() => repo.getReferences(NodeGit.Reference.TYPE.LISTALL));
const getCurrentBranch = async repo =>
  getAsync(() => repo.getCurrentBranch().then(ref => ref.name()));

const getBranchesFromRepo = async () => await getBranches(await getRepo());
const getCurrentBranchFromRepo = async () =>
  await getCurrentBranch(await getRepo());
const deleteBranch = async name => {
  try {
    const code = await NodeGit.Reference.remove(await getRepo(), name);
    console.log(name + " was deleted", code);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getBranchesFromRepo,
  getCurrentBranchFromRepo,
  deleteBranch
};
