module.exports = async function (e, params = {}) {
  const { sequelize, response } = this;

  const {
    models: { tag },
  } = sequelize;
  const result = await tag.findAll({
    raw: true,
    where: {
      ...params,
    },
  });
  return response.success(result);
};
