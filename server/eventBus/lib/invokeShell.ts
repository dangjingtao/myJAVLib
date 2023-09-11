const { shell } = require("electron");

module.exports = function (e, method, ...args) {
  shell[method](...args);
};
