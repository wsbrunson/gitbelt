#!/usr/bin/env node
import { Command } from "commander";
import { deleteBranches } from "./delete-branches";

const packageJson = require("../package.json");

const program = new Command();

program
  .command("delete-branches")
  .description("delete all unused branches without remotes")
  .action(deleteBranches);

program
  .version(packageJson.version)
  .description(packageJson.description)
  .option("-b, --bbq", "Add bbq sauce")
  .parse(process.argv);
