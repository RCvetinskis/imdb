const response = require("../module/sendResponse");
const userDb = require("../Schemas/imdbUserSchema");
const returnOne = require("../module/returnOne");
const bcrypt = require("bcrypt");
module.exports = {
  validateRegistration: async (req, res, next) => {
    const { username, email, password } = req.body;
    const user = await userDb.findOne({ email });
    if (!email) return response(res, "email not provided", true);
    if (!password) return response(res, "password not provided", true);
    if (user) {
      if (user.username === username)
        return response(res, "User already exists", true);

      if (user.email === email)
        return response(res, "This email is already in use", true);
    }

    next();
  },
  validateLogin: async (req, res, next) => {
    const { email, password } = req.body;

    if (!email) return response(res, "email not provided", true);
    if (!password) return response(res, "password not provided", true);
    const user = await userDb.findOne({ email });
    if (!user) {
      return response(res, "user with this username does not exist", true);
    }
    const compare = await bcrypt.compare(password, user.password);
    if (!compare) return response(res, "password do not match", true);
    next();
  },
  validateLikeList: async (req, res, next) => {
    const { userId, showId, category } = req.body;
    if ((!userId, !showId, !category))
      return response(res, "provide userId, showId and category");
    const user = await returnOne(userId);

    if (!user) {
      return response(res, "User not found", true);
    }
    if (!user.likes.category[category]) {
      return response(res, "Invalid category", true);
    }
    const likedList = user.likes.category[category];
    if (likedList.includes(showId)) {
      return response(res, "Show is already liked", true);
    }
    const currentShow = await returnOne(showId, category);
    const showLikes = currentShow.likes;
    if (showLikes.includes(userId)) {
      return response(res, "user already liked show", true);
    }

    next();
  },
  validateDislikeList: async (req, res, next) => {
    const { userId, showId, category } = req.body;
    if ((!userId, !showId, !category))
      return response(res, "provide userId, showId and category");
    const user = await userDb.findOne({ _id: userId });
    if (!user) {
      return response(res, "User not found", true);
    }
    if (!user.dislikes.category[category]) {
      return response(res, "Invalid category", true);
    }
    const likedList = user.dislikes.category[category];
    if (likedList.includes(showId)) {
      return response(res, "Show is already disliked", true);
    }
    const currentShow = await returnOne(showId, category);
    const showDislikes = currentShow.dislikes;
    if (showDislikes.includes(userId)) {
      return response(res, "user already disliked show", true);
    }

    next();
  },
  validateAlreadySeen: async (req, res, next) => {
    const { userId, showId, category } = req.body;
    if ((!userId, !showId, !category))
      return response(res, "provide userId, showId and category");

    const user = await returnOne(userId);

    if (!user) return response(res, "user not found", true);
    if (!user.already_seen.category[category])
      return response(res, "Invalid category", true);

    if (user.already_seen.category[category].includes(showId))
      return response(res, "show already marked as seen", true);
    const currentShow = await returnOne(showId, category);
    if (!currentShow) return response(res, "show not found", true);
    next();
  },
};
