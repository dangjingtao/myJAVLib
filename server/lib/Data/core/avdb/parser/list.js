module.exports = async ({ $, HOST, logger, PREFIX, outfit }) => {
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
};
