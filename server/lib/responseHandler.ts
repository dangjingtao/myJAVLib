// 相应渲染器插件
// type ResponseFormater = {
//   success?: Function;
//   error?: Function;
//   warn?: Function;
//   toast?: Function;
// };
module.exports = function () {
  const res = {};
  const success = (data = null) => {
    return {
      code: 200,
      success: true,
      message: "成功",
      data,
      showType: 0,
    };
  };

  const error = (cfg = {}) => {
    return {
      code: 200,
      success: false,
      ...cfg,
      showType: 2,
    };
  };

  const warn = (cfg) => {
    return {
      code: 200,
      success: false,
      ...cfg,
      showType: 1,
    };
  };

  const toast = (cfg) => {
    return {
      code: 200,
      success: true,
      ...cfg,
      showType: 2,
    };
  };

  res.success = success;
  res.error = error;
  res.warn = warn;
  res.toast = toast;

  return res;
};
