const response = require("../module/sendResponse");
const userDb = require("../Schemas/imdbUserSchema");
const bcrypt = require("bcrypt");
const returnOne = require("../module/returnOne");
const userObject = require("../module/user");
const { uploadFile, getFileUrl } = require("../s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
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

    return response(
      res,
      "Succesfully logged in",
      false,
      userObject(req.session.user)
    );
  },
  authorized: async (req, res) => {
    if (req.session.authorized) {
      return response(
        res,
        "User authorized",
        false,
        userObject(req.session.user)
      );
    } else {
      return response(res, "Unauthorized", true);
    }
  },
  logout: async (req, res) => {
    req.session.user = null;
    req.session.authorized = false;
    return response(res, "logout completed", true);
  },
  update_user: async (req, res) => {
    const { username, email, password, avatar, userId } = req.body;

    const user = await returnOne(userId);
    user.username = username || user.username;
    user.email = email || user.email;
    user.password = password || user.password;
    user.avatar = avatar || user.avatar;

    const file = req.file;
    if (file) {
      const result = await uploadFile(file);
      await unlinkFile(file.path);

      if (result) {
        const fileUrl = getFileUrl(result.Key);
        user.avatar = fileUrl;
      }
    }
    req.session.user = user;
    req.session.save();
    await user.save();
    return response(
      res,
      "User has been updated",
      false,
      userObject(req.session.user)
    );
  },
  handle_show_like: async (req, res) => {
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

    return response(
      res,
      "Users like list is updated",
      false,
      userObject(req.session.user)
    );
  },
  handle_show_dislike: async (req, res) => {
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
    return response(
      res,
      "User Dislike list is updated",
      false,
      userObject(req.session.user)
    );
  },
  handle_show_seen: async (req, res) => {
    const { userId, showId, category } = req.body;

    const user = await returnOne(userId);
    const seenList = user.already_seen.category[category];

    if (seenList.includes(showId)) {
      const indexOfSeenShow = seenList.indexOf(showId);
      seenList.splice(indexOfSeenShow, 1);
    } else {
      seenList.push(showId);
    }
    await user.save();
    req.session.user = user;
    req.session.save();
    return response(
      res,
      "User Dislike list is updated",
      false,
      userObject(req.session.user)
    );
  },
};
