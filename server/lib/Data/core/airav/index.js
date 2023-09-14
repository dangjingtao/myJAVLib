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

  async getArtists(pageNum) {
    const { PROXY, HOST, logger } = this;
    console.log(`[AIRAV]开始抓取艺术家数据`);
    const url = `${HOST}/api/actor/list?search_type=actors&sort=hot&country=jp&page=${pageNum}&lng=zh-TW`;
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto(url);
    const body = await page.content();
    const $ = await cheerio.load(body);
    try {
      const text = $("body").text().replace("The service is unavailable.", "");
      const newText = text.replace("The service is unavailable.", "");
      if (text != newText) console.warn(`[AIRAV]艺术家请求到非预期数据`);
      const data = JSON.parse(newText);
      await browser.close();
      let arr = [];
      const { result } = data;
      if (Array.isArray(result)) {
        for (let i = 0; i < result.length; i++) {
          const info = await this.getArtistInfo(result[i].id);
          // console.log("---", info);
          arr.push(info);
        }
      }
      console.info(`[AIRAV]抓取艺术家数据完成`);

      return arr;
      return data?.count ? data?.result : {};
    } catch (error) {
      console.info(`[AIRAV]艺术家抓取数据失败`, error);
      return {};
    }
  }

  async getArtistInfo(id) {
    const { PROXY, HOST, logger } = this;
    console.log(`[AIRAV]开始抓取艺术家${id}数据`);
    const url = `${HOST}/api/actor/id/${id}?lng=zh-TW`;
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto(url);
    const body = await page.content();
    const $ = await cheerio.load(body);
    try {
      const text = $("body").text().replace("The service is unavailable.", "");
      const newText = text.replace("The service is unavailable.", "");
      if (text != newText)
        console.warn(`[AIRAV]艺术家${id}详情请求到非预期数据`);
      const data = JSON.parse(newText);
      await browser.close();
      if (data.result) {
        const { result } = data;
        delete result.actor_videos;
        if (Array.isArray(data?.result?.images)) {
          data.result.images = data?.result?.images.map((x) =>
            x.replace("https://wiki-img.airav.wiki/storage/sections", "")
          );
        }
      }
      console.info(`[AIRAV]抓取艺术家${id}数据完成`);
      return data?.count ? data?.result : {};
    } catch (error) {
      console.info(`[AIRAV]艺术家${id}抓取数据失败`, error);
      return {};
    }
    // i
  }
}

module.exports = { AirAv };
