const getMovieName = (stats) => {
  const arr = stats.split("/");
  const sufix = arr[arr.length - 1].split(".")[0];
  return sufix.toUpperCase();
};

module.exports = getMovieName;
