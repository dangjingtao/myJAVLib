const { Javdb } = require("./index");
const { createLogger } = require("../utils/logger");

createLogger().then(async (logger) => {
  const javDB = new Javdb({
    HOST: "https://javdb.com",
    PROXY: "http://127.0.0.1:1080",
    logger,
  });
  await javDB.initBrowser();
  //   javDB.visit("https://www.baidu.com");

  const startTime = Date.now();
  const res = await javDB.getInfoByOutfit("DVDMS-727");
  await javDB.complete();
  const endTime = Date.now();
  console.log(res);
  console.log(`用时${(endTime - startTime) / 1000}秒`);
});
