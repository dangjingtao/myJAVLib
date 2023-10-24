module.exports = async ({ $, HOST, logger, outfit, PREFIX }) => {
  const DICS = {
    日期: {
      code: "premiered",
    },
    時長: {
      code: "runtime",
    },
    導演: {
      code: "director",
    },
    片商: {
      code: "studio",
    },
    評分: {
      code: "score",
    },
    類別: {
      code: "tags",
    },
    演員: {
      code: "actress",
    },
  };

  try {
    const title = $(".current-title").text()?.trim();
    const infobox = {};
    $(".movie-panel-info")
      .find(".panel-block")
      .get()
      .map((x) => {
        const textProp = $($(x).find("strong")[0])
          .text()
          ?.replace(":", "")
          .trim();
        const textVal = $(x).find(".value").text();

        if (DICS[textProp]) {
          const { code } = DICS[textProp];
          let matches = [null, null];
          switch (code) {
            case "score":
              matches = textVal.match(/\d+(\.\d+)?/g);
              infobox[code] = {
                result: matches[0] || null,
                scoreNum: matches[1] || 0,
              };
              break;
            case "runtime":
              matches = textVal.match(/\d+/g);
              infobox[code] = matches[0];
              break;
            case "tags":
              infobox[code] = textVal.replaceAll(" ", "").split(",");
              break;
            case "actress":
              infobox[code] = $(x)
                .find(".value")
                .find("a")
                .get()
                .map((x) => $(x).text());
              break;

            default:
              infobox[code] = textVal;
              break;
          }
        }
      });
    const vedeo_preview = $("#preview-video").find("source").attr("src");
    const magnets = $("#magnets")
      .find(".item")
      .get()
      .map((x) => {
        return {
          name: $(x).find(".name").text()?.replace(/\n/g, "")?.trim(),
          link: $(x).find("a").attr("href"),
          size: $(x).find(".meta").text()?.replace(/\n/g, "")?.trim(),
          tags: $(x).find(".tags").text()?.replace(/\n/g, "")?.trim(),
          size: $(x)
            .find(".meta")
            .text()
            ?.replace(/[\n\s]/g, "")
            ?.trim(),
          date: $(x).find(".time").text()?.replace(/\n/g, "")?.trim(),
        };
      });

    const cover = $(".video-meta-panel").find("img").attr("src");
    let maybe_like_videos = [];
    let has_performanced = [];
    $(".message-header")
      .get()
      .map((x) => {
        const text = $(x).text()?.trim();
        if (text === "TA(們)還出演過") {
          has_performanced = $(x)
            .next()
            .find("a")
            .get()
            .map((y) => {
              return {
                barcode: $(y).attr("title"),
                img_url: $(y).find("img").attr("src"),
                name: $(y).find(".video-title").text(),
              };
            });
        }
        if (text === "你可能也喜歡") {
          maybe_like_videos = $(x)
            .next()
            .find("a")
            .get()
            .map((y) => {
              return {
                barcode: $(y).attr("title"),
                img_url: $(y).find("img").attr("src"),
                name: $(y).find(".video-title").text(),
              };
            });
        }
      });

    const ret = {
      title,
      cover,
      ...infobox,
      vedeo_preview,
      magnets,
      has_performanced,
      maybe_like_videos,
    };

    return ret;
  } catch (error) {
    logger.err(`${PREFIX}${outfit}抓取列表数据失败`, error);
    return null;
  }
};
