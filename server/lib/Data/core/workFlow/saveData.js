const fs = require("fs");

const { saveImg, saveInfo } = require("../utils/save");
const mkdir = require("../utils/mkdir");

const saveData = async ({ data, dir, outfit, logger }) => {
  logger.info(`[SAVE]开始保存${outfit}数据..`);
  await mkdir(`${dir}/${outfit}`);
  const { cover, thumb, previews = [], actress } = data;
  logger.info(`[SAVE]开始保存${outfit}封面..`);
  let localCover = "";
  try {
    localCover = (
      await saveImg({
        dir: `${dir}/${outfit}/cover`,
        src: cover,
        usePuppeteer: true,
      })
    )?.data;
    logger.info(`[SAVE]${outfit}封面保存完成!`);
  } catch (error) {
    logger.err(`[SAVE]${outfit}封面保存失败!`, error);
  }

  let localThumb = "";

  logger.info(`[SAVE]开始保存${outfit}缩略图..`);
  try {
    localThumb = (
      await saveImg({
        dir: `${dir}/${outfit}/thumb`,
        src: thumb,
        usePuppeteer: true,
      })
    )?.data;
    logger.info(`[SAVE]${outfit}缩略图保存完成`);
  } catch (error) {
    logger.err(`[SAVE]${outfit}缩略图保存失败`, error);
  }

  const localPreviews = [];
  logger.info(`[SAVE]开始保存${outfit}预览图..`);
  for (let i = 0; i < previews.length; i++) {
    let localPreview = "";
    try {
      localPreview = (
        await saveImg({
          dir: `${dir}/${outfit}/previews`,
          src: previews[i],
        })
      ).data;
    } catch (error) {
      logger.err(`[SAVE]${outfit}预览图<${previews[i].avatar}>保存失败`, error);
    }
    localPreviews.push(localPreview);
  }
  logger.info(`[SAVE]${outfit}预览图保存完成`);

  const localActress = [];
  logger.info(`[SAVE]开始生成${outfit}演员预览图..`);
  for (let i = 0; i < actress.length; i++) {
    let localActor = "";
    try {
      localActor = (
        await saveImg({
          dir: `${dir}/${outfit}/actress`,
          src: actress[i].avatar,
          usePuppeteer: true,
        })
      ).data;
      if (localActor) {
        await fs.renameSync(
          localActor,
          `${dir}/${outfit}/actress/${actress[i].name}.${
            localActor.split(".")[1]
          }`
        );
        localActor = `${dir}/${outfit}/actress/${actress[i].name}.${
          localActor.split(".")[1]
        }`;
        logger.info(`[SAVE]${outfit}演员预览图保存完成`);
      } else {
        logger.warn(`[SAVE]获取不到${outfit}演员头像`);
      }
    } catch (error) {
      logger.err(
        `[SAVE]生成${outfit}演员预览图<${actress[i].avatar}>失败..`,
        error
      );
    }
    localActor && localActress.push(localActor);
  }

  const savedData = {
    localThumb,
    localCover,
    localPreviews,
    localActress,
    localLogs: logger?.dir,
    ...data,
  };

  try {
    await saveInfo({
      path: `${dir}/${outfit}/index`,
      data: savedData,
    });
    logger.info(`[SAVE]${outfit}本地资源保存完毕!`);
  } catch (error) {
    logger.err(`[SAVE]${outfit}本地资源保存失败!`, error);
  }

  return savedData;
};

module.exports = saveData;
