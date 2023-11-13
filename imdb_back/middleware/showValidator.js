const moviesDb = require("../Schemas/moviesSchema");
const tvShowsDb = require("../Schemas/tvShowSchema");
const response = require("../module/sendResponse");
module.exports = {
  validateAddShow: async (req, res, next) => {
    const { category, show } = req.body;
    const movieFromDb = await moviesDb.findOne({ id: show.id });
    const tvFromDb = await tvShowsDb.findOne({ id: show.id });

    if (category === "tv") {
      if (!tvFromDb) {
        const data = {
          dynamicData: show,
          media_type: "tv",
          id: show.id,
        };

        const newShow = new tvShowsDb(data);
        await newShow.save();
      }
    } else if (category === "movie") {
      if (!movieFromDb) {
        const data = {
          dynamicData: show,
          media_type: "movie",
          id: show.id,
        };
        const newMovie = new moviesDb(data);
        await newMovie.save();
      }
    }

    next();
  },
};
