const path = require("path");
const { indexMovies } = require("d-outfit");
const Data = require("../../../lib/Data");
const { createLogger } = require("../../../lib/Data/core/utils/logger");

module.exports = async function (e, params = {}) {
  const { response, socket } = this;
  const { initPath } = params;

  //   const curPath = path.join(__dirname, "../../../tmps/");

  //   const data = new Data({
  //     dir: curPath,
  //     outfit,
  //     useLogger: true,
  //     socket,
  //   });

  // console.log(data);
  const logger = await createLogger({
    filename: `${initPath}/indexMovie.log`,
    cleanBefore: true,
    socket,
  });

  //   const res = await data.gather("local");
  const result = await indexMovies({
    initPath,
    onIndex: (item) => {
      const { status, outfit, fileDir } = item;
      logger.info(`[${status}]${outfit || fileDir}`);
    },
  });

  return response.success(result);
};
