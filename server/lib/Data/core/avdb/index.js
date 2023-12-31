// const { createCrawler } = require("../utils/crawler");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const PREFIX = `[JAVDB]`;

const DICS = {
  發行日期: {
    code: "premiered",
  },
  長度: {
    code: "runtime",
  },
  導演: {
    code: "director",
  },
  製作商: {
    code: "studio",
  },
  發行商: {
    code: "label",
  },
  系列: {
    code: "series",
  },
};

class Javdb {
  constructor({ HOST, PROXY, logger }) {
    this.HOST = HOST;
    this.PROXY = PROXY;
    this.logger = logger;
  }

  async visit(url) {
    const browser = await puppeteer.launch({ headless: "new" });
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

  listParser($) {
    const { logger, HOST, outfit } = this;
    try {
      let curItem = null;
      $(".movie-list>.item")
        .get()
        .forEach((x) => {
          const title = $(x).find(".video-title").text();
          if (title.indexOf(outfit) > -1) {
            curItem = x;
          }
        });

      if (curItem) {
        const link = $(curItem).find("a").attr("href");
        return `${HOST}${link}`;
      } else {
        return null;
      }
    } catch (error) {
      logger.err(`${PREFIX}${outfit}抓取列表数据失败`, error);
      return null;
    }
  }

  detailParser($) {
    const { logger, HOST, outfit } = this;
    try {
      const title = $(".current-title").text();
      const infobox = $(".movie-panel-info")
        .find(".panel-block")
        .get()
        .map((x) => {
          console.log($(x).text());
        });
      // console.log(title);

      return { title };
    } catch (error) {
      logger.err(`${PREFIX}${outfit}抓取列表数据失败`, error);
      return null;
    }
  }

  async getInfoByOutfit(outfit) {
    const { PROXY, HOST, logger } = this;
    this.outfit = outfit;
    logger.info(`${PREFIX}开始抓取${outfit}数据`);
    const url = `${HOST}/search?q=${outfit}`;
    const $list = await this.visit(url);
    const detailUrl = this.listParser($list);
    if (detailUrl) {
      const $detail = await this.visit(detailUrl);
      const detailInfo = this.detailParser($detail);
    } else {
      logger.info(`${PREFIX}找不到...`);
    }
  }

  async getArtists(pageNum) {
    const { PROXY, HOST, logger } = this;
    console.log(`${PREFIX}开始抓取第 ${pageNum} 页艺术家们的数据`);
    const url = `${HOST}/api/actor/list?search_type=actors&sort=hot&country=jp&page=${pageNum}&lng=zh-TW`;
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    // Navigate the page to a URL
    try {
      await page.goto(url, {
        waitUtil: "networkidle2",
      });
    } catch (error) {
      // console.log(chalk.red("遇到问题，尝试重启！"));
      // const el = errlog;
      // el.push({ error: error?.message });
      // fs.writeFileSync(
      //   path.join(__dirname, "./errlog/index.json"),
      //   JSON.stringify(el)
      // );
    }
    const body = await page.content();
    const $ = await cheerio.load(body);
    try {
      const text = $("body").text().replace("The service is unavailable.", "");
      const newText = text.replace("The service is unavailable.", "");
      if (text != newText) console.warn(`${PREFIX}艺术家请求到非预期数据`);
      const data = JSON.parse(newText);
      await browser.close();
      let arr = [];
      const { result } = data;

      if (Array.isArray(result)) {
        const ret = "";
        return new Promise((resolve, reject) => {
          try {
            resolve(Promise.all(result.map((x) => this.getArtistInfo(x))));
          } catch (error) {
            console.info(
              `${PREFIX}艺术家抓取数据失败,将于10秒后重试...`,
              error
            );
            resolve("");
          }
        });
      } else {
        return new Promise((resolve, reject) => {
          resolve(
            Promise.all(
              Object.entries(result).map(([key, x]) => this.getArtistInfo(x))
            )
          );
        });
      }
      // console.info(`${PREFIX}抓取艺术家数据完成`);

      // return arr;
    } catch (error) {
      console.info(`${PREFIX}艺术家抓取数据失败`, error);
      return {};
    }
  }

  async getArtistInfo({ id, all_name }) {
    const { PROXY, HOST, logger } = this;
    // console.log(`${PREFIX}开始抓取艺术家${id}数据`);
    const s = Date.now();
    const url = `${HOST}/api/actor/id/${id}?lng=zh-TW`;
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    // Navigate the page to a URL
    try {
      await page.goto(url, {
        waitUtil: "networkidle2",
      });
    } catch (error) {
      // console.log(chalk.red("遇到问题，尝试重启！"));
      // const el = errlog;
      // el.push({ error: error?.message });
      // fs.writeFileSync(
      //   path.join(__dirname, "./errlog/index.json"),
      //   JSON.stringify(el)
      // );
    }
    // await page.goto(url, {
    //   waitUtil: "networkidle2",
    // });
    const body = await page.content();
    const $ = await cheerio.load(body);
    try {
      const text = $("body").text().replace("The service is unavailable.", "");
      const newText = text.replace("The service is unavailable.", "");
      if (text != newText)
        console.warn(
          `${PREFIX}艺术家【${all_name}】- ${id}详情请求到非预期数据`
        );
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
      const e = Date.now();
      console.info(
        `${PREFIX}抓取艺术家【${all_name}】${id}数据完成，用时${
          (e - s) / 1000
        }秒`
      );
      return data?.count ? data?.result : {};
    } catch (error) {
      console.info(`${PREFIX}艺术家【${all_name}】- ${id}抓取数据失败`, error);
      return {};
    }
    // i
  }
}

module.exports = { Javdb };
