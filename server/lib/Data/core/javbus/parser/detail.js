module.exports = async ({ $, HOST, logger }) => {
  const movie = $(".movie");
  const title = $("h3").text();

  // 获取gid
  const [gid] = $("body")
    .find("script")
    .map((i, item) => item.children[0])
    .get()
    .filter(Boolean)
    .map((script) => script.data)
    .filter((script) => /gid/.test(script))
    .map((script) => script.match(/gid = (\d+);/)[1]);

  // 获取演员
  const actress = $(".star-box img", movie)
    .map((i, star) => {
      const code = $($(".star-box")[i]).attr("id").replace("star_", "");
      const img = $(star).attr("src");

      return {
        code,
        name: $(star).attr("title"),
        avatar: img ? (img.indexOf("http") === 0 ? img : HOST + img) : "",
      };
    })
    .get();

  // 获取封面大图
  const cover = HOST + $(".bigImage").find("img").attr("src");

  // 获取标签类别
  const tags = $(".info label a", movie)
    .map((i, x) => {
      const name = $(x).text();
      const href = $(x).attr("href");
      const code = href.replace(`${HOST}/genre/`, "");
      return {
        name,
        href,
        code,
      };
    })
    .get();

  // 获取略缩图，是一个约定的规则
  const thumb = `${HOST}/pics/thumb/${cover
    .split("/")
    [cover.split("/").length - 1].replace("_b", "")}`;

  // 获取预览图
  const previews = $("#sample-waterfall a")
    .map((i, anchor) => $(anchor).attr("href"))
    .get();

  // 获取磁力链

  // 获取其他信息
  const info = {
    director: null, //导演
    premiered: null, //发行日期
    runtime: null, //时长
    studio: null, //制作商
  };
  const genOtherInfo = (arr, info, anchor) => {
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
    const [key, val] = arr;
    if (Object.keys(DICS).includes(key.trim())) {
      const href = $(anchor).attr("href") || "";
      const text = val?.trim();
      const code = href ? href.split("/")[href.split("/").length - 1] : null;
      const name = key.trim();
      const prop = DICS[key].code;
      info[prop] = { name, href, text, code };
    }
    return info;
  };
  $(".info")
    .find("p")
    .map((i, x) => {
      const idx = $(x).text();

      const line = idx.split(":");
      if (line.length > 1 && line[line.length - 1]) {
        const anchor = $(x).find("a");
        genOtherInfo(line, info, anchor);
      }
    });

  const data = {
    title,
    gid,
    actress,
    cover,
    thumb,
    previews,
    tags,
    ...info,
  };
  return data;
};
