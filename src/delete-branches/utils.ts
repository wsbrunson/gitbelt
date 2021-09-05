import R from "ramda";
import { git } from "../git";
import { BranchTypes } from "./constants";

export interface Branch {
  type: BranchTypes;
  name: string;
  isCurrent: boolean;
}

const removeRemoteBranchName = (branchName: string): string =>
  branchName.replace("remotes/origin/", "");

const createBranchInterface =
  (type: BranchTypes, currentBranch: string) =>
  (name: string): Branch => ({
    type,
    name,
    isCurrent: name === currentBranch,
  });

export const getListOfBranches = async (): Promise<Array<Branch>> => {
  const { all: allBranchNames, current } = await git.branch(["-a"]);

  const remoteBranches = [];
  const localBranches = [];

  for (const branchName of allBranchNames) {
    if (branchName.includes("remotes/")) {
      remoteBranches.push(removeRemoteBranchName(branchName));
    } else {
      localBranches.push(branchName);
    }
  }

  const both = R.intersection(remoteBranches, localBranches);
  const localOnly = R.difference(localBranches, both);
  const remoteOnly = R.difference(remoteBranches, both);

  return both
    .map(createBranchInterface(BranchTypes.Both, current))
    .concat(localOnly.map(createBranchInterface(BranchTypes.Local, current)))
    .concat(remoteOnly.map(createBranchInterface(BranchTypes.Remote, current)));
};
