#!/usr/bin/env node
const {
  printUsage,
  listTasks,
  addTask,
  deleteTask,
  markTaskAsDone,
  generateReport,
} = require("./task.command.js");

// @desc main function
const main = (argv) => {
  switch (argv[0]) {
    case "help":
      printUsage();
      break;
    case "ls":
      listTasks();
      break;
    case "add":
      addTask(argv[1], argv.slice(2).join(" "));
      break;
    case "del":
      deleteTask(argv[1]);
      break;
    case "done":
      markTaskAsDone(argv[1]);
      break;
    case "report":
      generateReport();
      break;
    default:
      console.log("Error: invalid command");
      printUsage();
  }
};

main(process.argv.slice(2));
