const { AirAv } = require("./index");
const AIRAV_HSOT = "https://www.airav.wiki";
const fs = require("fs");
const EventEmitter = require("events");
const emitter = new EventEmitter();
emitter.setMaxListeners(100);
const airav = new AirAv({
  HOST: AIRAV_HSOT,
});
process.setMaxListeners(0);

const batchGet = (start, end) => {
  async function myFunction(p) {
    // 这里是你要执行的代码
    if (p <= end) {
      const s = Date.now();
      const res = await airav.getArtists(p);

      if (
        JSON.stringify(res) === "" ||
        JSON.stringify(res) === "{}" ||
        JSON.stringify(res) === "[]"
      ) {
        setTimeout(() => myFunction(p), 10000);
      } else {
        await fs.writeFileSync(`./json/${p}.json`, JSON.stringify(res));
        const e = Date.now();
        console.log(
          `----[AIRAV]第${p}页抓取完成------------------ 抓取用时:${
            (e - s) / 1000
          }秒`
        );
        // 设置下一次执行的延迟时间
        setTimeout(() => myFunction(p + 1), 10000);
      }
    }
  }
  myFunction(start);
};
batchGet(195, 200);
