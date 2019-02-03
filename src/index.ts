#!/usr/bin/env node
import { Command } from "commander";
import { deleteBranches } from "./delete-branches";

const program = new Command();

program
  .command("delete-branches")
  .description("delete all unused branches without remotes")
  .option(
    "-v, --verbose",
    "Show All Branches (only shows branches that can be deleted by default)"
  )
  .action(deleteBranches);

program.option("-b, --bbq", "Add bbq sauce").parse(process.argv);
