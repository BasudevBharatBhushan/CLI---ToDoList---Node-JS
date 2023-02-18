const fs = require("fs");
const taskFile = "task.txt";
const completedFile = "completed.txt";

// @desc reads the tasks from the taskFile and returns them as an array
const readTasks = () => {
  try {
    const data = fs.readFileSync(taskFile, "utf8");
    return data
      .split("\n")
      .filter((task) => task)
      .sort((a, b) => {
        const [priorityA] = a.split(" ", 2);
        const [priorityB] = b.split(" ", 2);
        return priorityA - priorityB; // sort by priority
      });
  } catch (err) {
    console.log(`Error reading tasks from ${taskFile}: ${err}`);
    return [];
  }
};

const writeTasks = (tasks) => {
  try {
    fs.writeFileSync(taskFile, tasks.join("\n"));
  } catch (err) {
    console.log(`Error writing tasks to ${taskFile}: ${err}`);
  }
};

// @desc reads the completed tasks from the completedFile and returns them as an array
const readCompletedTasks = () => {
  try {
    const data = fs.readFileSync(completedFile, "utf8");
    return data.split("\n").filter((task) => task);
  } catch (err) {
    console.log(`Error reading completed tasks from ${completedFile}: ${err}`);
    return [];
  }
};

// @desc writes the completed tasks to the completedFile
const writeCompletedTasks = (completedTasks) => {
  try {
    fs.writeFileSync(completedFile, completedTasks.join("\n"));
  } catch (err) {
    console.log(`Error writing completed tasks to ${completedFile}: ${err}`);
  }
};

const addToCompleted = (task) => {
  const completedTasks = readCompletedTasks();
  completedTasks.push(task);
  writeCompletedTasks(completedTasks);
};

module.exports = {
  readTasks,
  writeTasks,
  readCompletedTasks,
  addToCompleted,
};
