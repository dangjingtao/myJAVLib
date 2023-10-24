// const { createCrawler } = require("../utils/crawler");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

class Base {
  constructor({ HOST, PROXY, logger }) {
    this.HOST = HOST;
    this.PROXY = PROXY;
    this.logger = logger;
  }

  async initBrowser(MAX_WSE = 4) {
    this.MAX_WSE = MAX_WSE;
    this.browsers = [];
    // 创建puppeteer对象
    // const context = await browser.createIncognitoBrowserContext();
    for (let i = 0; i < MAX_WSE; i++) {
      const browser = await puppeteer.launch({
        headless: "new",
      });
      const browserWSEndpoint = await browser.wsEndpoint();
      this.browsers[i] = { browserWSEndpoint, browser };
    }
  }

  async complete() {
    for (let i = 0; i < this.browsers.length; i++) {
      const { browser } = this.browsers[i];
      await browser.close();
    }
  }

  async visit(url) {
    const tmp = Math.floor(Math.random() * this.MAX_WSE);
    const { browserWSEndpoint } = this.browsers[tmp];

    const browser = await puppeteer.connect({
      browserWSEndpoint,
    });
    // const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);

    // Navigate the page to a URL
    await page.goto(url, {
      waitUtil: "networkidle2",
    });
    const body = await page.content();
    const $ = await cheerio.load(body);

    return $;
  }
}

module.exports = Base;
