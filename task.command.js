const {
  readTasks,
  writeTasks,
  readCompletedTasks,
  addToCompleted,
} = require("./task.operation");

const splitString = require("./helper/splitString");

const printUsage = () => {
  console.log(`Usage :-
$ ./task add 2 hello world    # Add a new item with priority 2 and text "hello world" to the list
$ ./task ls                   # Show incomplete priority list items sorted by priority in ascending order
$ ./task del INDEX            # Delete the incomplete item with the given index
$ ./task done INDEX           # Mark the incomplete item with the given index as complete
$ ./task help                 # Show usage
$ ./task report               # Statistics`);
};

// @desc lists all the tasks in the taskFile
const listTasks = () => {
  if (!readTasks().length) {
    console.log("There are no pending tasks!");
    return;
  }
  const tasks = readTasks();
  console.log("Pending tasks:");
  tasks.forEach((task, index) => {
    const [priority, taskText] = splitString(task);
    console.log(`${index + 1}. ${taskText} [${priority}]`);
  });
};

// @desc adds a task to the taskFile
const addTask = (priority, task) => {
  if (!priority || !task) {
    console.log("Error: Missing tasks string. Nothing added!");
    return;
  }
  const tasks = readTasks();
  tasks.push(`${priority} ${task}`);
  writeTasks(tasks);
  console.log(`Added task: "${task}" with priority ${priority}`);
};

// @desc deletes a task from the taskFile
const deleteTask = (index) => {
  if (!index) {
    console.log("Error: Missing NUMBER for deleting tasks.");
    return;
  }
  const tasks = readTasks();
  if (index < 1 || index > tasks.length) {
    console.log(
      `Error: task with index #${index} does not exist. Nothing deleted.`
    );
    return;
  }

  writeTasks(tasks);
  console.log(`Deleted task #${index}`);
};

// @desc mark task as done by moving tasks from task.txt to completed.txt
const markTaskAsDone = (index) => {
  if (!index) {
    console.log("Error: Missing NUMBER for marking tasks as done.");
    return;
  }
  const tasks = readTasks();
  if (index < 1 || index > tasks.length) {
    console.log(`Error: no incomplete item with index #${index} exists.`);
    return;
  }
  const completedTask = tasks.splice(index - 1, 1)[0];
  writeTasks(tasks);
  const [_, task] = splitString(completedTask);
  addToCompleted(task);
  console.log(`Marked item as done.`);
};

// @desc generates a report of all the tasks
const generateReport = () => {
  const tasks = readTasks();
  console.log(`Pending : ${tasks.length}`);
  tasks.forEach((task, index) => {
    const [priority, taskText] = splitString(task);
    console.log(`${index + 1}. ${taskText} [${priority}]`);
  });

  const completedTasks = readCompletedTasks();

  console.log(`\nCompleted : ${completedTasks.length}`);
  completedTasks.forEach((task, index) => {
    console.log(`${index + 1}. ${task}`);
  });
};

module.exports = {
  printUsage,
  listTasks,
  addTask,
  deleteTask,
  markTaskAsDone,
  generateReport,
};
