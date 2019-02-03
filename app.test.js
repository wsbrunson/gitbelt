jest.mock("./nodeGitUtils.js");
const { getBranchesFromRepo } = require("./nodeGitUtils.js");
const { getLocalBranchNames } = require("./app.js");

const createRef = ({ isBranch = true, isRemote = true, name = "" } = {}) => ({
  isBranch: () => (isBranch ? 1 : 0),
  isRemote: () => (isRemote ? 1 : 0),
  name: () => `refs/heads/${name}`
});

const mockReferences = (...args) =>
  getBranchesFromRepo.mockReturnValue(Promise.resolve(args));

afterEach(() => getBranchesFromRepo.mockReset());

test("should return blank list", async () => {
  mockReferences();
  const branchNames = await getLocalBranchNames();
  expect(branchNames).toEqual([]);
});

test("should return 1 item", async () => {
  mockReferences(
    createRef({
      isBranch: true,
      isRemote: false,
      name: "test branch"
    })
  );

  expect(await getLocalBranchNames()).toEqual(["test branch"]);
});

test("should return items", async () => {
  mockReferences(
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
  );

  expect(await getLocalBranchNames()).toEqual([
    "test branch 1",
    "test branch 2",
    "test branch 3"
  ]);
});

test("should filter non branches", async () => {
  mockReferences(
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
  );

  expect(await getLocalBranchNames()).toEqual(["test branch"]);
});

test("should filter remote branches", async () => {
  mockReferences(
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
  );

  expect(await getLocalBranchNames()).toEqual(["test branch"]);
});
