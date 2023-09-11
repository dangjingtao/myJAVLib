const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const xml2js = require("xml2js");
var Crawler = require("crawler");
const mkdir = require("./mkdir");

// 调用Puppeteer下载，用于存在较强反爬策略时
const downloadByPuppeteer = async ({ src, path }) => {
  try {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    // Navigate the page to a URL
    await page.goto(src, {
      waitUtil: "networkidle2",
    });
    await page.setViewport({ width: 1960, height: 1080 });
    const coverSelector = await page.waitForSelector("img");

    // 使用截图保存dom图片
    await coverSelector.screenshot({
      path,
      omitBackground: false,
    });

    await browser.close();
    return path;
  } catch (error) {
    // console.log(`[SAVE]保存图片失败`, error);
    return undefined;
  }
};

// 普通下载，可以获得更快的下载速度
const commonDownload = ({ src, path }) => {
  return new Promise((resolve, reject) => {
    new Crawler({
      encoding: null,
      jQuery: false, // set false to suppress warning message.
      callback: (err, res, done) => {
        if (err) {
          console.error(err.stack);
          resolve(false);
        } else {
          const ws = fs.createWriteStream(path);
          ws.write(res.body);
          ws.on("finish", (args) => {
            console.log("写入已完成................", args);
            resolve(path);
          });
          ws.on("error", (args) => {
            console.log("写入失败...", args);
            resolve(false);
          });
        }
        done();
      },
    }).queue({
      url: src,
    });
  });
};

const saveImg = async ({ dir, src, usePuppeteer = false }) => {
  const filename = src.split("/").pop();
  await mkdir(dir);

  return new Promise((resolve, reject) => {
    if (usePuppeteer) {
      downloadByPuppeteer({ src, path: `${dir}/${filename}` }).then((res) => {
        resolve({ res: "调用puppeteer下载完毕", data: res });
      });
    } else {
      commonDownload({ src, path: `${dir}/${filename}` });
      resolve({ res: "下载成功", data: `${dir}/${filename}` });
    }
  });
};

const saveInfo = async ({ path, data }) => {
  // 存入JSON
  await fs.writeFileSync(`${path}.json`, JSON.stringify(data));
  // 存入xml
  const builder = new xml2js.Builder();
  const xml = builder.buildObject(data);
  await fs.writeFileSync(`${path}.nfo`, xml);
};

module.exports = { saveImg, saveInfo };
