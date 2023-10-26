const moviesDb = require("../Schemas/moviesSchema");
const tvShowsDb = require("../Schemas/tvShowSchema");
const userDb = require("../Schemas/imdbUserSchema");
module.exports = async (id, category) => {
  if (!category) {
    const data = await userDb.findOne({ _id: id });
    return data;
  } else if (category === "tv") {
    const data = await tvShowsDb.findOne({ id: id });
    return data;
  } else if (category === "movie") {
    const data = await moviesDb.findOne({ id: id });
    return data;
  } else {
    return null;
  }
};
