import { test, expect, jest } from "@jest/globals";
import { mocked } from "ts-jest/utils";
import { deleteBranches } from "./delete-branches";

import { git } from "./git";
jest.mock("./git");
const mockedGit = mocked(git, true);

import inquirer from "inquirer";
jest.mock("inquirer");
const mockedInquirer = mocked(inquirer, true);

afterEach(() => {
  jest.clearAllMocks();
});

test("it returns a list of branches that are not remotes", async () => {
  mockedGit.branch.mockResolvedValue({
    all: ["origin/remote-branch"],
    detached: false,
    current: "not-this-branch",
    branches: {},
  });

  mockedGit.branchLocal.mockResolvedValue({
    all: ["remote-branch", "not-remote-branch"],
    detached: false,
    current: "not-this-branch",
    branches: {},
  });

  mockedInquirer.prompt.mockResolvedValue({ branches: ["not-remote-branch"] });

  await deleteBranches();

  expect(mockedInquirer.prompt).toHaveBeenCalledWith([
    expect.objectContaining({
      choices: [{ name: "not-remote-branch", checked: true }],
    }),
  ]);

  expect(mockedGit.deleteLocalBranches).toHaveBeenCalledWith([
    "not-remote-branch",
  ]);
});

test("it returns a list of branches that does not include current branch", async () => {
  mockedGit.branch.mockResolvedValue({
    all: [],
    detached: false,
    current: "not-this-branch",
    branches: {},
  });

  mockedGit.branchLocal.mockResolvedValue({
    all: ["current-branch", "not-remote-branch"],
    detached: false,
    current: "current-branch",
    branches: {},
  });

  mockedInquirer.prompt.mockResolvedValue({ branches: ["not-remote-branch"] });

  await deleteBranches();

  expect(mockedInquirer.prompt).toHaveBeenCalledWith([
    expect.objectContaining({
      choices: [{ name: "not-remote-branch", checked: true }],
    }),
  ]);

  expect(mockedGit.deleteLocalBranches).toHaveBeenCalledWith([
    "not-remote-branch",
  ]);
});
