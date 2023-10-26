const moviesDb = require("../Schemas/moviesSchema");
const tvShowsDb = require("../Schemas/tvShowSchema");
module.exports = async (category, show) => {
  const movieFromDb = await moviesDb.findOne({ id: show.id });
  const tvFromDb = await tvShowsDb.findOne({ id: show.id });
  if (category === "tv") {
    if (!tvFromDb) {
      show.media_type = "tv";
      const newShow = new tvShowsDb(show);
      await newShow.save();
    }
  } else if (category === "movie") {
    if (!movieFromDb) {
      show.media_type = "movie";
      const newMovie = new moviesDb(show);
      await newMovie.save();
    }
  }
};
