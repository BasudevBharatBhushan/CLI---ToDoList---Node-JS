// @desc splits a string into an array of two elements
const splitString = (task) => task.match(/^(\d+)\s(.+)$/).slice(1);

module.exports = splitString;
