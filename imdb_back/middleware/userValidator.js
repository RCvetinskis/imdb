const response = require("../module/sendResponse");
const userDb = require("../Schemas/imdbUserSchema");
const returnOne = require("../module/returnOne");
const bcrypt = require("bcrypt");
module.exports = {
  validateRegistration: async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!email) return response(res, "email not provided", true);
    if (!password) return response(res, "password not provided", true);

    const users = await userDb.find({}, { email: 1, username: 1, _id: 0 });
    if (users) {
      const usersUsernames = users.map(({ username }) => username);
      const usersEmails = users.map(({ email }) => email);
      if (usersUsernames.includes(username))
        return response(res, "user with this username already exists", true);
      if (usersEmails.includes(email))
        return response(res, "user with this email already exists", true);
    }

    next();
  },
  validateLogin: async (req, res, next) => {
    const { email, password } = req.body;

    const user = await userDb.findOne({ email });
    if (!user) return response(res, "user not found", true);

    if (!email) return response(res, "email not provided", true);
    if (!password) return response(res, "password not provided", true);

    const users = await userDb.find({}, { email: 1, _id: 0 });
    const usersEmails = users.map(({ email }) => email);
    if (!usersEmails) {
      return response(res, "user with this email does not exist", true);
    }

    const compare = await bcrypt.compare(password, user.password);
    if (!compare) return response(res, "Wrong password", true);
    next();
  },
  validateUpdateUser: async (req, res, next) => {
    const { username, email, password, avatar, userId } = req.body;

    if (!userId) return response(res, "users not found", true);

    if (!username && !email && !password && !avatar)
      return response(res, "No new values were sent", true);

    const user = await returnOne(userId);
    const compare = await bcrypt.compare(password, user.password);
    if (compare) return response(res, "Password is same as previous", true);

    const users = await userDb.find({}, { email: 1, username: 1, _id: 0 });
    const usersUsernames = users.map(({ username }) => username);
    const usersEmails = users.map(({ email }) => email);

    if (users) {
      if (usersUsernames.includes(username))
        return response(res, "user with this username already exists", true);
      if (usersEmails.includes(email))
        return response(res, "user with this email already exists", true);
    }
    next();
  },
  validateHandleShowLike: async (req, res, next) => {
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
  validateHandleShowDislike: async (req, res, next) => {
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
  validateHandleShowSeen: async (req, res, next) => {
    const { userId, showId, category } = req.body;
    if ((!userId, !showId, !category))
      return response(res, "provide userId, showId and category");

    const user = await returnOne(userId);

    if (!user) return response(res, "user not found", true);
    if (!user.already_seen.category[category])
      return response(res, "Invalid category", true);

    const currentShow = await returnOne(showId, category);
    if (!currentShow) return response(res, "show not found", true);
    next();
  },
};
