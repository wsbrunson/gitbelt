const {
  getBranchesFromRepo,
  getCurrentBranchFromRepo,
  deleteBranch
} = require("./NodeGitInterface");
const {
  filter,
  map,
  compose,
  curry,
  values,
  flatten,
  forEach
} = require("ramda");

const isBranch = ref => ref.isBranch() === 1;
const isRemoteBranch = ref => ref.isRemote() === 1;
const formatBranchNameForDisplay = name => name.replace("refs/heads/", "");
const formatBranchNameForGit = name => `refs/heads/${name}`;
const getName = ref => ref.name();

const isLocalBranch = ref => isBranch(ref) && !isRemoteBranch(ref);
const isCurrentBranch = curry((current, ref) => current !== getName(ref));

const getLocalBranchNames = async () =>
  compose(
    map(formatBranchNameForDisplay),
    map(getName),
    filter(isLocalBranch),
    filter(isCurrentBranch(await getCurrentBranchFromRepo()))
  )(await getBranchesFromRepo());

const deleteSelectedBranches = compose(
  forEach(deleteBranch),
  map(formatBranchNameForGit),
  flatten,
  values
);

module.exports = {
  getLocalBranchNames,
  deleteSelectedBranches,
  formatBranchNameForGit
};
