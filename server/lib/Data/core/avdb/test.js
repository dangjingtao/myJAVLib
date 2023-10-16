const { Javdb } = require("./index");
const { createLogger } = require("../utils/logger");

createLogger().then((logger) => {
  const javDB = new Javdb({
    HOST: "https://javdb.com",
    PROXY: "http://127.0.0.1:1080",
    logger,
  });

  javDB.getInfoByOutfit("ABP-792");
});
