const response = require("../module/sendResponse");
const userDb = require("../Schemas/imdbUserSchema");
const bcrypt = require("bcrypt");
const returnOne = require("../module/returnOne");
module.exports = {
  register: async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userDb({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    response(res, "Registration complete", false);
  },
  login: async (req, res) => {
    const { email } = req.body;
    const user = await userDb.findOne({ email });
    req.session.user = user;
    req.session.authorized = true;
    return response(res, "Succesfully logged in", false, {
      username: user.username,
      avatar: user.avatar,
      email: user.email,
      _id: user._id,
      likes: req.session.user.likes,
      dislikes: req.session.user.dislikes,
    });
  },
  authorized: async (req, res) => {
    if (req.session.authorized) {
      return response(res, "User authorized", false, {
        username: req.session.user.username,
        avatar: req.session.user.avatar,
        email: req.session.user.email,
        _id: req.session.user._id,
        likes: req.session.user.likes,
        dislikes: req.session.user.dislikes,
      });
    } else {
      return response(res, "Unauthorized", true);
    }
  },
  logout: async (req, res) => {
    req.session.user = null;
    req.session.authorized = false;
    return response(res, "logout completed", true);
  },
  userLikeList: async (req, res) => {
    const { userId, show, category } = req.body;
    // finds user
    const user = await returnOne(userId);
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
  userDislikeList: async (req, res) => {
    const { userId, show, category } = req.body;
    // finds user
    const user = await returnOne(userId);

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
