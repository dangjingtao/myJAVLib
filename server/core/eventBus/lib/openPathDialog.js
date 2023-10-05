const { dialog } = require("electron");

module.exports = async function (e, params = {}) {
  return await dialog.showOpenDialogSync({
    title: "请选择要索引的文件夹路径",
    message: "请选择要索引的文件夹路径",
    properties: ["openDirectory", "createDirectory"],
  });
  //   const { response, socket } = this;
  //   const { initPath } = params;
  //   await indexMovie({
  //     initPath,
  //     callback: (stats) => {
  //       console.log(stats);
  //     },
  //   });

  //   return response.success(result);
};
