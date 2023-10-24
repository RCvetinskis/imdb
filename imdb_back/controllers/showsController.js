const tvShowsDb = require("../Schemas/tvShowSchema");
const moviesDb = require("../Schemas/moviesSchema");
const response = require("../module/sendResponse");
module.exports = {
  movies: async (req, res) => {
    const { idsArray } = req.body;
    const movies = await moviesDb.find({ id: { $in: idsArray } });

    if (movies.length > 0) {
      return response(res, "movies are found", false, movies);
    } else {
      return response(res, "No movies are fround for the provided ids", true);
    }
  },
  tvShows: async (req, res) => {
    const { idsArray } = req.body;
    const tvShows = await tvShowsDb.find({ id: { $in: idsArray } });

    if (tvShows.length > 0) {
      return response(res, "shows are found", false, tvShows);
    } else {
      return response(res, "No shows are fround for the provided ids", true);
    }
  },
};
