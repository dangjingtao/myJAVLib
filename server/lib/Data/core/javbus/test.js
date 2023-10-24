const { Javbus } = require("./index");
const { createLogger } = require("../utils/logger");

createLogger().then(async (logger) => {
  const javbus = new Javbus({
    HOST: "https://www.javbus.com/",
    PROXY: "http://127.0.0.1:1080",
    logger,
  });
  await javbus.initBrowser();

  const startTime = Date.now();
  const res = await javDB.getInfoByOutfit("DVDMS-727");
  await javDB.complete();
  const endTime = Date.now();
  console.log(`用时${(endTime - startTime) / 1000}秒`);
});
