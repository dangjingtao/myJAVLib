const mkdir = require("../utils/mkdir");
const { createLogger } = require("../utils/logger");

const init = async ({ useLogger, dir, outfit, socket, ...rest }) => {
  let logger = { warn: () => {}, info: () => {}, err: () => {} };
  if (useLogger) {
    await mkdir(`${dir}/${outfit}`);
    logger = await createLogger({
      filename: `${dir}/${outfit}/info.log`,
      cleanBefore: true,
      socket,
    });
  }

  return {
    logger,
    ...rest,
    dir,
    outfit,
  };
};

module.exports = init;
