const { AirAv } = require("./index");
const AIRAV_HSOT = "https://www.airav.wiki";
const fs = require("fs");
const EventEmitter = require("events");
const emitter = new EventEmitter();
emitter.setMaxListeners(100);
const airav = new AirAv({
  HOST: AIRAV_HSOT,
});

async function myFunction(p) {
  // 这里是你要执行的代码
  if (p < 200) {
    const res = await airav.getArtists(p);
    fs.writeFileSync(`./json/${p}.json`, JSON.stringify(res));

    // 设置下一次执行的延迟时间
    setTimeout(() => myFunction(p + 1), 1000); // 1000毫秒等于1秒
  }
}

myFunction(128);
