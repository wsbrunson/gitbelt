import { test, expect, jest } from '@jest/globals'
import { mocked } from 'ts-jest/utils'
import { getListOfBranches } from './utils'
import { BranchTypes } from './constants'
import { fakeBranchSummaryData } from './testData'

import { git } from '../git'

jest.mock('../git')
const mockedGit = mocked(git, true)

afterEach(() => {
  jest.clearAllMocks()
})

test('it returns a list formated list of branches', async () => {
  mockedGit.branch.mockResolvedValue(fakeBranchSummaryData)

  expect(await getListOfBranches()).toEqual([
    {
      name: 'current-branch',
      type: BranchTypes.Both,
      isCurrent: true
    },
    {
      name: 'main',
      type: BranchTypes.Both,
      isCurrent: false
    },
    {
      name: 'branch-to-delete-1',
      type: BranchTypes.Local,
      isCurrent: false
    },
    {
      name: 'branch-to-delete-2',
      type: BranchTypes.Local,
      isCurrent: false
    },
    {
      name: 'branch-to-delete-3',
      type: BranchTypes.Local,
      isCurrent: false
    },

    {
      name: 'remote-branch',
      type: BranchTypes.Remote,
      isCurrent: false
    }
  ])
})
