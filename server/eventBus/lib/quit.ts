// 最好是纯函数。，只能用function形式导出
module.exports = function () {
  const { app } = this;
  app.quit();
};
