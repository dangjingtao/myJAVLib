const fs = require("fs");
const mkdir = async (filepath) => {
  return new Promise((resolve, reject) => {
    fs.mkdir(filepath, { recursive: true }, (e) => {
      if (!e) {
        resolve(true);
      }
    });
  });
};
module.exports = mkdir;
