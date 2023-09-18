const { Op } = require("sequelize");
module.exports = async function (
  e,
  { tableName, params = {}, orLike, andLike }
) {
  const { sequelize, response } = this;
  const { models } = sequelize;
  const currentTable = models[tableName];

  let where = { ...params };
  if (orLike) {
    const { word = "", columns = [] } = orLike;
    where = {
      ...params,
      [Op.or]: columns.map((x) => {
        return { [x]: { [Op.like]: `%${word}%` } };
      }),
    };
  }

  if (andLike) {
    const { word = "", columns = [] } = andLike;
    columns.forEach((x) => {
      where[x] = { [Op.like]: `%${word}%` };
    });
  }

  const result = await currentTable.findAll({
    raw: true,
    where,
    // offset: 0,
    // limit: 10000,
    // offset: (page - 1) * size,
    // limit:size
  });
  return response.success(result);
};
