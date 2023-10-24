const { createCrawler } = require("../utils/crawler");
const parser = require("./parser");
const Base = require("../Base");
const PREFIX = "[JAVBUS]";

class Javbus extends Base {
  constructor({ PROXY, HOST, logger, id }) {
    super({ PROXY, HOST, logger });
    this.id = id || PREFIX;
  }

  async getBaseData(outfit) {
    this.outfit = outfit;
    const { HOST, logger } = this;
    const $ = await this.visit(`${HOST}/${outfit}`);
    const data = await parser.details({ $, HOST, logger });
    return data;
  }

  async getMagnetsData(gid) {
    const { HOST, PROXY, logger } = this;
    const headers = { referer: HOST };
    const query = `gid=${gid}&uc=0&lang=en&floor=` + (Date.now() % 1e3);
    const url = `${HOST}/ajax/uncledatoolsbyajax.php?${query}`;

    const $ = await createCrawler({
      url,
      proxy: PROXY,
      crawlerOptions: {
        headers,
      },
    });

    const data = await parser.magnets($);
    return data;
  }

  async getListData() {
    const { HOST, PROXY } = this;
  }

  async getInfoByOutfit(outfit) {
    const { logger } = this;
    let base = {};
    try {
      base = await this.getBaseData(outfit);
      logger.info(`${PREFIX}${outfit}抓取基础数据完成`);
    } catch (error) {
      logger.err(`${PREFIX}${outfit}基础数据抓取失败`, error);
    }

    let magnets = [];
    try {
      magnets = await this.getMagnetsData(base.gid);
      logger.info(`${PREFIX}${outfit}抓取磁力链数据完成`);
    } catch (error) {
      logger.err(`${PREFIX}${outfit}磁力链数据抓取失败`, error);
    }

    return { outfit, ...base, magnets };
  }
}

module.exports = { Javbus };
