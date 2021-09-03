#!/usr/bin/env node
import { Command } from 'commander'
import { deleteBranches } from './delete-branches'

const program = new Command()

program
  .command('delete-branches')
  .description('delete all unused branches without remotes')
  .action(deleteBranches)

program.option('-b, --bbq', 'Add bbq sauce').parse(process.argv)
