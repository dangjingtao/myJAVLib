module.exports = async function (e, { tableName, params: { id, ...rest } }) {
  const { sequelize, response } = this;

  const { models } = sequelize;
  const currentTable = models[tableName];
  //  查找主键
  const curRecord = await currentTable.findByPk(Number(id));

  if (curRecord) {
    await curRecord.set({ ...rest, updatedAt: new Date() });

    await curRecord.save();
    return response.success("修改成功");
  } else {
    return response.error("找不到");
  }
};
