/**
 * 因为入库和日语`yiku`音似，固如此设置
 */
const { Sequelize, DataTypes } = require("sequelize");

const addString = (updateObj, propNames = []) => {
  const ret = {};
  propNames.forEach(({ propName, addVal, unDeduplicate = false }) => {
    const str = updateObj[propName]?.replaceAll("\\", "").replaceAll('"', "");
    if (str) {
      console.log(str);
    }
    const o_value = str ? updateObj[propName].split(",") : [];
    o_value.push(...addVal);
    const newVal = (unDeduplicate ? o_value : Array.from(new Set(o_value)))
      .join()
      .replaceAll("\\", "")
      .replaceAll('"', "");
    ret[propName] = newVal;
  });
  return ret;
};

const bulkUpdate = async (tables = [], outfit) => {
  for (let i = 0; i < tables.length; i++) {
    if (JSON.stringify(tables[i].data) === "{}" || !tables[i].data.length) {
      console.log(`${tables[i].name}表无该字段，跳过更新`);
    } else {
      const { name, instance, data = [] } = tables[i];
      const codes = data.map((x) => x.code);
      const findRes = await instance.findAll({
        raw: true,
        where: {
          code: codes,
        },
      });

      let updatedRecords = [];
      if (!findRes.length) {
        updatedRecords = data.map((x) => ({
          ...x,
          name: x.text,
          store: outfit,
        }));
      } else {
        updatedRecords = findRes.map((x) => {
          const newObj = addString(x, [
            { propName: "store", addVal: [outfit] },
          ]);

          return {
            ...x,
            ...newObj,
          };
        });
      }

      await instance.bulkCreate(updatedRecords, {
        updateOnDuplicate: ["store"],
      });
      console.log(`${name}表更新成功`);
    }
  }
};

module.exports = async function (e, { record }) {
  const { sequelize, response } = this;
  const {
    models: { tag, director, label, studio, series, actor },
  } = sequelize;
  const {
    outfit,
    tags: _tags = [],
    director: _director = {},
    label: _label = {},
    studio: _studio = {},
    series: _series = {},
    actress: _actress = [],
    airav = {},
  } = record;
  // 1.更新store,有则增加，无则取消
  await bulkUpdate(
    [
      { name: "tag", instance: tag, data: _tags },
      { name: "label", instance: label, data: [_label] },
      { name: "director", instance: director, data: [_director] },
      { name: "series", instance: series, data: [_series] },
      { name: "studio", instance: studio, data: [_studio] },
    ],
    outfit
  );

  // 2.更新女友
  if (!_actress.length) {
    console.log("不更新女友");
  }
  const a_actress_ids = (airav.actors || []).map((x) => x.id);

  // //   const actress_codes = _actress.map(x=>x/)
  const results = [];
  const a_actors = airav.actors || [];
  for (let i = 0; i < a_actors.length; i++) {
    const element = a_actors[i];
    const cur_actor = _actress[i];
    cur_actor.busId = cur_actor.code;
    const _cur = await actor.findAll({
      raw: true,
      where: {
        airAv_id: element.id,
      },
    });
    const cur = _cur.length ? _cur : [cur_actor];
    results.push(...cur);
  }

  const tag_codes = _tags.map((x) => x.code);
  const updateRes = results.map((result, i) => {
    const newObj = addString(result, [
      { propName: "tags", addVal: tag_codes, unDeduplicate: true },
      { propName: "store", addVal: [outfit] },
    ]);
    return {
      ...result,
      busCode: a_actress_ids[i],
      ...newObj,
    };
  });
  // console.log("-----updateRes", updateRes);

  const rs = await actor.bulkCreate(updateRes, {
    updateOnDuplicate: ["store", "tags", "busCode"],
  });

  console.log("done");
};
