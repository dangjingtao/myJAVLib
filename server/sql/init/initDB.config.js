const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");
const busTag = require("./busTags.json");

const getTagsInit = () => {
  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, "./genre_javbus.csv"))
      .pipe(csv())
      .on("data", (data) => {
        // 每当读取一行CSV数据时，触发此回调函数
        results.push(data);
      })
      .on("end", () => {
        // CSV文件读取结束时触发此回调函数
        // console.log(results);
        // results.forEach((x) => {
        //   const { code } = x;
        //   Object.keys(censored).forEach((theme) => {
        //     const isThis = censored[theme].find((y) => y.code === code);
        //     if (isThis) {
        //       x.classType = "censored";
        //       x.class = theme;
        //     }
        //   });
        //   Object.keys(uncensored).forEach((theme) => {
        //     const isThis = uncensored[theme].find(
        //       (y) => y.code === code?.replace("uncensored-", "")
        //     );
        //     if (isThis) {
        //       x.code = x.code.replace("uncensored-", "");
        //       x.classType = "uncensored";
        //       x.class = theme;
        //     }
        //   });
        //   x.url = undefined;
        // });
        resolve(results);
      });
  });
};

const getDB = async (tables = []) => {
  const initTags = busTag;
  const TABLE_CFG = {
    dataBaseName: "myjavlib.db",
    tables: [
      {
        tableName: "user",
        columns: [
          {
            name: "username",
            dataType: "STRING",
          },
          {
            name: "password",
            dataType: "STRING",
          },
          {
            name: "role",
            dataType: "NUMBER",
          },
        ],
        initData: [
          {
            username: "1",
            password: "1",
            role: 1,
          },
          {
            username: "15017560655",
            password: "123456",
            role: 1,
          },
          {
            username: "13172979806",
            password: "123456",
            role: 1,
          },
        ],
        clear: true,
      },
      {
        tableName: "actor",
        columns: [
          {
            name: "name_CN",
            dataType: "STRING",
          },
          {
            name: "name_JP",
            dataType: "STRING",
          },
          {
            name: "name_EN",
            dataType: "STRING",
          },
          { name: "rate", dataType: "NUMBER" },
          { name: "info", dataType: "STRING" },
          { name: "avatar", dataType: "STRING" },
        ],
        initData: [],
        clear: false,
      },
      {
        tableName: "tag",
        columns: [
          { name: "code", dataType: "STRING" },
          { name: "url", dataType: "STRING" },
          { name: "zh_tw", dataType: "STRING" },
          { name: "jp", dataType: "STRING" },
          { name: "en", dataType: "STRING" },
          { name: "cn", dataType: "STRING" },
          { name: "classType", dataType: "STRING" },
          { name: "class", dataType: "STRING" },
          { name: "store", dataType: "JSON" },
          { name: "tmp_store", dataType: "JSON" },
          { name: "class", dataType: "STRING" },
          { name: "no_active", dataType: "BOOLEAN" },
          { name: "color", dataType: "STRING" },
          { name: "extend", dataType: "STRING" },
          { name: "note", dataType: "STRING" },
        ],
        initData: initTags,
        clear: true,
      },
      {
        tableName: "series",
        columns: [
          { name: "code", dataType: "STRING" },
          { name: "name", dataType: "STRING" },
          { name: "desc", dataType: "STRING" },
          { name: "store", dataType: "STRING" },
          { name: "tmp_store", dataType: "STRING" },
          { name: "note", dataType: "STRING" },
          { name: "info", dataType: "JSON" },
          { name: "expand", dataType: "STRING" },
        ],
        initData: [{ name: "痴女系列", code: "cn" }],
        clear: true,
      },
      {
        tableName: "director",
        columns: [
          { name: "code", dataType: "STRING" },
          { name: "name", dataType: "STRING" },
          { name: "desc", dataType: "STRING" },
          { name: "store", dataType: "STRING" },
          { name: "tmp_store", dataType: "STRING" },
          { name: "note", dataType: "STRING" },
          { name: "info", dataType: "JSON" },
          { name: "expand", dataType: "STRING" },
        ],
        initData: [{ code: "dndt", name: "东尼大桃" }],
        clear: true,
      },
      {
        tableName: "studio",
        columns: [
          { name: "code", dataType: "STRING" },
          { name: "name", dataType: "STRING" },
          { name: "desc", dataType: "STRING" },
          { name: "store", dataType: "STRING" },
          { name: "tmp_store", dataType: "STRING" },
          { name: "note", dataType: "STRING" },
          { name: "info", dataType: "JSON" },
          { name: "expand", dataType: "STRING" },
        ],
        initData: [{ code: "dk", name: "fitch" }],
        clear: true,
      },
      {
        tableName: "label",
        columns: [
          { name: "code", dataType: "STRING" },
          { name: "name", dataType: "STRING" },
          { name: "desc", dataType: "STRING" },
          { name: "store", dataType: "STRING" },
          { name: "tmp_store", dataType: "STRING" },
          { name: "note", dataType: "STRING" },
          { name: "info", dataType: "JSON" },
          { name: "expand", dataType: "STRING" },
        ],
        initData: [{ code: "dk", name: "fitch" }],
        clear: true,
      },
      // config
      // tmp_list
    ],
  };

  return TABLE_CFG;
};

module.exports = async () => await getDB();
