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
    // updates users likes and adds like too show
    const { userId, showId, category } = req.body;
    const user = await returnOne(userId);
    const currentShow = await returnOne(showId, category);

    // removes from disliked list
    const dislikeList = user.dislikes.category[category];
    const indexOfDislikedList = dislikeList.indexOf(showId);
    if (dislikeList.includes(showId)) {
      dislikeList.splice(indexOfDislikedList, 1);
    }
    user.likes.category[category].push(showId);
    await user.save();
    req.session.user = user;
    req.session.save();

    const showDislikeList = currentShow.dislikes;
    const indexShowDislikeList = showDislikeList.indexOf(userId);
    if (showDislikeList.includes(userId)) {
      showDislikeList.splice(indexShowDislikeList, 1);
    }
    currentShow.likes.push(userId);
    await currentShow.save();

    return response(res, "Users like list is updated", false, {
      username: req.session.user.username,
      avatar: req.session.user.avatar,
      email: req.session.user.email,
      _id: req.session.user._id,
      likes: req.session.user.likes,
      dislikes: req.session.user.dislikes,
    });
  },
  userDislikeList: async (req, res) => {
    const { userId, showId, category } = req.body;
    const user = await returnOne(userId);
    const currentShow = await returnOne(showId, category);

    // removes from liked list
    const likedList = user.likes.category[category];
    const indexOfShowLikedId = likedList.indexOf(showId);

    if (likedList.includes(showId)) {
      likedList.splice(indexOfShowLikedId, 1);
    }
    user.dislikes.category[category].push(showId);
    await user.save();
    req.session.user = user;
    req.session.save();
    const showLikeList = currentShow.likes;
    const indexShowLikeList = showLikeList.indexOf(userId);
    if (showLikeList.includes(userId)) {
      showLikeList.splice(indexShowLikeList, 1);
    }
    currentShow.dislikes.push(userId);
    await currentShow.save();
    return response(res, "User Dislike list is updated", false, {
      username: req.session.user.username,
      avatar: req.session.user.avatar,
      email: req.session.user.email,
      _id: req.session.user._id,
      likes: req.session.user.likes,
      dislikes: req.session.user.dislikes,
    });
  },
};
