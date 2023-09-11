const { MOVIE_TYPES } = require("../../config");
const isMovie = (stats) => {
  //   console.log(11111, stats);
  const arr = stats.split(".");
  const sufix = arr[arr.length - 1];
  return MOVIE_TYPES.includes(sufix.toLowerCase());
};

module.exports = isMovie;
