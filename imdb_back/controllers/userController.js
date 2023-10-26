const response = require("../module/sendResponse");
const userDb = require("../Schemas/imdbUserSchema");
const bcrypt = require("bcrypt");
const addShow = require("../module/addShowToDb");
const returnOne = require("../module/returnOne");
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
    // finds user
    const user = await returnOne(userId);
    // adds show if its not in db
    addShow(category, show);
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
    // finds user
    const user = await returnOne(userId);

    // adds show if its not in db
    addShow(category, show);
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
