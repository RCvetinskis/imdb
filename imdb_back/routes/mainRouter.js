const express = require("express");
const router = express.Router();
const {
  register,
  login,
  authorized,
  userLikeList,
  userDislikeList,
  logout,
} = require("../controllers/userController");
const {
  validateRegistration,
  validateLogin,
  validateLikeList,
  validateDislikeList,
} = require("../middleware/userValidator");
const {
  add_show,
  likedMovies,
  likedTvShows,
} = require("../controllers/showsController");
const {
  get_comments,
  post_comment,
  post_reply_comment,
  get_reply_comments,
  rate,
} = require("../controllers/userEngagementController");
const { validateAddShow } = require("../middleware/showValidator");
const {
  validateComment,
  validateReplyComment,
  validateGetReplyComments,
} = require("../middleware/userEngagementValidator");
// user
router.post("/register", validateRegistration, register);
router.post("/login", validateLogin, login);
router.get("/authorized", authorized);
router.get("/logout", logout);
router.post("/like_list", validateLikeList, userLikeList);
router.post("/dislike_list", validateDislikeList, userDislikeList);
// shows
router.post("/movies", likedMovies);
router.post("/tvShows", likedTvShows);
router.post("/post_comment", validateComment, post_comment);
router.post("/post_reply_comment", validateReplyComment, post_reply_comment);
router.get("/get_comments", get_comments);
router.get("/get_reply_comments", validateGetReplyComments, get_reply_comments);
router.post("/rate", rate);
router.post("/add_show", validateAddShow, add_show);
// router.post("/get_show", get_show);

module.exports = router;
