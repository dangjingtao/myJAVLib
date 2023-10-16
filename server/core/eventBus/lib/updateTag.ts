module.exports = async function (e, { id, ...rest }) {
  const { sequelize, response } = this;

  const {
    models: { tag },
  } = sequelize;
  //  查找主键
  const curRecord = await tag.findByPk(Number(id));

  if (curRecord) {
    await curRecord.set({ ...rest, updatedAt: new Date() });
    await curRecord.save();
    return response.success("修改标签成功");
  } else {
    return response.error("找不到");
  }
};
