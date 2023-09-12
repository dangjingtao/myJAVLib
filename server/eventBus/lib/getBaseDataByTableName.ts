module.exports = async function (e, { tableName, params = {} }) {
  const { sequelize, response } = this;

  const { models } = sequelize;
  const currentTable = models[tableName];
  const result = await currentTable.findAll({
    raw: true,
    where: {
      ...params,
    },
  });
  return response.success(result);
};
