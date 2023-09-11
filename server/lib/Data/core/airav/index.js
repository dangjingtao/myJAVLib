const { createCrawler } = require("../utils/crawler");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

class AirAv {
  constructor({ HOST, PROXY, logger }) {
    this.HOST = HOST;
    this.PROXY = PROXY;
    this.logger = logger;
  }
  async getInfoByOutfit(outfit) {
    const { PROXY, HOST, logger } = this;
    this.outfit = outfit;
    logger.info(`[AIRAV]开始抓取${outfit}数据`);
    const url = `${HOST}/api/video/barcode/${outfit}?lng=zh-TW`;
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto(url);
    const body = await page.content();
    const $ = await cheerio.load(body);
    try {
      const text = $("body").text().replace("The service is unavailable.", "");
      const newText = text.replace("The service is unavailable.", "");
      if (text != newText) logger.warn(`[AIRAV]${outfit}请求到非预期数据`);
      const data = JSON.parse(newText);
      await browser.close();
      logger.info(`[AIRAV]抓取${outfit}数据完成`);
      return data?.count ? data?.result : {};
    } catch (error) {
      logger.info(`[AIRAV]${outfit}抓取数据失败`, error);
      return {};
    }
  }
}

module.exports = { AirAv };
