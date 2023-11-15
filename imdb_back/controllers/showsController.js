const tvShowsDb = require("../Schemas/tvShowSchema");
const moviesDb = require("../Schemas/moviesSchema");
const response = require("../module/sendResponse");
const returnOne = require("../module/returnOne");
const findAndPaginateShows = require("../module/findAndPaginateShows");
module.exports = {
  add_show: async (req, res) => {
    const { category, show, userId } = req.body;
    const showData = await returnOne(show.id, category);
    const user = await returnOne(userId);
    let data = {
      ...showData._doc,
      likes_length: showData.likes.length,
      dislikes_length: showData.dislikes.length,
      already_liked: false,
      already_disliked: false,
      already_seen: false,
    };
    if (user) {
      const likedList = user.likes.category[category];
      if (likedList.includes(show.id)) {
        data.already_liked = true;
      }
      const dislikeList = user.dislikes.category[category];
      if (dislikeList.includes(show.id)) {
        data.already_disliked = true;
      }
      const seenList = user.already_seen.category[category];
      if (seenList.includes(show.id)) {
        data.already_seen = true;
      }
    }
    if (showData) {
      return response(res.status(200), "Show has been sent", false, data);
    } else {
      return response(res.status(404), "Show not found", true);
    }
  },

  user_shows_list: async (req, res) => {
    // returns users shows liked or seen, with options for sorting
    const {
      idsArray,
      category,
      page,
      limit,
      with_genres,
      with_original_language,
      primary_release_year,
      first_air_date_year,
      sort_by,
    } = req.query;

    if (!idsArray || !category)
      return response(res, "please provide idsArr and category queries", true);

    const idsArrayConverted = idsArray.split(",").map(Number);
    const query = {
      // returns user liked/seen showsbased of array
      id: { $in: idsArrayConverted },
    };
    const collections = {
      tv: tvShowsDb,
      movie: moviesDb,
    };
    const collection = await collections[category];

    if (with_genres) {
      // returns filtered  movies by genres
      const genresArray = with_genres.split(",").map(Number);
      query["dynamicData.genres"] = {
        $elemMatch: { id: { $in: genresArray } },
      };
    }
    const showsGenres = await collection
      .find({ id: { $in: idsArrayConverted } })
      .distinct("dynamicData.genres");

    if (with_original_language) {
      query["dynamicData.original_language"] = with_original_language;
    }
    const showsLanguages = await collection
      .find({ id: { $in: idsArrayConverted } })
      .distinct("dynamicData.original_language");

    // movie year
    if (primary_release_year) {
      query["dynamicData.release_date"] = {
        $regex: new RegExp(`^${primary_release_year}`),
      };
    }
    const moviesReleaseDate = await collection
      .find({ id: { $in: idsArrayConverted } })
      .distinct("dynamicData.release_date");

    const moviesYearOnly = Array.from(
      new Set(moviesReleaseDate.map((date) => date.substring(0, 4)))
    );
    // tv show year
    if (first_air_date_year) {
      query["dynamicData.first_air_date"] = {
        $regex: new RegExp(`^${first_air_date_year}`),
      };
    }
    const tvShowsFirstAirDate = await collection
      .find({ id: { $in: idsArrayConverted } })
      .distinct("dynamicData.first_air_date");

    const tvShowYearOnly = Array.from(
      new Set(tvShowsFirstAirDate.map((date) => date.substring(0, 4)))
    );
    let sortValue;
    if (sort_by) {
      if (sort_by === "popularity.desc") {
        sortValue = { "dynamicData.popularity": -1 };
      }
      if (sort_by === "popularity.asc") {
        sortValue = { "dynamicData.popularity": 1 };
      }

      if (sort_by === "release_date.desc") {
        sortValue =
          category === "movie"
            ? { "dynamicData.release_date": -1 }
            : { "dynamicData.first_air_date": -1 };
      }
      if (sort_by === "release_date.asc") {
        sortValue =
          category === "movie"
            ? { "dynamicData.release_date": 1 }
            : { "dynamicData.first_air_date": 1 };
      }

      if (sort_by === "vote_average.desc") {
        sortValue = { "dynamicData.vote_average": -1 };
      }
      if (sort_by === "vote_average.asc") {
        sortValue = { "dynamicData.vote_average": 1 };
      }
    }
    if (!showsGenres || !showsLanguages || !tvShowYearOnly || !moviesYearOnly)
      return response(res, "shows options not found", true);

    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 3;
    const result = await findAndPaginateShows(
      collection,
      query,
      pageNumber,
      limitNumber,
      showsGenres,
      showsLanguages,
      moviesYearOnly,
      tvShowYearOnly,
      sortValue
    );
    if (!result) return response(res, "users shows data not found", true);
    return response(res, "shows are found", false, result);
  },
};
