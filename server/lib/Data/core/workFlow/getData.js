const { Javbus } = require("../javbus");
const { AirAv } = require("../airav");
const { Javdb } = require("../avdb");
const cleaningData = ({ airavData, javbusData, javDBData, logger }) => {
  logger.info("[数据清洗]开始...");
  const ret = javbusData;
  try {
    ret.score = javDBData?.score;
    ret.vedeo_preview = javDBData?.vedeo_preview;
    ret.titleCN = airavData?.name;
    ret.description_CN = airavData?.description;
    ret.previews = ret.previews || airavData?.images;
    ret.actress = ret.actress.map((x) => {
      const ac = airavData?.actors?.find((y) => y.name_jp === x.name);
      return {
        ...x,
        ...ac,
      };
    });
    ret.airav = airavData;
    ret.javdb = javDBData;
    ret.maybe_like_videos = [
      ...airavData?.maybe_like_videos,
      ...javDBData?.maybe_like_videos,
    ];
    ret.magnets = [...ret.magnets, ...javDBData.magnets];
    ret.has_performanced = javDBData?.has_performanced;
    logger.info("[数据清洗]结束...");
  } catch (error) {
    logger.err("[数据清洗]失败...", error);
  }
  return ret;
};

const getData = async ({
  outfit,
  JAVBUS_HOST,
  AIRAV_HOST,
  JAVDB_HOST,
  PROXY,
  dir,
  logger,
}) => {
  logger.info(`[GENDATA]开始生成${outfit}数据`);
  const javbus = new Javbus({ PROXY, HOST: JAVBUS_HOST, logger });
  await javbus.initBrowser();
  const airav = new AirAv({ PROXY, HOST: AIRAV_HOST, logger });
  airav.initBrowser();
  const javDB = new Javdb({ PROXY, HOST: JAVDB_HOST, logger });
  javDB.initBrowser();
  const javbusData = await javbus.getInfoByOutfit(outfit);
  await javbus.complete();
  const javDBData = await javDB.getInfoByOutfit(outfit);
  await javDB.complete();
  const airavData = await airav.getInfoByOutfit(outfit);
  await javDB.complete();
  // const airavData = {};

  const data = cleaningData({ airavData, javbusData, javDBData, logger });

  logger.info(`[GENDATA]${outfit}数据已生成！`);

  return { data, logger, dir, outfit, JAVBUS_HOST, AIRAV_HOST, PROXY };
};

module.exports = getData;
