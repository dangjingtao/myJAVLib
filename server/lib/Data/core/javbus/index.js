const { createCrawler } = require("../utils/crawler");
const parser = require("./parser");

class Javbus {
  constructor({ PROXY, HOST, logger }) {
    this.PROXY = PROXY;
    this.HOST = HOST;
    this.logger = logger;
  }

  async getBaseData(outfit) {
    this.outfit = outfit;
    const { HOST, PROXY, logger } = this;
    const $ = await createCrawler({
      url: `${HOST}/${outfit}`,
      proxy: PROXY,
      outfit,
    });
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
      logger.info(`[JAVBUS]${outfit}抓取基础数据完成`);
    } catch (error) {
      logger.err(`[JAVBUS]${outfit}基础数据抓取失败`, error);
    }

    let magnets = [];
    try {
      magnets = await this.getMagnetsData(base.gid);
      logger.info(`[JAVBUS]${outfit}抓取磁力链数据完成`);
    } catch (error) {
      logger.err(`[JAVBUS]${outfit}磁力链数据抓取失败`, error);
    }

    return { outfit, ...base, magnets };
  }
}

module.exports = { Javbus };
