const response = require("../module/sendResponse");
const userDb = require("../Schemas/imdbUserSchema");

module.exports = {
  validateRegistration: async (req, res, next) => {
    const { username, email } = req.body;
    const user = await userDb.findOne({ email });
    if (user) {
      if (user.username === username)
        return response(res, "User already exists", true);

      if (user.email === email)
        return response(res, "This email is already in use", true);
    }

    next();
  },
  validateLogin: async (req, res, next) => {
    const { email } = req.body;
    const user = await userDb.findOne({ email });
    if (!user) {
      return response(res, "user with this username does not exist", true);
    }
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
