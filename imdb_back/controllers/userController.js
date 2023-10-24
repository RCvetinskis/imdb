const response = require("../module/sendResponse");
const userDb = require("../Schemas/imdbUserSchema");
const tvShowsDb = require("../Schemas/tvShowSchema");
const moviesDb = require("../Schemas/moviesSchema");
const bcrypt = require("bcrypt");
module.exports = {
  // fix* do not send user password to frontend
  register: async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userDb({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();

    response(res, "Registration complete", false, user);
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    const user = await userDb.findOne({ email });
    const compare = await bcrypt.compare(password, user.password);
    if (compare) {
      return response(res, "Succesfully logged in", false, user);
    }
    return response(res, "password do not match", true);
  },
  likeList: async (req, res) => {
    const { userId, show, category } = req.body;
    const user = await userDb.findOne({ _id: userId });
    const movieFromDb = await moviesDb.findOne({ id: show.id });
    const tvFromDb = await tvShowsDb.findOne({ id: show.id });
    // adds show if its not in db
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

    // removes from disliked list
    const dislikeList = user.dislikes.category[category];
    const indexOfDislikedList = dislikeList.indexOf(show.id);
    if (dislikeList.includes(show.id)) {
      dislikeList.splice(indexOfDislikedList, 1);
    }
    user.likes.category[category].push(show.id);
    await user.save();
    return response(res, "Users like list is updated", false, user);
  },
  dislikeList: async (req, res) => {
    const { userId, show, category } = req.body;
    const user = await userDb.findOne({ _id: userId });
    const movieFromDb = await moviesDb.findOne({ id: show.id });
    const tvFromDb = await tvShowsDb.findOne({ id: show.id });
    // adds show if its not in db
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
    // removes from liked list
    const likedList = user.likes.category[category];
    const indexOfShowLikedId = likedList.indexOf(show.id);

    if (likedList.includes(show.id)) {
      likedList.splice(indexOfShowLikedId, 1);
    }
    user.dislikes.category[category].push(show.id);
    await user.save();
    return response(res, "User Dislike list is updated", false, user);
  },
};
