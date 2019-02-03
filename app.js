const { getBranchesFromRepo } = require("./nodeGitUtils");
const { filter, map, compose } = require("ramda");

const isBranch = ref => ref.isBranch() === 1;
const isRemoteBranch = ref => ref.isRemote() === 1;
const getName = ref => ref.name().replace("refs/heads/", "");

const isLocalBranch = ref => isBranch(ref) && !isRemoteBranch(ref);

const getLocalBranchNames = async () =>
  compose(
    map(getName),
    filter(isLocalBranch)
  )(await getBranchesFromRepo());

module.exports = { getLocalBranchNames };
