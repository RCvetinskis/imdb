const tvShowsDb = require("../Schemas/tvShowSchema");
const moviesDb = require("../Schemas/moviesSchema");
const response = require("../module/sendResponse");
const returnOne = require("../module/returnOne");
module.exports = {
  add_show: async (req, res) => {
    const { category, show } = req.body;
    let showData = await returnOne(show.id, category);

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
  totalShowLikes: async (req, res) => {
    const showId = Number(req.query.showId);
    const category = req.query.category;
    const currentShow = await returnOne(showId, category);
    if (currentShow && currentShow.likes) {
      return res.send({
        message: "show likes length",
        error: false,
        data: {
          likes: currentShow.likes.length,
          dislikes: currentShow.dislikes.length,
        },
      });
    }
    return response(res, "show not found", true);
  },
  already_seen_movies: async (req, res) => {
    const { idsArray } = req.body;
    if (!idsArray)
      return response(res, "users already seen array not provided", true);
    const movies = await moviesDb.find({ id: { $in: idsArray } });
    if (movies.length > 0) {
      return response(res, "shows are found", false, movies);
    } else {
      return response(res, "No shows are fround for the provided ids", true);
    }
  },
  already_seen_tv: async (req, res) => {
    const { idsArray } = req.body;
    if (!idsArray)
      return response(res, "users already seen array not provided", true);
    const tvShows = await tvShowsDb.find({ id: { $in: idsArray } });
    if (tvShows.length > 0) {
      return response(res, "shows are found", false, tvShows);
    } else {
      return response(res, "No shows are fround for the provided ids", true);
    }
  },
};
