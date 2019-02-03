const repoPath = require("path").resolve("./.git");
const NodeGit = require("nodegit");
const { getAsync } = require("./utils.js");

const getRepo = async () =>
  getAsync(() => NodeGit.Repository.openBare(repoPath));
const getBranches = async repo =>
  getAsync(() => repo.getReferences(NodeGit.Reference.TYPE.LISTALL));

const getBranchesFromRepo = async () => await getBranches(await getRepo());

module.exports = { getBranchesFromRepo };
