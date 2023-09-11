const fs = require("fs");
const path = require("path");
const getMovieName = require("./getMovieName");
const isMovie = require("./isMovie");

const walkdir = async (initPath, fileList) => {
  const files = await fs.readdirSync(initPath);
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileDir = path.join(initPath, file);
    const stats = fs.statSync(fileDir);
    const isFile = stats.isFile();
    const isDirectory = stats.isDirectory();
    const isMov = isMovie(fileDir);
    if (isFile && isMov) {
      fileList.push({ fileDir, outfit: getMovieName(fileDir), stats });
    }
    if (isDirectory) {
      const dirs = await walkdir(fileDir, []);
      fileList.push(...dirs);
    }
  }

  return fileList;
};

module.exports = walkdir;
