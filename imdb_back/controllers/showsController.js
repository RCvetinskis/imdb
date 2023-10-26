const tvShowsDb = require("../Schemas/tvShowSchema");
const moviesDb = require("../Schemas/moviesSchema");
const response = require("../module/sendResponse");
const addShow = require("../module/addShowToDb");
const returnOne = require("../module/returnOne");
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
  comment: async (req, res) => {
    const { comment, userId, username, avatar, category, show } = req.body;
    // finds show
    const currentShow = await returnOne(show.id, category);
    // adds show if its not in database
    addShow(category, show);
    if (currentShow) {
      if (!comment) {
        return response(res, "No comment is provided", true);
      } else {
        currentShow.comments.push({
          comment,
          user: {
            username,
            userId,
            avatar,
          },
          createdAt: new Date(),
        });
        currentShow.save();
        return response(res, "Comment has been added", false, currentShow);
      }
    }
  },
};
