const path = require("path");
const Sequelize = require("sequelize");
const chalk = require("chalk");
const getDB = require("./init/initDB.config");

const initTables = (sequelize, tables) => {
  // 初始化数据表
  tables.forEach(async (table) => {
    let { tableName, columns = [], initData = [], clear = false } = table;

    const structrue = {};
    columns.forEach((column) => {
      const { name, dataType } = column;
      structrue[name] = Sequelize[dataType];
    });

    sequelize.define(tableName, structrue);
    const curTable = sequelize.models[tableName];
    if (clear) {
      await curTable.destroy({ where: {} });
    }
    // 插入标准调试数据;
    sequelize
      .sync()
      .then(() => curTable.bulkCreate(initData))
      .then((jane) => {
        // console.log(jane.toJSON());
      });
  });
};

const dbConnection = async (sequelize, base_db) => {
  return new Promise((resolve, reject) => {
    try {
      sequelize.authenticate().then(async () => {
        console.log(chalk.green("[sequelize] 数据库连接成功"));
        const { tables = [] } = base_db;
        initTables(sequelize, tables);
        resolve(sequelize);
      }); // 测试连接是否正常
    } catch (error) {
      console.log(chalk.red("[sequelize] 无法连接到数据库"), error);
      // console.log("[sequelize] 无法连接到数据库");
      reject(error);
    }
  });
};

module.exports = {
  initDataBase: async () => {
    const base_db = await getDB();
    const sequelize = new Sequelize({
      dialect: "sqlite",
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      logging: false,
      storage: path.join(__dirname, `./db/${base_db.dataBaseName}`),
      // operatorsAliases: false,
    });
    return dbConnection(sequelize, base_db);
  },
};
