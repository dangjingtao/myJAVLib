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

  async init() {}

  async useIpcMain(_ipcMain) {
    const ipcMain = _ipcMain || this.ipcMain;
    const _this = this;
    const methodSet = new Set([]);
    await this.walkdir("./lib/", (dir) => {
      const func = require(dir);
      const arr = dir.split("/");
      const funcName = arr[arr.length - 1]
        .replace(".ts", "")
        .replace(".js", "");
      methodSet.add(funcName);
      Object.defineProperty(this, funcName, {
        get() {
          return func.bind(_this);
        },
      });
    });
    this.methodSet = methodSet;
    this.methodSet.forEach((x) => {
      ipcMain.handle(x, this[x]);
    });
    // 暴露app对象给渲染进程
    ipcMain.on("getApp", (e, ...args) => this.port(e, ...args));
  }

  async port(event) {
    const { win } = this;
    await win.webContents.postMessage("port", { message: this.methodSet }, []);
  }
}

module.exports = EventBus;
