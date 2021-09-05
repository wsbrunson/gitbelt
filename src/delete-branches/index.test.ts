import { test, expect, jest } from '@jest/globals'
import { mocked } from 'ts-jest/utils'
import { deleteBranches } from '../delete-branches'
import { fakeBranchSummaryData } from './testData'

import { git } from '../git'

import inquirer from 'inquirer'
jest.mock('../git')
const mockedGit = mocked(git, true)
jest.mock('inquirer')
const mockedInquirer = mocked(inquirer, true)

afterEach(() => {
  jest.clearAllMocks()
})

const localBranchesToDelete = [
  'branch-to-delete-1',
  'branch-to-delete-2',
  'branch-to-delete-3'
]

test('verbose = false: only list of local branches', async () => {
  mockedGit.branch.mockResolvedValue(fakeBranchSummaryData)
  mockedInquirer.prompt.mockResolvedValue({
    branchesToDelete: localBranchesToDelete
  })

  await deleteBranches({ verbose: false })

  expect(mockedInquirer.prompt).toHaveBeenCalledWith([
    expect.objectContaining({
      choices: localBranchesToDelete.map((name) => ({
        name,
        checked: true,
        disabled: false
      }))
    })
  ])

  expect(mockedGit.deleteLocalBranches).toHaveBeenCalledWith(
    localBranchesToDelete
  )
})
