// const path = require("path");
const { PROXY, AIRAV_HSOT, JAVBUS_HOST } = require("./config");
const init = require("./core/workFlow/init");
const walkdir = require("./core/utils/walkdir");
const getData = require("./core/workFlow/getData");
const saveData = require("./core/workFlow/saveData");

process.setMaxListeners(0);

// const args = {
//   PROXY,
//   AIRAV_HSOT,
//   JAVBUS_HOST,
//   outfit,
//   dir: path.join("./assets"),
//   useLogger: true,
// };

// const all = async () => {
//   const r = await init(args);
//   const res = await getData(r);
//   const a = await saveData(res);
//   console.log("done");
// };

// const curPath = path.join(__dirname, "./source/");
// walkdir(curPath, []).then((fileList) => {
//   for (let i = 0; i < fileList.length; i++) {
//     const { outfit, stats } = fileList[i];
//     init({
//       PROXY,
//       AIRAV_HSOT,
//       JAVBUS_HOST,
//       outfit,
//       dir: path.join("./assets"),
//       useLogger: true,
//     })
//       .then(getData)
//       .then(saveData);
//   }
//   console.log("done.");
// });

class Data {
  constructor({
    // PROXY, AIRAV_HSOT, JAVBUS_HOST,
    outfit,
    dir,
    socket,
    useLogger,
  }) {
    this.PROXY = PROXY;
    this.AIRAV_HSOT = AIRAV_HSOT;
    this.JAVBUS_HOST = JAVBUS_HOST;
    this.outfit = outfit;
    this.dir = dir;
    this.socket = socket;
    this.useLogger = !!useLogger;
  }

  async walkdir(...args) {
    const { localPath } = this.localPath;
    return await walkdir(localPath, []);
  }

  async init({ ...args }) {
    const { PROXY, AIRAV_HSOT, JAVBUS_HOST, dir, outfit, useLogger, socket } =
      this;
    this.initInfo = await init({
      PROXY,
      AIRAV_HSOT,
      JAVBUS_HOST,
      dir,
      outfit,
      useLogger,
      socket,
      ...args,
    });

    return this.initInfo;
  }

  // 只获取单独的信息，不保存
  async getMeta({ ...args }) {
    const { initInfo } = this;
    this.baseData = await getData({
      ...initInfo,
      ...args,
    });
    return this.baseData;
  }

  async saveData({ ...args }) {
    const { baseData } = this;
    this.localData = await saveData({ ...baseData, ...args });
    return this.localData;
  }

  async gather(type) {
    this.gather = await this.init({});

    this.gather = await this.getMeta({});
    if (type === "local") {
      this.gather = await this.saveData({});
    }
    return this.gather;
  }

  async allMeta(...args) {
    return new Promise((resolve, reject) => {
      this.getMeta(...args).then(resolve);
    });
  }

  async walkAllData(...args) {
    return new Promise(async (resolve, reject) => {
      const list = await this.walkdir().then(async (fileList) => {
        for (let i = 0; i < fileList.length; i++) {
          const { outfit, stats } = fileList[i];
          await this.walkAllData({ ...args });
        }
        console.log("done.");
      });
    });
  }
}

module.exports = Data;
