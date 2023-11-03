const response = require("../module/sendResponse");
const userDb = require("../Schemas/imdbUserSchema");
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
    const { userId, show, category } = req.body;
    const user = await userDb.findOne({ _id: userId });
    if (!user) {
      return response(res, "User not found", true);
    }
    if (!user.likes.category[category]) {
      return response(res, "Invalid category", true);
    }
    const likedList = user.likes.category[category];
    if (likedList.includes(show.id)) {
      return response(res, "Show is already liked", true);
    }
    next();
  },
  validateDislikeList: async (req, res, next) => {
    const { userId, show, category } = req.body;

    const user = await userDb.findOne({ _id: userId });
    if (!user) {
      return response(res, "User not found", true);
    }
    if (!user.dislikes.category[category]) {
      return response(res, "Invalid category", true);
    }
    const likedList = user.dislikes.category[category];
    if (likedList.includes(show.id)) {
      return response(res, "Show is already disliked", true);
    }
    next();
  },
};
