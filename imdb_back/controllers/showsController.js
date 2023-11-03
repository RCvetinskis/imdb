const tvShowsDb = require("../Schemas/tvShowSchema");
const moviesDb = require("../Schemas/moviesSchema");
const response = require("../module/sendResponse");
const returnOne = require("../module/returnOne");
module.exports = {
  add_show: async (req, res) => {
    const { category, show } = req.body;
    let showData;
    if (category === "tv") {
      showData = await tvShowsDb.findOne({ id: show.id });
    } else if (category === "movie") {
      showData = await moviesDb.findOne({ id: show.id });
    }

    if (showData) {
      return response(res.status(200), "Show has been sent", false, showData);
    } else {
      return response(res.status(404), "Show not found", true);
    }
  },

  likedMovies: async (req, res) => {
    const { idsArray } = req.body;

    if (!idsArray) return response(res, "users likes array not provided", true);
    const movies = await moviesDb.find({ id: { $in: idsArray } });
    if (movies.length > 0) {
      return response(res, "movies are found", false, movies);
    } else {
      return response(res, "No movies are fround for the provided ids", true);
    }
  },
  likedTvShows: async (req, res) => {
    const { idsArray } = req.body;

    if (!idsArray) return response(res, "users likes array not provided", true);
    const tvShows = await tvShowsDb.find({ id: { $in: idsArray } });
    if (tvShows.length > 0) {
      return response(res, "shows are found", false, tvShows);
    } else {
      return response(res, "No shows are fround for the provided ids", true);
    }
  },
};
