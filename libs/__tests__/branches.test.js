jest.mock("../NodeGitInterface.js");
const {
  getAllBranches,
  getCurrentBranch,
  deleteBranch
} = require("../NodeGitInterface.js");
const {
  getLocalBranchNames,
  deleteSelectedBranches,
  formatBranchNameForGit
} = require("../branches.js");

const createRef = ({ isBranch = true, isRemote = true, name = "" } = {}) => ({
  isBranch: () => (isBranch ? 1 : 0),
  isRemote: () => (isRemote ? 1 : 0),
  name: () => formatBranchNameForGit(name)
});

const createSelectedBranchObject = ({ local = [] } = {}) => ({
  deleteLocal: local
});

const mockGitEnv = (references = [], currentBranch = "current branch") => {
  getAllBranches.mockReturnValue(Promise.resolve(references));
  getCurrentBranch.mockReturnValue(
    Promise.resolve(formatBranchNameForGit(currentBranch))
  );
};

afterEach(() => {
  getAllBranches.mockReset();
  getCurrentBranch.mockReset();
  deleteBranch.mockReset();
});

describe("get local branches", () => {
  test("should return blank list", async () => {
    mockGitEnv();
    const branchNames = await getLocalBranchNames();
    expect(branchNames).toEqual([]);
  });

  test("should return 1 item", async () => {
    mockGitEnv([
      createRef({
        isBranch: true,
        isRemote: false,
        name: "test branch"
      })
    ]);

    expect(await getLocalBranchNames()).toEqual(["test branch"]);
  });

  test("should return items", async () => {
    mockGitEnv([
      createRef({
        isBranch: true,
        isRemote: false,
        name: "test branch 1"
      }),
      createRef({
        isBranch: true,
        isRemote: false,
        name: "test branch 2"
      }),
      createRef({
        isBranch: true,
        isRemote: false,
        name: "test branch 3"
      })
    ]);

    expect(await getLocalBranchNames()).toEqual([
      "test branch 1",
      "test branch 2",
      "test branch 3"
    ]);
  });

  test("should filter non branches", async () => {
    mockGitEnv([
      createRef({
        isBranch: true,
        isRemote: false,
        name: "test branch"
      }),
      createRef({
        isBranch: false,
        isRemote: false,
        name: "non branch"
      })
    ]);

    expect(await getLocalBranchNames()).toEqual(["test branch"]);
  });

  test("should filter remote branches", async () => {
    mockGitEnv([
      createRef({
        isBranch: true,
        isRemote: false,
        name: "test branch"
      }),
      createRef({
        isBranch: true,
        isRemote: true,
        name: "remote branch"
      })
    ]);

    expect(await getLocalBranchNames()).toEqual(["test branch"]);
  });

  test("should filter current branch", async () => {
    mockGitEnv([
      createRef({
        isBranch: true,
        isRemote: false,
        name: "test branch"
      }),
      createRef({
        isBranch: true,
        isRemote: false,
        name: "current branch"
      })
    ]);

    expect(await getLocalBranchNames()).toEqual(["test branch"]);
  });
});

describe("delete branches", () => {
  test("should do nothing with empty selection", () => {
    deleteSelectedBranches(createSelectedBranchObject());
    expect(deleteBranch).not.toHaveBeenCalled();
  });

  test("should delete 1 branch", () => {
    deleteSelectedBranches(createSelectedBranchObject({ local: ["branch 1"] }));
    expect(deleteBranch).toHaveBeenCalledWith(
      formatBranchNameForGit("branch 1")
    );
  });

  test("should delete branchs", () => {
    deleteSelectedBranches(
      createSelectedBranchObject({
        local: ["branch 1", "branch 2", "branch 3"]
      })
    );
    expect(deleteBranch).toHaveBeenCalledTimes(3);
    expect(deleteBranch).toHaveBeenCalledWith(
      formatBranchNameForGit("branch 1")
    );
    expect(deleteBranch).toHaveBeenCalledWith(
      formatBranchNameForGit("branch 2")
    );
    expect(deleteBranch).toHaveBeenCalledWith(
      formatBranchNameForGit("branch 3")
    );
  });
});
