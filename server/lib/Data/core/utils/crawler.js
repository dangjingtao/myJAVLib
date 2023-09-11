const Crawler = require("crawler");

const createCrawler = (opts = {}) => {
  const { callback, url, proxy, crawlerOptions } = opts;
  return new Promise((resolve, reject) => {
    const instance = new Crawler({
      maxConnections: 10,
      // 在每个请求处理完毕后将调用此回调函数
      callback: function (error, res, done) {
        if (error) {
          console.log(`[crawler err]`, error);
        } else {
          var $ = res.$;
          // $ 默认为 Cheerio 解析器
          // 它是核心jQuery的精简实现，可以按照jQuery选择器语法快速提取DOM元素
          callback && callback($);
          resolve($);
        }
        done();
      },
      ...crawlerOptions,
    });
    instance.queue({
      url,
      proxy,
    });
  });
};

module.exports = { createCrawler };
