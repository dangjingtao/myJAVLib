const path = require("path");
const Data = require("../../../lib/Data");
const queryDataByOutfit = async function (e, outfit) {
  const { socket, response } = this;
  const curPath = path.join(__dirname, "../../tmp/");

  const data = new Data({
    dir: curPath,
    outfit,
    useLogger: true,
    socket,
  });

  // console.log(data);

  const res = await data.gather("local");

  return response.success(res);
};

module.exports = queryDataByOutfit;
