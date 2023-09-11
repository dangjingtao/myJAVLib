const { Javbus } = require("../javbus");
const { AirAv } = require("../airav");
const cleaningData = ({ airavData, javbusData, logger }) => {
  logger.info("[数据清洗]开始...");
  const ret = javbusData;
  try {
    ret.titleCN = airavData.name;
    ret.description_CN = airavData.description;
    ret.previews = ret.previews || airavData.images;
    ret.actress = ret.actress.map((x) => {
      const ac = airavData.actors?.find((y) => y.name_jp === x.name);
      return {
        ...x,
        ...ac,
      };
    });
    ret.airav = airavData;
    ret.maybe_like_videos = airavData.maybe_like_videos;
    logger.info("[数据清洗]结束...");
  } catch (error) {
    logger.err("[数据清洗]失败...", error);
  }
  return ret;
};

const getData = async ({
  outfit,
  JAVBUS_HOST,
  AIRAV_HSOT,
  PROXY,
  dir,
  logger,
}) => {
  logger.info(`[GENDATA]开始生成${outfit}数据`);
  const javbus = new Javbus({ PROXY, HOST: JAVBUS_HOST, logger });
  const airav = new AirAv({ PROXY, HOST: AIRAV_HSOT, logger });
  const javbusData = await javbus.getInfoByOutfit(outfit);
  const airavData = await airav.getInfoByOutfit(outfit);
  const data = cleaningData({ airavData, javbusData, logger });

  logger.info(`[GENDATA]${outfit}数据已生成！`);

  return { data, logger, dir, outfit, JAVBUS_HOST, AIRAV_HSOT, PROXY };
};

module.exports = getData;
