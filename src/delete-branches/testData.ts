export const fakeBranchSummaryData = {
  all: [
    "branch-to-delete-1",
    "branch-to-delete-2",
    "branch-to-delete-3",
    "current-branch",
    "main",
    "remotes/origin/current-branch",
    "remotes/origin/main",
    "remotes/origin/remote-branch",
  ],
  branches: {
    "branch-to-delete-1": {
      current: false,
      name: "branch-to-delete-1",
      commit: "785b109",
      label: "new work",
    },
    "branch-to-delete-2": {
      current: false,
      name: "branch-to-delete-2",
      commit: "785b109",
      label: "new work",
    },
    "branch-to-delete-3": {
      current: false,
      name: "branch-to-delete-3",
      commit: "785b109",
      label: "new work",
    },
    "current-branch": {
      current: true,
      name: "current-branch",
      commit: "9eeb873",
      label: "current branch",
    },
    main: {
      current: true,
      name: "main",
      commit: "e14c7e1",
      label: "back to gitbelt",
    },
    "remotes/origin/current-branch": {
      current: false,
      name: "remotes/origin/current-branch",
      commit: "9eeb873",
      label: "current branch",
    },
    "remotes/origin/main": {
      current: false,
      name: "remotes/origin/main",
      commit: "e14c7e1",
      label: "back to gitbelt",
    },
    "remotes/origin/remote-branch": {
      current: false,
      name: "remotes/origin/remote-branch",
      commit: "e14c7e1",
      label: "remote branch",
    },
  },
  current: "current-branch",
  detached: false,
};
