const fs = require("fs");
const winston = require("winston");
const dayjs = require("dayjs");

const createLogger = async ({ filename, socket }) => {
  const customFormat = winston.format.printf((info) => {
    const { message, timestamp, level } = info;
    const regex = /\[(.+?)\]/g;
    const prefix = message.match(regex);
    const time = dayjs(timestamp).format("YYYY-MM-DD HH:mm:ss");
    const curMsg = message.replace(`${prefix}`, "");
    // socket?.emit("chat", {
    //   id: Date.now(),
    //   msg: `[${time}]${prefix}[${level}]:${curMsg}`,
    // });
    return `[${time}]${prefix}[${level}]:${curMsg}`;
  });

  const isExists = await fs.existsSync(filename);
  const logger = winston.createLogger({
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.prettyPrint(),
      customFormat
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename }),
    ],
  });

  // 在这里可以将日志信息发送给客户端
  logger.on("data", (log) => {
    socket?.emit("logger", log);
  });

  if (isExists) {
    logger.info(`[logger]------------------------------`);
  }

  logger.err = function (info, error, ...args) {
    error = new Error(error);
    let text = info + ":";
    if (error?.name) text += `${error.name}`;
    if (error?.message) text += `\nerrorname:${error.message}`;
    if (error?.cause) text += `\n${error.cause}`;
    if (error?.stack) text += `\n${error.stack}`;
    return logger.error(text, ...args);
  };

  logger.dir = filename;

  return logger;
};

module.exports = { createLogger };
