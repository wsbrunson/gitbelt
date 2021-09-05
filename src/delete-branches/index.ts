import inquirer from 'inquirer'
import { git } from '../git'
import { logger } from '../logger'
import { getListOfBranches, Branch } from './utils'
import { BranchTypes } from './constants'

const branchDisabledForDelete = (
  type: BranchTypes,
  isCurrent: boolean
): string | false => {
  if (isCurrent) return 'Current Branch'

  switch (type) {
    case BranchTypes.Remote:
      return 'Remote Only'
    case BranchTypes.Both:
      return 'Local with Remote'
    case BranchTypes.Local:
      return false
  }
}

const getChoices = (
  branches: Branch[]
): Array<{ checked: boolean, name: string, disabled: string | boolean }> =>
  branches.map(({ isCurrent, type, name }) => ({
    checked: type === BranchTypes.Local || isCurrent,
    name,
    disabled: branchDisabledForDelete(type, isCurrent)
  }))

export const deleteBranches = async ({
  verbose
}: {
  verbose: boolean
}): Promise<void> => {
  const listOfBranches = (await getListOfBranches()).filter(({ type }) =>
    verbose ? true : type === BranchTypes.Local
  )

  const { branchesToDelete } = await inquirer.prompt([
    {
      type: 'checkbox',
      choices: getChoices(listOfBranches),
      name: 'branchesToDelete',
      message: 'Which branches would you like to delete?'
    }
  ])

  const branchNamesString: string = branchesToDelete.join(', ')
  logger.info(`Deleting the following branches: ${branchNamesString}`)

  await git.deleteLocalBranches(branchesToDelete)
}
