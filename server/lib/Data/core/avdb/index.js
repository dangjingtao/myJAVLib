// const { createCrawler } = require("../utils/crawler");
const listParser = require("./parser/list");
const detailParser = require("./parser/detail");
const Base = require("../Base");
const PREFIX = `[JAVDB]`;

class Javdb extends Base {
  constructor({ HOST, PROXY, logger, id }) {
    super({ HOST, PROXY, logger });
    this.PREFIX = id || PREFIX;
  }

  listParser($) {
    const { logger, HOST, outfit, PREFIX } = this;
    return listParser({ logger, HOST, outfit, PREFIX, $ });
  }

  detailParser($) {
    const { logger, HOST, outfit, PREFIX } = this;
    return detailParser({ logger, HOST, outfit, PREFIX, $ });
  }

  async getInfoByOutfit(outfit) {
    const { HOST, logger, PREFIX } = this;
    this.outfit = outfit;
    logger.info(`${PREFIX}开始抓取${outfit}数据`);
    const url = `${HOST}/search?q=${outfit}`;
    const $list = await this.visit(url);
    const detailUrl = await this.listParser($list);

    if (detailUrl) {
      const $detail = await this.visit(detailUrl);
      const detailInfo = await this.detailParser($detail);
      return detailInfo;
    } else {
      logger.info(`${PREFIX}找不到...`);
      return {};
    }
  }
}

module.exports = { Javdb };
