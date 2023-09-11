const fs = require("fs");
const path = require("path");

class EventBus {
  constructor({ app, sequelize, response, win, ipcMain, socket }) {
    this.app = app;
    this.sequelize = sequelize;
    this.response = response;
    this.win = win;
    this.ipcMain = ipcMain;
    this.socket = socket;
  }
  async walkdir(initPath, callback = () => {}) {
    const ab_path = path.join(__dirname, initPath);
    const files = await fs.readdirSync(ab_path);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileDir = path.join(ab_path, file);
      const stats = fs.statSync(fileDir);
      const isFile = stats.isFile();
      const isDirectory = stats.isDirectory();

      if (isFile) {
        //   fileList.push({ fileDir, outfit: getMovieName(fileDir), stats });
        callback(fileDir);
      }
      if (isDirectory) {
        await this.walkdir(fileDir, callback);
        //   fileList.push(...dirs);
      }
    }
  }

  async init() {
    const { ipcMain, win } = this;
    const _this = this;
    const methodSet = new Set([]);
    await this.walkdir("./lib/", (dir) => {
      const func = require(dir);
      const arr = dir.split("/");
      const funcName = arr[arr.length - 1].replace(".ts", "");
      //   console.log(func, funcName);
      methodSet.add(funcName);
      Object.defineProperty(_this, funcName, {
        get() {
          return func.bind(_this);
        },
      });
    });
    this.methodSet = methodSet;
    this.methodSet.forEach((x) => {
      ipcMain.handle(x, this[x]);
    });

    win.webContents.postMessage("port", { message: this.methodSet }, []);
  }

  use() {}
}

module.exports = EventBus;
